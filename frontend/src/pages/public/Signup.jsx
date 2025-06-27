import './Form.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { registerUser } from "../../firebase/firebase";


function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            const user = await registerUser(data.email, data.password, data.name); // Usamos registerUser
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
        <div className="form-container">
            <div className="form-card">
                <h1>Welcome to <span>BuyNow</span> 🛍️</h1>
                <p>Create an account to start shopping with us.</p>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                  <input 
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                    />
                      {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                    <div className="input-group">
                        <input 
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    <div className="input-group">
                        <input 
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { 
                                required: "Password is required", 
                                minLength: { value: 6, message: "Password must be at least 6 characters" } 
                            })}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>

                    {errorMessage && <p className="error">{errorMessage}</p>} 


                    <button type="submit" 
                    className="form-btn"
                    aria-label="submit sign-up form">
                        Create Account
                    </button>
                </form>

                <p className="form-text">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;