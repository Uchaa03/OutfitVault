import { Formik } from "formik";
import * as Yup from "yup";
import { passwordValidation, usernameValidation } from "../hooks/validationSchemaHook.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { loginUser } from "../config/Auth.jsx";
import { useUserContext } from "../context/userContext.jsx";
import Button from "../components/button/button.jsx";

/**
 * Renders the login form for user authentication.
 *
 * @component
 * @returns {JSX.Element} The LoginPage component.
 */
const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUserContext();

  // Define validation rules for the form.
  const validationSchema = Yup.object({
    username: usernameValidation,
    password: passwordValidation,
  });

  /**
   * Handles the form submission.
   *
   * @async
   * @param {Object} values - Form values.
   * @param {Function} param1.setSubmitting - Function to toggle submitting state.
   * @param {Function} param1.resetForm - Function to reset the form state.
   * @returns {Promise<void>}
   */
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setError("");
    try {
      const data = await loginUser(values.username, values.password);
      if (data.token) {
        await login(data.token, values.username);
        navigate("/profile");
      }
      resetForm();
    } catch (err) {
      setError("CREDENCIALES INVÁLIDAS");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="forms" role="main">
      <section className="forms__section forms__section--login">
        <header className="section__header">
          <h1 className="header__title">Inicia Sesión</h1>
          <NavLink className="header__buttonForm" to="/register">Regístrate</NavLink>
        </header>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, handleBlur, errors, touched }) => (
            <form className="section__form" method={"post"} onSubmit={handleSubmit}>
              <img
                className="form__img"
                src="/assets/img/IconUser.svg"
                alt="Imagen de registro"
              />
              <fieldset className="form__fieldset">
                <legend className="visually-hidden">Formulario de inicio de sesión</legend>
                <label className="fieldset__label" htmlFor="login-username">
                  Nombre de Usuario
                  {errors.username && touched.username && (
                    <img
                      className="input__error"
                      src="/assets/img/wrong.png"
                      alt="Error en el campo"
                      role="img"
                    />
                  )}
                </label>
                <input
                  id="login-username"
                  className={errors.username && touched.username ? "fieldset__input fieldset__input--error" : "fieldset__input"}
                  type="text"
                  name="username"
                  aria-required="true"
                  aria-invalid={errors.username && touched.username ? "true" : "false"}
                  aria-describedby={errors.username && touched.username ? "username-error" : undefined}
                  placeholder="Introduce tu nombre de Usuario"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.username && touched.username && (
                  <span id="username-error" className="form__error">
                    {errors.username}
                  </span>
                )}
                <label className="fieldset__label" htmlFor="login-password">
                  Contraseña
                  {errors.password && touched.password && (
                    <img
                      className="input__error"
                      src="/assets/img/wrong.png"
                      alt="Error en el campo"
                      role="img"
                    />
                  )}
                </label>
                <input
                  id="login-password"
                  className={errors.password && touched.password ? "fieldset__input fieldset__input--error" : "fieldset__input"}
                  type="password"
                  name="password"
                  aria-required="true"
                  aria-invalid={errors.password && touched.password ? "true" : "false"}
                  aria-describedby={errors.password && touched.password ? "password-error" : undefined}
                  placeholder="Introduce tu Contraseña"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <span id="password-error" className="form__error">
                    {errors.password}
                  </span>
                )}
                {error && (
                  <span id="form-error" className="form__error" role="alert">
                    {error}
                  </span>
                )}
              </fieldset>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="form__button"
                aria-disabled={isSubmitting}
              >
                Iniciar Sesión
              </Button>
            </form>
          )}
        </Formik>
      </section>
    </main>
);
};

export default LoginPage;