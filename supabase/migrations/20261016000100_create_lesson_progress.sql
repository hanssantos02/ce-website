-- M08: additive migration. Review and approve before applying to a hosted project.
-- Repository publication is validated by CEPath, not by this ownership schema.
begin;

create table public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null check (char_length(lesson_id) between 1 and 160),
  status text not null check (status in ('in_progress', 'completed')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id),
  constraint lesson_progress_completion_consistent check (
    (status = 'completed' and completed_at is not null)
    or (status = 'in_progress' and completed_at is null)
  )
);

-- One index already covers user-scoped lookups and unique per-lesson upserts.
-- An invoker trigger owns timestamps; no client-supplied timestamp is trusted.
create function public.set_lesson_progress_timestamps()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if TG_OP = 'UPDATE' then
    if NEW.user_id is distinct from OLD.user_id
       or NEW.lesson_id is distinct from OLD.lesson_id then
      raise exception 'Progress identity cannot be changed' using errcode = '23514';
    end if;
    NEW.started_at := OLD.started_at;
    if NEW.status is not distinct from OLD.status then
      NEW.completed_at := OLD.completed_at;
      NEW.updated_at := OLD.updated_at;
      return NEW;
    end if;
  else
    NEW.started_at := pg_catalog.statement_timestamp();
  end if;
  NEW.updated_at := pg_catalog.statement_timestamp();
  NEW.completed_at := case when NEW.status = 'completed'
    then NEW.updated_at else null end;
  return NEW;
end;
$$;

revoke all on function public.set_lesson_progress_timestamps() from public, anon, authenticated;
create trigger lesson_progress_timestamps
before insert or update on public.lesson_progress
for each row execute function public.set_lesson_progress_timestamps();

alter table public.lesson_progress enable row level security;
revoke all on table public.lesson_progress from public, anon, authenticated;
grant select, insert, update, delete on table public.lesson_progress to authenticated;

create policy lesson_progress_select_own on public.lesson_progress
for select to authenticated using ((select auth.uid()) = user_id);
create policy lesson_progress_insert_own on public.lesson_progress
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy lesson_progress_update_own on public.lesson_progress
for update to authenticated using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create policy lesson_progress_delete_own on public.lesson_progress
for delete to authenticated using ((select auth.uid()) = user_id);

commit;
