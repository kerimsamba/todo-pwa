export interface Task {
  id: string;
  text: string;
  dueDate: string | null;
  completed?: boolean;
}
