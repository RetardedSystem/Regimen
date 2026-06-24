import { db } from "./initDB";

/**
 * Retrieves all tasks from the database for a Specific Date
 * @param {string} date -  'YYYY-MM-DD'
 * Completed tasks are ordered by their completion date.
 * while pending tasks are ordered by their priority.
 */
export async function getTasksByDate(date: string) {
  return await db.getAllAsync(`
    SELECT
        ti.id AS id,
        ti.task_id,

        t.title,
        t.description,

        ti.status,

        ti.instance_date AS date,

        t.start_date,
        t.deadline,
        t.completed_at,

        t.goal_id,
        g.domain,
        t.priority,

        t.is_recurring,
        t.recurrence_days,
        t.recurrence_type

    FROM task_instances ti
    INNER JOIN tasks t
        ON ti.task_id = t.id
    LEFT JOIN goals g 
        ON t.goal_id = g.id
    WHERE ti.instance_date = '${date}'
    ORDER BY
      CASE
        WHEN ti.status = 'done' THEN t.completed_at
        ELSE t.priority
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
        task.task_id,
      ],
    );

    return true;
  } catch (error) {
    console.error("Failed to update task:", error);
    return false;
  }
}

/**
 * Marks a task as completed by updating its status and setting the completion timestamp(localtime).
 * @param taskId - The ID of the task to be marked as completed.
 * @returns A promise that resolves when the task has been updated in the database.
 */

export async function completeTask(instanceId: number, taskId: number) {
  await db.withTransactionAsync(async () => {
    // Update the occurrence
    await db.runAsync(
      `UPDATE task_instances
       SET status = 'done'
       WHERE id = ?`,
      [instanceId],
    );

    // Update the task status
    await db.runAsync(
      `UPDATE tasks
       SET status = 'done',
           completed_at = datetime('now', 'localtime')
       WHERE id = ?`,
      [taskId],
    );
  });
}

export async function createTask() {
  const result = await db.runAsync(
    `
    INSERT INTO tasks (
      title,
      description,
      start_date,
      deadline,
      priority,
      is_recurring,
      recurrence_type,
      recurrence_days,
      goal_id
    )
    VALUES (
      'Add Title',
      '',
      datetime('now', 'localtime'),
      datetime('now', 'localtime'),
      1,
      0,
      null,
      null,
      1
    );
    `,
  );

  const taskId = result.lastInsertRowId;

  await db.runAsync(
    `
    INSERT INTO task_instances (
      task_id,
      instance_date,
      status
    )
    VALUES (
      ?,
      '2026-06-03',
      'todo'
    )
    `,
    [taskId],
  );
  console.log("Task Created");
  return taskId;
}
