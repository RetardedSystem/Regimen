import { db } from "./initDB";

export async function getTasksByStatus(
  status: "todo" | "in_progress" | "done",
) {
  const tasks = await db.getAllAsync("SELECT * FROM tasks WHERE status = ?", [
    status,
  ]);
  return tasks;
}
