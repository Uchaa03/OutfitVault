import FormLayout from "../layouts/FormLayout.jsx";
import {Formik} from "formik";
import * as Yup from "yup";
import {
    passwordValidation,
    usernameValidation
} from "../hooks/validationSchemaHook.jsx";
import {NavLink} from "react-router-dom";
import React from "react";
import {loginUser} from "../config/Auth.jsx";

const LoginPage = () => {
    const validationSchema = Yup.object({ //Object for customHook
        username: usernameValidation,
        password: passwordValidation,
    })

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await loginUser(values.username, values.password)
            resetForm()
        } catch (error) {
            console.error('Error durante el registro:', error)
        } finally {
            setSubmitting(false)
        }
    };

    return (
      <FormLayout>
          <header className="section__header">
              <h1 className="header__title">Inicia Sesión</h1>
              <NavLink className="header__button" to="/register">Regístrate</NavLink>
          </header>
          <Formik //For control and validation form
              initialValues={{email: '', username: '',password: '', passwordVerification: '', }}
              onSubmit={onSubmit} //Call register backend API
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
                      <img className="form__img" src="/assets/img/IconUser.svg" alt="Imagen de registro"/>
                      <fieldset className="form__fieldset">
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
                      </fieldset>
                      <button type="submit" disabled={isSubmitting} className="form__button">Registrate</button>
                  </form>
              )
          }</Formik>
      </FormLayout>
  )
}

export default LoginPage