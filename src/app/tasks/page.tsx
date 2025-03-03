"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Home } from "lucide-react"
import type { Task } from "@/types/task"
import { getTasks } from "@/lib/tasks"
import { TaskList } from "@/components/task-list"
import { AddTaskDialog } from "@/components/add-task-dialog"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    setTasks(getTasks())
  }, [])

  const handleTasksChange = () => {
    setTasks(getTasks())
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300">
            <Home size={24} />
            <span className="sr-only">Go Home</span>
          </Link>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <AddTaskDialog onTaskAdded={handleTasksChange} />
        </div>

        <TaskList tasks={tasks} onTasksChange={handleTasksChange} />
      </div>
    </main>
  )
}

