import { db } from "./initDB";

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
