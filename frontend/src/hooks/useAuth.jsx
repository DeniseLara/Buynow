import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function useAuth(type) {
  const { login, signUp } = useAuthContext();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (data, setError) => {
    setIsLoading(true);
    setServerError(null);

    try {
      if (type === 'login') {
        await login(data.email, data.password);
      } else if (type === 'signup') {
        await signUp(data.username, data.email, data.password);
      }
      
      navigate('/');
      return true;
    } catch (error) {
      const errorMap = {
        'auth/invalid-credential': 'Invalid email or password',
        'auth/email-already-in-use': 'Email already in use',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/network-request-failed': 'Network error. Please try again',
      };
      
      const errorMessage = errorMap[error.code] || 'An error occurred';
      
      // Pasar error al formulario
      if (setError) {
        setError('firebase', { type: 'manual', message: errorMessage });
      }
      
      setServerError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAuth,
    serverError,
    isLoading,
    setServerError
  };
}