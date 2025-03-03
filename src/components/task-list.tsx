"use client"

import { useState } from "react"
import type { Task } from "@/types/tasks"
import { updateTask, deleteTask } from "@/lib/tasks"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, X, Check } from "lucide-react"

interface TaskListProps {
  tasks: Task[]
  onTasksChange: () => void
}

export function TaskList({ tasks, onTasksChange }: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleToggleComplete = (task: Task) => {
    updateTask(task.id, { completed: !task.completed })
    onTasksChange()
  }

  const handleEdit = (task: Task) => {
    setEditingId(task.id)
    setEditValue(task.title)
  }

  const handleSaveEdit = (taskId: string) => {
    if (editValue.trim()) {
      updateTask(taskId, { title: editValue.trim() })
      onTasksChange()
    }
    setEditingId(null)
  }

  const handleDelete = (taskId: string) => {
    deleteTask(taskId)
    onTasksChange()
  }

  if (tasks.length === 0) {
    return <div className="text-center text-gray-400 py-8">No tasks yet. Click the + button to add one!</div>
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg group hover:bg-gray-750 transition-colors"
        >
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => handleToggleComplete(task)}
            className="data-[state=checked]:bg-green-600"
          />

          {editingId === task.id ? (
            <div className="flex-1 flex items-center gap-2">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1 bg-gray-700 border-gray-600"
                autoFocus
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleSaveEdit(task.id)}
                className="text-green-500 hover:text-green-400"
              >
                <Check size={16} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setEditingId(null)}
                className="text-red-500 hover:text-red-400"
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <>
              <span className={`flex-1 ${task.completed ? "line-through text-gray-400" : ""}`}>{task.title}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit(task)}
                  className="text-blue-500 hover:text-blue-400"
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

