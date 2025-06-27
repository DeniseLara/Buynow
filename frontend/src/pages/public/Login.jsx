import './Form.css';
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";


function Login() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const { handleLogin, loginError } = useLogin();

    return (
        <div className="form-container">
            <div className="form-card">
                <h1>Welcome Back to <span>BuyNow</span> 🛍️</h1>
                <p>Login to continue shopping with us.</p>
                
                <form onSubmit={handleSubmit((data) => handleLogin(data, setError))}>
                    <div className="input-group">
                        <input 
                            type="email"
                            autoComplete="email"
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby="email-error"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    <div className="input-group">
                        <input 
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            aria-invalid={errors.password ? "true" : "false"}
                            aria-describedby="password-error"
                            {...register("password", { 
                                required: "Password is required", 
                                minLength: { value: 6, message: "Password must be at least 6 characters" } 
                            })}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>

                    {errors.firebase && <p className="error-message">{errors.firebase.message}</p>} 

                    <button type="submit" 
                    className="form-btn"
                    aria-label="submit login form"
                    >
                        Log In
                    </button>
                </form>

                <p className="form-text">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
