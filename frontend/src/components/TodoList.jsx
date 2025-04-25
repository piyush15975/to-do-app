import { useState } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';

function TodoList({ todos, setTodos }) {
  const [newTitle, setNewTitle] = useState('');

  const handleAddTodo = async () => {
    if (!newTitle.trim()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/todos`, {
        title: newTitle,
        completed: false,
      });
      setTodos([...todos, res.data]);
      setNewTitle('');
    } catch (err) {
      console.error(err.response?.data?.message || 'Add failed');
    }
  };

  const handleUpdate = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 p-2 border rounded-l-lg"
        />
        <button
          onClick={handleAddTodo}
          className="bg-indigo-500 text-white px-4 rounded-r-lg hover:bg-indigo-600"
        >
          Add
        </button>
      </div>

      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
