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
