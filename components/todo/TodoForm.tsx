import { createTodo } from "./todo.actions";


export default function TodoForm() {
  return (
    <form action={createTodo} className="flex gap-2 mb-5">
      <input
        type="text"
        name="title"
        placeholder="New todo..."
        className="border p-2 flex-1"
        required
      />

      <button className="bg-black text-white px-4">Add</button>
    </form>
  );
}
