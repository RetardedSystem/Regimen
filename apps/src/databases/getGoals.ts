import { db } from "./initDB";

export async function getGoalByID(id: number) {
  return await db.getFirstAsync(
    `
    SELECT *
    FROM goals
    WHERE id = ${id}  
  `,
    [id],
  );
}

export async function getGoals() {
  return await db.getAllAsync(`
    SELECT id, title
    FROM goals
    ORDER BY id
  `);
}

export async function getGoalsTree() {
  const goals = await db.getAllAsync(`
    SELECT id,title, parent_goal_id,domain,status,start_time,completed_at,deadline
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
