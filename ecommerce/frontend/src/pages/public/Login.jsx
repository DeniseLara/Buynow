import { useAuth } from '../../hooks/useAuth';
import AuthForm from './AuthForm';
function Login() {
  const { handleAuth, serverError } = useAuth('login');

  return (
    <AuthForm
      type="login"
      onSubmit={handleAuth}
      serverError={serverError}
    />
  );
}

export default Login;