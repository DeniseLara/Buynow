export const FORM_CONFIG = {
  login: {
    title: "Welcome Back to",
    description: "Login to continue shopping with us.",
    buttonText: "Log In",
    switchText: "Don't have an account?",
    switchLink: "/signup",
    switchLabel: "Sign up",
    fields: [
      {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        autoComplete: 'email',
        validation: {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Please enter a valid email address'
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        autoComplete: 'current-password',
        validation: {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        }
      }
    ]
  },
  signup: {
    title: "Welcome to",
    description: "Create an account to start shopping with us.",
    buttonText: "Create Account",
    switchText: "Already have an account?",
    switchLink: "/login",
    switchLabel: "Log in",
    fields: [
      {
        name: 'username',
        type: 'text',
        placeholder: 'Name',
        autoComplete: 'name',
        validation: {
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters'
          }
        }
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        autoComplete: 'email',
        validation: {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Please enter a valid email address'
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        autoComplete: 'new-password',
        validation: {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        }
      }
    ]
  }
};