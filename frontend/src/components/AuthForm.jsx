import { useState } from 'react';
import { motion } from 'framer-motion';

function AuthForm({ onSubmit, title, buttonText }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await onSubmit(username, password);
    if (!success) {
      setError('Invalid credentials');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-20 px-8 py-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30"
    >
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-all"
        >
          {buttonText}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default AuthForm;
