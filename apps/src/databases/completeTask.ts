import { db } from "./initDB";

export async function completeTasks(taskId: number) {
  await db.runAsync(
    `UPDATE tasks SET status = 'done', completed_at = datetime('now') WHERE id = ?`,
    [taskId],
  );
}
