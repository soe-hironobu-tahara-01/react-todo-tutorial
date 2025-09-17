import React from "react";
import { Todo } from "../models/todo";

export type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
}) => (
  <ul>
    {todos.map((todo) => (
      <li
        key={todo.id}
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        <span onClick={() => onToggle(todo.id)} style={{ cursor: "pointer" }}>
          {todo.content}
        </span>
        <button onClick={() => onDelete(todo.id)} style={{ marginLeft: 8 }}>
          削除
        </button>
      </li>
    ))}
  </ul>
);
