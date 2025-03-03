import type { Task } from "@/types/task"

export function getTasks(): Task[] {
  if (typeof window === 'undefined') return []
  
  const storedTasks = localStorage.getItem('tasks')
  if (!storedTasks) return []
  
  try {
    return JSON.parse(storedTasks)
  } catch (error) {
    console.error('Error parsing stored tasks:', error)
    return []
  }
}

export function updateTask(updatedTask: Task): void {
  if (typeof window === 'undefined') return
  
  const tasks = getTasks()
  const updatedTasks = tasks.map(task => 
    task.id === updatedTask.id ? updatedTask : task
  )
  
  localStorage.setItem('tasks', JSON.stringify(updatedTasks))
}

export function deleteTask(taskId: string): void {
  if (typeof window === 'undefined') return
  
  const tasks = getTasks()
  const updatedTasks = tasks.filter(task => task.id !== taskId)
  
  localStorage.setItem('tasks', JSON.stringify(updatedTasks))
}

export function getRandomTask(): Task | null {
  const tasks = getTasks()
  if (tasks.length === 0) return null
  
  // Filter for tasks that are not deferred to the future
  const availableTasks = tasks.filter(task => {
    if (!task.dueDate) return true
    
    const dueDate = new Date(task.dueDate)
    const today = new Date()
    
    // Set time to 00:00:00 for both dates to compare just the date
    dueDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    
    return dueDate <= today
  })
  
  if (availableTasks.length === 0) return null
  
  // Return a random task
  const randomIndex = Math.floor(Math.random() * availableTasks.length)
  return availableTasks[randomIndex]
}

export function addTask(text: string): void {
  if (typeof window === 'undefined' || !text.trim()) return
  
  const tasks = getTasks()
  const newTask: Task = {
    id: Date.now().toString(),
    text: text.trim(),
    dueDate: null
  }
  
  tasks.push(newTask)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

export function deferTask(taskId: string, days: number): void {
  if (typeof window === 'undefined') return
  
  const tasks = getTasks()
  const updatedTasks = tasks.map(task => {
    if (task.id === taskId) {
      const newDueDate = new Date()
      newDueDate.setDate(newDueDate.getDate() + days)
      return { ...task, dueDate: newDueDate.toISOString() }
    }
    return task
  })
  
  localStorage.setItem('tasks', JSON.stringify(updatedTasks))
}
