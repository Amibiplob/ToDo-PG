"use server";

import { query } from "@/lib/queries";

import { revalidatePath } from "next/cache";
import { requireUser } from "../usersession";

// =======================
// CREATE TODO
// =======================
export async function createTodo(formData: FormData) {
  const user = await requireUser();

  const title = formData.get("title") as string;

  if (!title) throw new Error("Title is required");

  await query(
    `
    INSERT INTO todos (title, user_id)
    VALUES ($1, $2)
    `,
    [title, user.id],
  );

  revalidatePath("/todos");
}

// =======================
// GET TODOS
// =======================
export async function getTodos() {
  const user = await requireUser();

  const result = await query(
    `
    SELECT *
    FROM todos
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [user.id],
  );

  return result.rows;
}

// =======================
// TOGGLE TODO
// =======================
export async function toggleTodo(id: number, completed: boolean) {
  const user = await requireUser();

  await query(
    `
    UPDATE todos
    SET completed = $1
    WHERE id = $2 AND user_id = $3
    `,
    [completed, id, user.id],
  );

  revalidatePath("/todos");
}

// =======================
// DELETE TODO
// =======================
export async function deleteTodo(id: number) {
  const user = await requireUser();

  await query(
    `
    DELETE FROM todos
    WHERE id = $1 AND user_id = $2
    `,
    [id, user.id],
  );

  revalidatePath("/todos");
}
