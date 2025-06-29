import { loginUser } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (data, setError) => {
    try {
      const user = await loginUser(data.email, data.password);
      if (user) {
        navigate("/");
      }
    } catch (err) {
      let message = "An unexpected error occurred.";
      if (err.code === "auth/user-not-found") {
        message = "No estás registrado. Por favor crea una cuenta.";
      } else if (err.code === "auth/wrong-password") {
        message = "Contraseña incorrecta. Intenta nuevamente.";
      } else if (err.code === "auth/invalid-email") {
        message = "Formato de correo inválido.";
      } else if (err.code === "auth/too-many-requests") {
        message = "Demasiados intentos. Intenta más tarde.";
      }

      setError("firebase", {
        type: "manual",
        message,
      });
    }
  };

  return { handleLogin };
};
