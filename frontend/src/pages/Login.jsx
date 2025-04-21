import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    const success = await login(username, password);
    if (success) {
      navigate('/');
    }
    return success;
  };

  return <AuthForm onSubmit={handleLogin} title="Login" buttonText="Login" />;
}

export default Login;