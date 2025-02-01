import FormLayout from "../layouts/FormLayout.jsx";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    emailValidation,
    passwordValidation,
    passwordVerficationValidation,
    usernameValidation
} from "../hooks/validationSchemaHook.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../config/Auth.jsx";
import { useUserContext } from "../context/userContext.jsx";
import React from "react";

const RegisterPage = () => {
    const validationSchema = Yup.object({
        email: emailValidation,
        username: usernameValidation,
        password: passwordValidation,
        passwordVerification: passwordVerficationValidation,
    });

    const navigate = useNavigate();
    const { login } = useUserContext(); // Get the login function from the context

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const data = await registerUser(values.username, values.email, values.password);
            if (data.token) {
                login(data.token, values.username); // Set the user in the context
                navigate("/vault"); // Navigate to the vault or any other protected route
            }
            resetForm();
        } catch (error) {
            console.error('Error durante el registro:', error);
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
                            <label className="fieldset__label" htmlFor="email">
                                Correo Electrónico
                                {errors.email && touched.email &&
                                    (<img alt="Input Erroneo" className={"input__error"} src="/assets/img/wrong.png"/>)}
                            </label>
                            <input
                                className={errors.email && touched.email?"fieldset__input fieldset__input--error":"fieldset__input"}
                                type="text"
                                name="email"
                                placeholder="Introduce tu Correo"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <label className="fieldset__label" htmlFor="username">
                                Nombre de Usuario
                                {errors.username && touched.username &&
                                    (<img alt="Input Erroneo" className={"input__error"} src="/assets/img/wrong.png"/>)}
                            </label>
                            <input
                                className={errors.username && touched.username?"fieldset__input fieldset__input--error":"fieldset__input"}
                                type="text"
                                name="username"
                                placeholder="Crea tu nombre de Usuario"
                                value={values.username}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <label className="fieldset__label" htmlFor="password">
                                Contraseña
                                {errors.password && touched.password &&
                                    (<img alt="Input Erroneo" className={"input__error"} src="/assets/img/wrong.png"/>)}
                            </label>
                            <input
                                className={errors.password && touched.password?"fieldset__input fieldset__input--error":"fieldset__input"}
                                type="password"
                                name="password"
                                placeholder="Introduce tu Contraseña"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <label className="fieldset__label" htmlFor="passwordVerification">
                                Repite la contraseña
                                {errors.passwordVerfication && touched.passwordVerfication &&
                                    (<img alt="Input Erroneo" className={"input__error"} src="/assets/img/wrong.png"/>)}
                            </label>
                            <input
                                className={errors.passwordVerification && touched.passwordVerification?"fieldset__input fieldset__input--error":"fieldset__input"}
                                type="password"
                                name="passwordVerification"
                                placeholder="Verifica la contraseña"
                                value={values.passwordVerification}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <button type="submit" disabled={isSubmitting} className="form__button">Registrate</button>
                    </form>
                )
            }</Formik>
        </FormLayout>
    );
}

export default RegisterPage;