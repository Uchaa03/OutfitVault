import FormLayout from "../layouts/FormLayout.jsx";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    passwordValidation,
    usernameValidation
} from "../hooks/validationSchemaHook.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { loginUser } from "../config/Auth.jsx";
import { useUserContext } from "../context/userContext.jsx";

const LoginPage = () => {
    const [error, setError] = useState(""); //Control error

    const validationSchema = Yup.object({
        username: usernameValidation,
        password: passwordValidation,
    });

    const navigate = useNavigate();
    const { login } = useUserContext(); // Get the login function from the context

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        setError(""); // Limpiar el error antes de intentar loguear
        try {
            const data = await loginUser(values.username, values.password);
            if (data.token) {
                login(data.token, values.username); // Set the user in the context
                navigate("/profile"); // Navigate to the vault or any other protected route
            }
            resetForm();
        } catch (error) {
                setError("CREDENCIALES INVÁLIDAS")
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <FormLayout>
            <header className="section__header">
                <h1 className="header__title">Inicia Sesión</h1>
                <NavLink className="header__button" to="/register">Regístrate</NavLink>
            </header>
            <Formik
                initialValues={{ username: '', password: '' }}
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
                     touched
                 }) => (
                    <form className="section__form" onSubmit={handleSubmit}>
                        <img className="form__img" src="/assets/img/IconUser.svg" alt="Imagen de registro" />
                        <fieldset className="form__fieldset">
                            <label className="fieldset__label" htmlFor="username">
                                Nombre de Usuario
                                {errors.username && touched.username &&
                                    (<img alt="Input Erróneo" className="input__error" src="/assets/img/wrong.png"/>)}
                            </label>
                            <input
                                className={errors.username && touched.username ? "fieldset__input fieldset__input--error" : "fieldset__input"}
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
                                    (<img alt="Input Erróneo" className="input__error" src="/assets/img/wrong.png"/>)}
                            </label>
                            <input
                                className={errors.password && touched.password ? "fieldset__input fieldset__input--error" : "fieldset__input"}
                                type="password"
                                name="password"
                                placeholder="Introduce tu Contraseña"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {error && <span className="form__error">{error}</span>}
                        </fieldset>
                        <button type="submit" disabled={isSubmitting} className="form__button">Iniciar Sesión</button>
                    </form>
                )
            }</Formik>
        </FormLayout>
    );
}

export default LoginPage;
