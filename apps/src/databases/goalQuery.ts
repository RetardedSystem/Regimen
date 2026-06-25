import { db } from "./initDB";

export async function getGoals() {
  return await db.getAllAsync(`
    SELECT id, title
    FROM goals
    ORDER BY id
  `);
}

export async function getGoalsTree() {
  const goals = await db.getAllAsync(`
    SELECT id,title, description, parent_goal_id,domain,status,start_date,completed_at,deadline,status
    FROM goals
    ORDER BY id
  `);

  const goalsMap: { [key: number]: any } = {};
  const roots: any[] = [];

  for (const goal of goals) {
    goalsMap[goal.id] = { ...goal, children: [] };
  }

  for (const goal of goals) {
    if (goal.parent_goal_id !== null) {
      goalsMap[goal.parent_goal_id].children.push(goalsMap[goal.id]);
    } else {
      roots.push(goalsMap[goal.id]);
    }
  }

  return roots;
}

export async function updateGoal(
  goal: Goal,
  parentGoalId: number | null = goal.parent_goal_id,
): Promise<number> {
  let goalId = goal.id;

  if (goalId) {
    await db.runAsync(
      `
      UPDATE goals
      SET
        title = ?,
        description = ?,
        parent_goal_id = ?,
        domain = ?,
        start_date = ?,
        completed_at = ?,
        deadline = ?,
        status = ?
      WHERE id = ?
      `,
      [
        goal.title,
        goal.description,
        parentGoalId,
        goal.domain,
        goal.start_date,
        goal.completed_at,
        goal.deadline,
        goal.status,
        goalId,
      ],
    );
  } else {
    const result = await db.runAsync(
      `
      INSERT INTO goals (
        parent_goal_id,
        title,
        description,
        domain,
        start_date,
        completed_at,
        deadline,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        parentGoalId,
        goal.title,
        goal.description,
        goal.domain,
        goal.start_date,
        goal.completed_at,
        goal.deadline,
        goal.status,
      ],
    );

    goalId = result.lastInsertRowId as number;
  }

  for (const child of goal.children ?? []) {
    await updateGoal(child, goalId);
  }

  return goalId;
}

export async function deleteGoal(goalId: number): Promise<void> {
  const children = await db.getAllAsync(
    `SELECT id FROM goals WHERE parent_goal_id = ?`,
    [goalId],
  );

  for (const child of children) {
    await deleteGoal(child.id);
  }

  await db.runAsync(`DELETE FROM goals WHERE id = ?`, [goalId]);
}

export async function createGoal() {
  const result = await db.runAsync(
    `
    INSERT INTO goals (
      title,
      description,
      parent_goal_id,
      domain,
      start_date,
      completed_at,
      deadline,
      status
    )
    VALUES (
      'New Goal',
      '',
      null,
      'personal',
      datetime('now', 'localtime'),
      null,
      null,
      'in_progress'
    );
    `,
  );
  console.log("Goal Created");
}
