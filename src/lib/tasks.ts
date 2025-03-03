import type { Task } from "@/types/task"

export function getTasks(): Task[] {
  if (typeof window === "undefined") return []
  const tasks = localStorage.getItem("tasks")
  return tasks ? JSON.parse(tasks) : []
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

export function addTask(title: string) {
  const tasks = getTasks()
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: Date.now(),
  }
  const updatedTasks = [...tasks, newTask]
  saveTasks(updatedTasks)
  return newTask
}

export function updateTask(taskId: string, updates: Partial<Task>) {
  const tasks = getTasks()
  const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
  saveTasks(updatedTasks)
}

export function deleteTask(taskId: string) {
  const tasks = getTasks()
  const updatedTasks = tasks.filter((task) => task.id !== taskId)
  saveTasks(updatedTasks)
}

