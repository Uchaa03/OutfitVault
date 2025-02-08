import { Formik } from "formik";
import * as Yup from "yup";
import {
  emailValidation,
  passwordValidation,
  passwordVerificationValidation,
  usernameValidation,
} from "../hooks/validationSchemaHook.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../config/Auth.jsx";
import { useUserContext } from "../context/userContext.jsx";
import Button from "../components/button/button.jsx";
import { Helmet } from "react-helmet";

/**
 * RegisterPage Component
 *
 * Renders the user registration form with validation. Upon successful registration,
 * the user is logged in and navigated to the vault page.
 *
 * @component
 * @returns {JSX.Element} The rendered RegisterPage component.
 */
const RegisterPage = () => {
  const validationSchema = Yup.object({
    email: emailValidation,
    username: usernameValidation,
    password: passwordValidation,
    passwordVerification: passwordVerificationValidation,
  });

  const navigate = useNavigate();
  const { login } = useUserContext();

  /**
   * Handles form submission for user registration.
   *
   * @async
   * @param {Object} values - The form values containing email, username, password, and passwordVerification.
   * @param {Function} setSubmitting - Function to update the form submitting state.
   * @param {Function} resetForm - Function to reset the form state.
   * @returns {Promise<void>}
   */
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const data = await registerUser(values.username, values.email, values.password);
      if (data.token) {
        await login(data.token, values.username);
        navigate("/vault");
      }
      resetForm();
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="forms" role="main">
      <Helmet>
        <title>Regístrate - OutfitVault</title>
        <meta name="description" content="Crea tu cuenta en OutfitVault y gestiona tu armario digital de forma inteligente. Regístrate ahora y descubre un nuevo mundo de moda." />
        <link rel="canonical" href="https://outfitvault-1.onrender.com/register" />
      </Helmet>
      <section className="forms__section forms__section--register">
        <header className="section__header">
          <h1 className="header__title">Registrate</h1>
          <button 
            type="button" 
            className="header__buttonForm" 
            onClick={() => navigate('/login')}
          >
            Accede
          </button>
        </header>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            passwordVerification: "",
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, handleBlur, errors, touched }) => (
            <form className="section__form" method={"post"} onSubmit={handleSubmit} noValidate>
              <img className="form__img" src="/assets/img/IconUser.svg" alt="Imagen de registro" />
              <fieldset className="form__fieldset">
                <legend className="visually-hidden">Formulario de registro de usuario</legend>
                <label className="fieldset__label" htmlFor="register-email">
                  Correo Electrónico
                  {errors.email && touched.email && (
                    <img
                      className="input__error"
                      src="/assets/img/wrong.png"
                      alt="Error en el campo"
                      role="img"
                    />
                  )}
                </label>
                <input
                  id="register-email"
                  className={errors.email && touched.email ? "fieldset__input fieldset__input--error" : "fieldset__input"}
                  type="email"
                  name="email"
                  aria-required="true"
                  aria-invalid={errors.email && touched.email ? "true" : "false"}
                  aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                  placeholder="Introduce tu Correo"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <span id="email-error" className="form__error" role="alert">
                    {errors.email}
                  </span>
                )}
                <label className="fieldset__label" htmlFor="register-username">
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
                  id="register-username"
                  className={errors.username && touched.username ? "fieldset__input fieldset__input--error" : "fieldset__input"}
                  type="text"
                  name="username"
                  aria-required="true"
                  aria-invalid={errors.username && touched.username ? "true" : "false"}
                  aria-describedby={errors.username && touched.username ? "username-error" : undefined}
                  placeholder="Crea tu nombre de Usuario"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.username && touched.username && (
                  <span id="username-error" className="form__error" role="alert">
                    {errors.username}
                  </span>
                )}
                <label className="fieldset__label" htmlFor="register-password">
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
                  id="register-password"
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
                  <span id="password-error" className="form__error" role="alert">
                    {errors.password}
                  </span>
                )}
                <label className="fieldset__label" htmlFor="register-password-verification">
                  Repite la contraseña
                  {errors.passwordVerification && touched.passwordVerification && (
                    <img
                      className="input__error"
                      src="/assets/img/wrong.png"
                      alt="Error en el campo"
                      role="img"
                    />
                  )}
                </label>
                <input
                  id="register-password-verification"
                  className={errors.passwordVerification && touched.passwordVerification ? "fieldset__input fieldset__input--error" : "fieldset__input"}
                  type="password"
                  name="passwordVerification"
                  aria-required="true"
                  aria-invalid={errors.passwordVerification && touched.passwordVerification ? "true" : "false"}
                  aria-describedby={errors.passwordVerification && touched.passwordVerification ? "password-verification-error" : undefined}
                  placeholder="Verifica la contraseña"
                  value={values.passwordVerification}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.passwordVerification && touched.passwordVerification && (
                  <span id="password-verification-error" className="form__error" role="alert">
                    {errors.passwordVerification}
                  </span>
                )}
              </fieldset>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="form__button"
                aria-disabled={isSubmitting}
              >
                Registrate
              </Button>
            </form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default RegisterPage;