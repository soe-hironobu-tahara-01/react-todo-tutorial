"use client";
import { TodoInput } from "../components/TodoInput";
import { KanbanBoard } from "../components/KanbanBoard";
import { useTodos } from "../hooks/useTodos";

export default function Page() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateStatus } = useTodos();

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 className="text-2xl font-bold mb-4">TODOアプリ</h1>
      <TodoInput onAdd={addTodo} />
      <div className="mt-8">
        <KanbanBoard
          todos={todos}
          onStatusChange={updateStatus}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </main>
  );
}
