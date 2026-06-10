import { db } from "./initDB";

export async function getUsers(userId: number) {
  return await db.getFirstAsync(`
    SELECT *
    FROM USERS
    WHERE id = ?`, [userId],
  );
}

export async function getAvatar(avatarId: number) {
  return await db.getFirstAsync(
    `SELECT * FROM AVATARS WHERE id = ?`,
    [avatarId]
  );
}