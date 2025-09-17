// タスク（ToDo）モデル型定義とバリデーション関数

export type TodoStatus = "todo" | "inprogress" | "done";

export type Todo = {
  id: string;
  content: string;
  completed: boolean;
  createdAt: string;
  status: TodoStatus;
};

// 空内容禁止バリデーション
export function validateTodo(content: string): boolean {
  return content.trim().length > 0;
}

// 重複タスクの扱いは仕様未定（許容/禁止）
// export function validateDuplicate(content: string, todos: Todo[]): boolean {
//   // 例: 許容する場合は常にtrue, 禁止する場合は重複チェック
//   return true;
// }
