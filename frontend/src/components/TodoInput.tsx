"use client";

import React, { useState } from "react";

export type TodoInputProps = {
  onAdd: (content: string) => void;
};

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().length === 0) return;
    onAdd(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="タスクを入力"
      />
      <button type="submit">追加</button>
    </form>
  );
};
