import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-900 text-white w-full px-6 py-4 flex justify-between items-center shadow-md"
    >
      <Link
        to="/"
        className="text-2xl font-bold hover:text-indigo-400 transition duration-300"
      >
        TodoApp
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        ) : (
          <>
            {isLoginPage && (
              <Link
                to="/register"
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
              >
                <FiUserPlus />
                <span>Register</span>
              </Link>
            )}

            {isRegisterPage && (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
              >
                <FiLogIn />
                <span>Login</span>
              </Link>
            )}

            {!isLoginPage && !isRegisterPage && (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
                >
                  <FiLogIn />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
                >
                  <FiUserPlus />
                  <span>Register</span>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;
