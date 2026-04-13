import { useAuth } from '../../hooks/useAuth';
import AuthForm from './AuthForm';

function Signup() {
  const { handleAuth, serverError } = useAuth('signup');

  return (
    <AuthForm
      type="signup"
      onSubmit={handleAuth}
      serverError={serverError}
    />
  );
}

export default Signup;