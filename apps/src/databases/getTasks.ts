import { db } from "./initDB";

/**
 * Retrieves all tasks from the database.
 * Completed tasks are ordered by their completion date.
 * while pending tasks are ordered by their priority.
 */
export async function getTasks() {
  return await db.getAllAsync(`
    SELECT *
    FROM tasks
    ORDER BY
      CASE
        WHEN status = 'done' THEN completed_at
        ELSE priority
      END DESC
  `);
}

/**
 * Updates an existing task in the database.
 * @param {Object} task - The task object containing updated properties.
 * @returns {boolean} - Returns true if the update was successful, false otherwise.
 */
export async function updateTask(task) {
  try {
    await db.runAsync(
      `
      UPDATE tasks
      SET
        title = ?,
        description = ?,
        start_date = ?,
        deadline = ?,
        priority = ?,
        is_recurring = ?,
        recurrence_type = ?,
        recurrence_days = ?,
        goal_id = ?
      WHERE id = ?
      `,
      [
        task.title,
        task.description,
        task.start_date,
        task.deadline,
        task.priority,
        task.is_recurring,
        task.recurrence_type,
        task.recurrence_days,
        task.goal_id,
        task.id,
      ],
    );

    return true;
  } catch (error) {
    console.error("Failed to update task:", error);
    return false;
  }
}
