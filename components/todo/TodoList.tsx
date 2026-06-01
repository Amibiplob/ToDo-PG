"use client";

import { deleteTodo, toggleTodo } from "./todo.actions";



export default function TodoList({ todos }: { todos: any[] }) {
  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div key={todo.id} className="flex justify-between border p-2">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, !todo.completed)}
            />

            <span
              className={todo.completed ? "line-through text-gray-400" : ""}
            >
              {todo.title}
            </span>
          </div>

          <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
