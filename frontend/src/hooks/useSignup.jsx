import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useSignUp = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignUp = async (data) => {
        try {
            const user = await registerUser(data.email, data.password, data.name);
            if (user) {
                navigate("/");
            }
        } catch (err) {
            const errorMessages = {
                "auth/email-already-in-use": "Este correo ya está en uso.",
                "auth/invalid-email": "Formato de correo inválido.",
                "auth/weak-password": "Contraseña demasiado débil. Mínimo 6 caracteres.",
            };
            setErrorMessage(errorMessages[err.code])
        }
    };

    return { handleSignUp, errorMessage };
}