'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Load todos from localStorage when component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (e) {
        console.error('Error parsing stored todos:', e);
        localStorage.removeItem('todos');
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    
    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </form>

      <ul className="divide-y divide-gray-200">
        {todos.length === 0 ? (
          <li className="py-4 text-center text-gray-500">No tasks yet. Add one above!</li>
        ) : (
          todos.map(todo => (
            <li key={todo.id} className="py-4 flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 rounded"
              />
              <span 
                className={`ml-3 flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
