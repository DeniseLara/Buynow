import './Form.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/authService";

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            const user = await registerUser(data.email, data.password, data.name); 
            if (user) {
                navigate("/"); // Redirige si el registro es exitoso
            } else {
                setErrorMessage("Failed to create account. Please try again.");
            }
        } catch (err) {
            const errorMessages = {
                "auth/email-already-in-use": "This email is already in use.",
                "auth/invalid-email": "Invalid email format.",
                "auth/weak-password": "Password is too weak. Must be at least 6 characters."
            };
            setErrorMessage(errorMessages[err.code] || "Failed to create account. Please try again.");
        }
    };

    return (
        <section className="form-container" aria-labelledby="signup-title">
            <section className="form-card">
                <h1 id="signup-title">Welcome to <span>BuyNow</span> 🛍️</h1>
                <p>Create an account to start shopping with us.</p>
                
                <form 
                    onSubmit={handleSubmit(onSubmit)} 
                    noValidate 
                    aria-describedby={errorMessage ? "form-error" : undefined}
                >
                    <div className="input-group">
                        <input 
                            type="text"
                            placeholder="Enter your name"
                            {...register("name", { required: "Name is required" })}
                            aria-invalid={errors.name ? "true" : "false"}
                            aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && ( 
                            <p id="name-error" className="error" role="alert">
                            {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="input-group">
                        <input 
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                            <p id="email-error" className="error" role="alert">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="input-group">
                        <input 
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { 
                                required: "Password is required", 
                                minLength: { value: 6, message: "Password must be at least 6 characters" } 
                            })}
                            aria-invalid={errors.password ? "true" : "false"}
                            aria-describedby={errors.password ? "password-error" : undefined}
                        />
                        {errors.password && (
                            <p id="password-error" className="error" role="alert">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {errorMessage && (
                        <p id="form-error" className="error" role="alert" tabIndex={-1}>
                            {errorMessage}
                        </p>
                    )} 


                    <button 
                        type="submit" 
                        className="form-btn"
                        aria-label="submit sign-up form"
                    >
                        Create Account
                    </button>
                </form>

                <p className="form-text">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </section>
        </section>
    );
}

export default Signup;