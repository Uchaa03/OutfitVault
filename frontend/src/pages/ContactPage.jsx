import React from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import { requestValidation, usernameValidation } from "../hooks/validationSchemaHook.jsx";
import FormLayout from './FormLayout.jsx';

/**
 * ContactPage Component
 *
 * This component renders a contact form using Formik for form state management and validation.
 * It allows users to submit their username and message.
 *
 * @component
 * @returns {JSX.Element} The rendered ContactPage component.
 */
const ContactPage = () => {
  /**
   * Validation schema for the contact form.
   * Defines validation rules using Yup.
   */
  const validationSchema = Yup.object({
    username: usernameValidation,
    request: requestValidation,
  });

  return (
    <FormLayout>
      <header className="section__header">
        <h1 className="header__title">Contacta con Nosotros</h1>
      </header>

      <Formik
        initialValues={{ username: '', request: '' }}
        onSubmit={onsubmit} // Calls backend API to process the form submission
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          handleBlur,
          errors,
          touched,
        }) => (
          <form className="section__form" onSubmit={handleSubmit}>
            <img className="form__img" src="/assets/img/IconUser.svg" alt="Imagen de registro" />

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

              <label className="fieldset__label" htmlFor="request">Mensaje</label>
              <textarea
                className="fieldset__textarea"
                name="request"
                placeholder="Introduce tu Mensaje"
                value={values.request}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.request && touched.request && (<p>{errors.request}</p>)}
            </fieldset>

            <button type="submit" disabled={isSubmitting} className="form__button">Enviar</button>
          </form>
        )}
      </Formik>
    </FormLayout>
  );
};

export default ContactPage;
