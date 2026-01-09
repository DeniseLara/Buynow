import './Form.css';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { IoWarningOutline } from "react-icons/io5";
import { FORM_CONFIG } from '../../utils/authFormConfig';

function AuthForm({ 
  type = 'login', 
  onSubmit,
  serverError,
  onFieldError
}) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setFocus,
    setError 
  } = useForm();
  
  const config = FORM_CONFIG[type];

  // Enfocar el primer campo
  useEffect(() => {
    if (config.fields[0]) {
      setFocus(config.fields[0].name);
    }
  }, [setFocus, config.fields]);

  // Manejar errores del servidor
  useEffect(() => {
    if (serverError && onFieldError) {
      onFieldError('firebase', { type: 'manual', message: serverError });
    } else if (serverError && setError) {
      setError('firebase', { type: 'manual', message: serverError });
    }
  }, [serverError, setError, onFieldError]);

  const handleFormSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data, setError);
    }
  };

  return (
    <section className="form-container section" aria-labelledby={`${type}-title`}>
      <article className="form-card">
        <header className="form-header">
        <h1 id={`${type}-title`}>
          {config.title} <span>BuyNow</span> 🛍️
        </h1>
        <p className="auth-description">{config.description}</p>
        </header>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          {config.fields.map(field => (
            <div className="input-group" key={field.name}>
              <label className='sr-only' htmlFor={field.name}>
                {field.placeholder}
              </label>
              <input 
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                aria-invalid={errors[field.name] ? "true" : "false"}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                {...register(field.name, field.validation)}
              />
              {errors[field.name] && (
                <p id={`${field.name}-error`} className="error" role="alert">
                  <IoWarningOutline/>{errors[field.name].message}
                </p>
              )}
            </div>
          ))}

          {errors.firebase && (
            <p id="form-error" className="error-message" role="alert">
              {errors.firebase.message}
            </p>
          )} 

          <button 
            type="submit" 
            className="form-btn"
            aria-label={`submit ${type} form`}
          >
            {config.buttonText}
          </button>
        </form>

        <p className="form-text">
          {config.switchText} <Link to={config.switchLink}>{config.switchLabel}</Link>
        </p>
      </article>
    </section>
  );
}

export default AuthForm;