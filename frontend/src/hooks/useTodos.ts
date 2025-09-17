"use client";

import { useCallback, useEffect, useState } from "react";
import { Todo, TodoStatus, validateTodo } from "../models/todo";

const STORAGE_KEY = "todos";

function loadTodos(): Todo[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback((content: string) => {
    if (!validateTodo(content)) return false;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      content,
      completed: false,
      createdAt: new Date().toISOString(),
      status: "todo",
    };
    setTodos((prev) => [...prev, newTodo]);
    return true;
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ステータス変更
  const updateStatus = useCallback((id: string, status: TodoStatus) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo, updateStatus };
}
