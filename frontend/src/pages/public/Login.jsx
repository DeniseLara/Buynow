import './Form.css';
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";


function Login() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const { handleLogin, loginError } = useLogin();

    return (
        <section className="form-container" aria-label="Login form">
            <article className="form-card">
                <h1 id="login-title">Welcome Back to <span>BuyNow</span> 🛍️</h1>
                <p>Login to continue shopping with us.</p>
                
                <form onSubmit={handleSubmit((data) => handleLogin(data, setError))} noValidate>
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
                            aria-describedby={errors.password ? "password-error" : undefined}
                            {...register("password", { 
                                required: "Password is required", 
                                minLength: { value: 6, message: "Password must be at least 6 characters" } 
                            })}
                        />
                        {errors.password && (
                            <p id="password-error" className="error" role="alert">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {errors.firebase && (
                        <p id="form-error" className="error-message" role="alert">
                            {errors.firebase.message}
                        </p>
                    )} 

                    <button 
                    type="submit" 
                    className="form-btn"
                    aria-label="submit login form"
                    >
                        Log In
                    </button>
                </form>

                <p className="form-text">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </article>
        </section>
    );
}

export default Login;
