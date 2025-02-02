import { Formik } from "formik";
import * as Yup from "yup";
import {
    emailValidation,
    passwordValidation,
    passwordVerificationValidation,
    usernameValidation
} from "../hooks/validationSchemaHook.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../config/Auth.jsx";
import { useUserContext } from "../context/userContext.jsx";
import Button from "../components/button/button.jsx";

const RegisterPage = () => {
    /**
     * Validation schema using Yup for validating form fields.
     */
    const validationSchema = Yup.object({
        email: emailValidation,
        username: usernameValidation,
        password: passwordValidation,
        passwordVerification: passwordVerificationValidation,
    });

    const navigate = useNavigate();
    const { login } = useUserContext(); // Get the login function from the context

    /**
     * Handles form submission for user registration.
     * It attempts to register the user using the `registerUser` function and navigates to the vault page upon successful registration.
     *
     * @async
     * @param {Object} values - The form values.
     * @param {Function} setSubmitting - Function to set submitting status.
     * @param {Function} resetForm - Function to reset the form.
     * @returns {Promise<void>} Resolves after user registration attempt.
     */
    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const data = await registerUser(values.username, values.email, values.password);
            if (data.token) {
                await login(data.token, values.username); // Set the user in the context
                navigate("/vault"); // Navigate to the vault or any other protected route
            }
            resetForm();
        } catch (error) {
            console.error('Error during registration:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <FormLayout>
            <header className="section__header">
                <h1 className="header__title">Registrate</h1>
                <NavLink className="header__button" to="/login">Accede</NavLink>
            </header>
            <Formik
                initialValues={{ email: '', username: '', password: '', passwordVerification: '' }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >{
                ({
                    values,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    handleBlur,
                    errors,
                    touched,
                }) => (
                    <form className="section__form" onSubmit={handleSubmit}>
                        <img className="form__img" src="/assets/img/IconUser.svg" alt="Imagen de registro"/>
                        <fieldset className="form__fieldset">
                            <label className="fieldset__label" htmlFor="email">Correo Electrónico</label>
                            <input
                                className="fieldset__input"
                                type="text"
                                name="email"
                                placeholder="Introduce tu Correo"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {errors.email && touched.email && (<p>{errors.email}</p>)}
                            <label className="fieldset__label" htmlFor="username">Nombre de Usuario</label>
                            <input
                                className="fieldset__input"
                                type="text"
                                name="username"
                                placeholder="Crea tu nombre de Usuario"
                                value={values.username}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {errors.username && touched.username && (<p>{errors.username}</p>)}
                            <label className="fieldset__label" htmlFor="password">Contraseña</label>
                            <input
                                className="fieldset__input"
                                type="password"
                                name="password"
                                placeholder="Introduce tu Contraseña"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {errors.password && touched.password && (<p>{errors.password}</p>)}
                            <label className="fieldset__label" htmlFor="passwordVerification">Repite la contraseña</label>
                            <input
                                className="fieldset__input"
                                type="password"
                                name="passwordVerification"
                                placeholder="Verifica la contraseña"
                                value={values.passwordVerification}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {errors.passwordVerification && touched.passwordVerification && (<p>{errors.passwordVerification}</p>)}
                        </fieldset>
                        <Button type="submit" disabled={isSubmitting} className="form__button">Registrate</Button>
                    </form>
                )
            }</Formik>
        </FormLayout>
    );
}

export default RegisterPage;
