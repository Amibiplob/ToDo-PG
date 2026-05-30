"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Todo } from "@/lib/types";



export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now(),
      title: newTodo,
      completed: false,
      created_at: new Date().toISOString(),
    };

    setTodos([todo, ...todos]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <main className="min-h-screen bg-muted p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* ADD NEW TODO */}
        <Card>
          <CardHeader>
            <CardTitle>My Todos</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
            <Button onClick={addTodo}>
              <Plus className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* LIST TODOS */}
        <div className="space-y-3">
          {todos.length === 0 && (
            <p className="text-center text-muted-foreground">
              No todos yet. Add one above!
            </p>
          )}

          {todos.map((todo) => (
            <Card key={todo.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div
                  className={`flex-1 cursor-pointer ${
                    todo.completed ? "line-through text-muted-foreground" : ""
                  }`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.title}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
