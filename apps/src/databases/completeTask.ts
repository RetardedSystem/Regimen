import { db } from "./initDB";

/**
 * Marks a task as completed by updating its status and setting the completion timestamp(localtime).
 * @param taskId - The ID of the task to be marked as completed.
 * @returns A promise that resolves when the task has been updated in the database.
 */

export async function completeTasks(taskId: number) {
  await db.runAsync(
    `UPDATE tasks
   SET status = 'done',
       completed_at = datetime('now', 'localtime')
   WHERE id = ?`,
    [taskId],
  );
}
