import React from 'react'
import FormLayout from "../layouts/FormLayout.jsx";
import {Formik} from "formik";
import * as Yup from "yup";
import {requestValidation, usernameValidation} from "../hooks/validationSchemaHook.jsx";

const ContactPage = () => {
    const validationSchema = Yup.object({ //Object for customHook
        username: usernameValidation,
        request: requestValidation,
    })

    return (
        <FormLayout>
            <header className="section__header">
                <h1 className="header__title">Contacta con Nosotros</h1>
            </header>
            <Formik //For control and validation form
                initialValues={{username: '',request: ''}}
                onSubmit={onsubmit} //Call register backend API
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
                            <label className="fieldset__label" htmlFor="request">
                                Mensaje
                                {errors.request && touched.request &&
                                    (<img alt="Input Erroneo" className={"input__error"} src="/assets/img/wrong.png"/>)}
                            </label>
                            <textarea
                                className={errors.request && touched.request?"fieldset__textarea fieldset__textarea--error":"fieldset__textarea"}
                                name="request"
                                placeholder="Introduce tu Mensaje"
                                value={values.request}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <button type="submit" disabled={isSubmitting} className="form__button">Enviar</button>
                    </form>
                )
            }</Formik>
        </FormLayout>
    )
}
export default ContactPage
