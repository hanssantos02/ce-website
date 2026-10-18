"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { createProgressGateway } from "./store";
import { performProgress } from "./service";
import type { ProgressResult } from "./policy";
import { getPublishedLesson } from "../../content/published-lessons";
import { getModuleHref } from "../../content/curriculum";

export async function saveProgressAction(data: FormData): Promise<ProgressResult> {
  try {
    const fields = {
      lessonId: data.getAll("lessonId").length === 1 ? data.get("lessonId") : undefined,
      intent: data.getAll("intent").length === 1 ? data.get("intent") : undefined,
    };
    // Never read user_id from the form. Verify identity on the same writable SDK client.
    const result = await performProgress(fields, createProgressGateway(await createClient(true)));
    if (result.kind === "saved" || result.kind === "loaded") {
      const entry = getPublishedLesson(fields.lessonId as string)!;
      revalidatePath(entry.href);
      revalidatePath(getModuleHref(entry.subject, entry.module)!);
      revalidatePath("/dashboard");
    }
    return result;
  } catch {
    return { kind: "error", message: "We couldn’t confirm that change. Try again or reload progress; you can keep reading." };
  }
}
