import "server-only";
import { cache } from "react";
import { createClient } from "../supabase/server";
import { classifyIdentityError, type ProgressRow, type ProgressLoad } from "./policy";
import { loadProgress, type ProgressGateway } from "./service";

type Client = NonNullable<Awaited<ReturnType<typeof createClient>>>;

export function createProgressGateway(client: Client | undefined): ProgressGateway {
  return {
    async verifyIdentity() {
      if (!client) return { kind: "unavailable" };
      try {
        const { data, error } = await client.auth.getUser();
        if (error) return classifyIdentityError(error);
        return data.user ? { kind: "authenticated", userId: data.user.id } : { kind: "unauthenticated" };
      } catch { return { kind: "unavailable" }; }
    },
    async read(userId, lessonIds) {
      if (!client) throw new Error("Progress provider unavailable");
      const { data, error, status: responseStatus } = await client.from("lesson_progress").select("lesson_id,status,updated_at").eq("user_id", userId).in("lesson_id", [...lessonIds]);
      if (error) throw Object.assign(new Error("Progress request failed"), { status: responseStatus });
      return (data ?? []) as ProgressRow[];
    },
    async upsert(userId, lessonId, status) {
      if (!client) throw new Error("Progress provider unavailable");
      const { data, error, status: responseStatus } = await client.from("lesson_progress")
        .upsert({ user_id: userId, lesson_id: lessonId, status }, { onConflict: "user_id,lesson_id" })
        .select("lesson_id,status").single();
      if (error) throw Object.assign(new Error("Progress request failed"), { status: responseStatus });
      return data as ProgressRow;
    },
    async remove(userId, lessonId) {
      if (!client) throw new Error("Progress provider unavailable");
      const { error, status: responseStatus } = await client.from("lesson_progress").delete().eq("user_id", userId).eq("lesson_id", lessonId);
      if (error) throw Object.assign(new Error("Progress request failed"), { status: responseStatus });
    },
  };
}

// React cache is request-local; never share personal progress across requests/users.
const readProgress = cache(async (ids: string): Promise<ProgressLoad> => {
  try { return await loadProgress(ids ? ids.split(",") : [], createProgressGateway(await createClient())); }
  catch { return { kind: "unavailable" }; }
});

export function getProgressForLessons(lessonIds: readonly string[]) {
  return readProgress([...new Set(lessonIds)].sort().join(","));
}
