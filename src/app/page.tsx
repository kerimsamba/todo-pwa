import Link from "next/link"
import { List } from "lucide-react"
import { AddTaskDialog } from "@/components/add-task-dialog"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <button className="text-5xl font-bold hover:text-gray-300 transition-colors duration-300">Do it!</button>
      <div className="fixed bottom-8 left-8">
        <Link href="/tasks" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300">
          <List size={24} />
          <span className="sr-only">View Tasks</span>
        </Link>
      </div>
      <div className="fixed bottom-8 right-8">
        <AddTaskDialog />
      </div>
    </main>
  )
}

