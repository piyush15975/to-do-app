import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiEdit, FiTrash2, FiCheck } from 'react-icons/fi';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo?.title || '');

  if (!todo) return null;

  const handleToggle = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      onUpdate(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || 'Update failed');
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/todos/${todo._id}`, { title });
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${todo._id}`);
      onDelete(todo._id);
    } catch (err) {
      console.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center justify-between px-4 py-3 bg-white rounded-2xl shadow-lg mb-3 border border-gray-200"
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
        />

        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ) : (
          <span className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 ml-4">
        {isEditing ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpdate}
            title="Save"
            className="text-green-600 hover:text-green-700 transition"
          >
            <FiCheck size={20} />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            title="Edit"
            className="text-blue-600 hover:text-blue-700 transition"
          >
            <FiEdit size={20} />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          title="Delete"
          className="text-red-600 hover:text-red-700 transition"
        >
          <FiTrash2 size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default TodoItem;
