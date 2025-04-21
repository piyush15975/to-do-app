import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (username, password) => {
    const success = await register(username, password);
    if (success) {
      navigate('/');
    }
    return success;
  };

  return <AuthForm onSubmit={handleRegister} title="Register" buttonText="Register" />;
}

export default Register;