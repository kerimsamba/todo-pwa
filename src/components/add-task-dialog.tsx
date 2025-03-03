"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { addTask } from "@/lib/tasks"

interface AddTaskDialogProps {
  onTaskAdded?: () => void
}

export function AddTaskDialog({ onTaskAdded }: AddTaskDialogProps) {
  const [task, setTask] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim()) {
      addTask(task.trim())
      setTask("")
      setOpen(false)
      onTaskAdded?.()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300">
          <Plus size={24} />
          <span className="sr-only">Add New Task</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="task">What needs to be done?</Label>
            <Input
              id="task"
              placeholder="Enter your task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-white text-gray-900 hover:bg-gray-200">
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

