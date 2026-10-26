import type { SavedRunDetail, SavedRunSummary } from "../types";
import { apiJson, postJson, apiFetch } from "./api";

export function createRun(payload: unknown): Promise<{ id: string }> {
  return postJson<{ id: string }>("/api/runs", payload, "Save failed");
}

export function listRuns(): Promise<SavedRunSummary[]> {
  return apiJson<SavedRunSummary[]>("/api/runs", {
    fallbackError: "Could not load saved runs",
  });
}

export function getRun(id: string): Promise<SavedRunDetail> {
  return apiJson<SavedRunDetail>(`/api/runs/${id}`, {
    fallbackError: "Could not open run",
  });
}

export async function deleteRun(id: string): Promise<void> {
  const res = await apiFetch(`/api/runs/${id}`, { method: "DELETE" });
  let body: any;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  if (!res.ok) {
    const msg = (body as any)?.error ?? `Could not delete run (${res.status})`;
    throw new Error(msg);
  }
}