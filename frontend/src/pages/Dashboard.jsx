import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TodoList from '../components/TodoList';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      const fetchTodos = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/todos`);
          setTodos(res.data);
        } catch (err) {
          console.error(err.response?.data?.message || 'Failed to fetch todos');
        }
      };
      fetchTodos();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return <TodoList todos={todos} setTodos={setTodos} />;
}

export default Dashboard;