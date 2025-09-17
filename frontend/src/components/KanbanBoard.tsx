"use client";
import React from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from "../models/todo";
// import { TodoList } from "./TodoList"; // 未使用のためコメントアウト

export type KanbanBoardProps = {
  todos: Todo[];
  onStatusChange: (id: string, status: Todo["status"]) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

import type { TodoStatus } from "../models/todo";
const STATUS = [
  "todo",
  "inprogress",
  "done",
] as const satisfies readonly TodoStatus[];
const STATUS_LABEL: Record<TodoStatus, string> = {
  todo: "未着手",
  inprogress: "進行中",
  done: "完了",
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  todos,
  onStatusChange,
  onToggle,
  onDelete,
}) => {
  // ドラッグ中のタスクID
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // ステータスごとにタスクを分割
  const columns = STATUS.map((status) => ({
    status,
    label: STATUS_LABEL[status],
    items: todos.filter((t) => t.status === status),
  }));

  // ドラッグ開始
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // ドラッグ終了
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    // overIdがカラム名（status）ならカラム移動
    if (STATUS.includes(overId as TodoStatus)) {
      onStatusChange(activeId, overId as TodoStatus);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 w-full">
        {columns.map((col) => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            label={col.label}
            items={col.items}
            onToggle={onToggle}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            activeId={activeId}
          />
        ))}
      </div>
    </DndContext>
  );
};

// カンバンカラム（ドロップターゲット）
type KanbanColumnProps = {
  status: string;
  label: string;
  items: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
  activeId: string | null;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  label,
  items,
  onToggle,
  onDelete,
  onStatusChange,
  activeId,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <div
      ref={setNodeRef}
      id={status}
      className={
        "flex-1 bg-gray-100 rounded p-2 min-h-[300px] transition-all " +
        (isOver ? " ring-2 ring-blue-400" : "")
      }
    >
      <h2 className="text-center font-bold mb-2">{label}</h2>
      <SortableContext
        items={items.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((todo) => (
          <DraggableTodoCard
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </SortableContext>
    </div>
  );
};

// ドラッグ可能なTodoカード
type DraggableTodoCardProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
};

const DraggableTodoCard: React.FC<DraggableTodoCardProps> = ({
  todo,
  onToggle,
  onDelete,
  onStatusChange,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-white rounded shadow p-2 mb-2 flex items-center justify-between cursor-pointer"
    >
      {/* ドラッグハンドル */}
      <span
        {...listeners}
        className="mr-2 text-gray-400 select-none cursor-grab"
        title="ドラッグで移動"
        aria-label="ドラッグで移動"
      >
        ≡
      </span>
      <span className={todo.completed ? "line-through text-gray-400" : ""}>
        {todo.content}
      </span>
      <div className="flex gap-2">
        {todo.status !== "done" && (
          <button
            onClick={() => onStatusChange(todo.id, "done")}
            className="text-xs text-blue-500"
          >
            完了
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-xs text-red-500"
        >
          削除
        </button>
      </div>
    </div>
  );
};
