import { getTodos } from "@/components/todo/todo.actions";
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";


export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">My Todos</h1>

      <TodoForm />

      <TodoList todos={todos} />
    </main>
  );
}
