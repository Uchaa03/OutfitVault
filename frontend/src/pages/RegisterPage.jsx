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
    <section className="forms__section">
      <header className="section__header">
        <h1 className="header__title">Registrate</h1>
        <NavLink className="header__buttonForm" to="/login">
          Accede
        </NavLink>
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
          <form className="section__form" onSubmit={handleSubmit}>
            <img className="form__img" src="/assets/img/IconUser.svg" alt="Imagen de registro" />
            <fieldset className="form__fieldset">
              <label className="fieldset__label" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                className="fieldset__input"
                type="text"
                name="email"
                placeholder="Introduce tu Correo"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.email && touched.email && <p>{errors.email}</p>}
              <label className="fieldset__label" htmlFor="username">
                Nombre de Usuario
              </label>
              <input
                className="fieldset__input"
                type="text"
                name="username"
                placeholder="Crea tu nombre de Usuario"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.username && touched.username && <p>{errors.username}</p>}
              <label className="fieldset__label" htmlFor="password">
                Contraseña
              </label>
              <input
                className="fieldset__input"
                type="password"
                name="password"
                placeholder="Introduce tu Contraseña"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.password && touched.password && <p>{errors.password}</p>}
              <label className="fieldset__label" htmlFor="passwordVerification">
                Repite la contraseña
              </label>
              <input
                className="fieldset__input"
                type="password"
                name="passwordVerification"
                placeholder="Verifica la contraseña"
                value={values.passwordVerification}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.passwordVerification && touched.passwordVerification && (
                <p>{errors.passwordVerification}</p>
              )}
            </fieldset>
            <Button type="submit" disabled={isSubmitting} className="form__button">
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