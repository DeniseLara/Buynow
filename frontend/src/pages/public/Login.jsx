import './Form.css';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";
import { useEffect } from 'react';
import { IoWarningOutline } from "react-icons/io5";

function Login() {
    const { register, handleSubmit, formState: { errors }, setError, setFocus } = useForm();
    const { handleLogin } = useLogin();

    useEffect(() => {
        setFocus("email")
    }, [setFocus])

    return (
        <section className="form-container" aria-label="Login form">
            <article className="form-card">
                <h1 id="login-title">Welcome Back to <span>BuyNow</span> 🛍️</h1>
                <p className='login-description'>Login to continue shopping with us.</p>
                
                <form onSubmit={handleSubmit((data) => handleLogin(data, setError))} noValidate>
                    <div className="input-group">
                        <label className='sr-only' htmlFor="email"></label>
                        <input 
                            id='email'
                            type="email"
                            autoComplete="email"
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby="email-error"
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="error"><IoWarningOutline/>{errors.email.message}</p>}
                    </div>

                    <div className="input-group">
                        <label className='sr-only' htmlFor="password"></label>
                        <input 
                            id='password'
                            type="password"
                            placeholder="Password"
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
                                <IoWarningOutline/>{errors.password.message}
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
