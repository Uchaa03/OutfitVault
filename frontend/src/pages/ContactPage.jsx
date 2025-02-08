import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { requestValidation, usernameValidation } from '../hooks/validationSchemaHook.jsx';
import Button from '../components/button/button.jsx';
import { Helmet } from 'react-helmet';

/**
 * ContactPage Component
 *
 * Renders a contact form using Formik for form state management and validation.
 * Users can submit their username and message.
 *
 * @component
 * @returns {JSX.Element} The rendered ContactPage component.
 */
const ContactPage = () => {
  // Validation schema for the contact form using Yup
  const validationSchema = Yup.object({
    username: usernameValidation,
    request: requestValidation,
  });

  /**
   * Handles form submission.
   *
   * @param {Object} values - The form values.
   * @param {Object} actions - Formik actions.
   */
  const onsubmit = (values, actions) => {
    // Placeholder for form submission logic
    console.log('Form submitted:', values);
    actions.setSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Contacto - OutfitVault | Tu Armario Digital con IA</title>
        <meta name="description" content="Contacta con el equipo de OutfitVault para resolver tus dudas sobre nuestro armario digital inteligente." />
        <meta name="keywords" content="contacto outfitvault, armario digital, ayuda outfitvault, soporte outfitvault" />
        <link rel="canonical" href="https://outfitvault.com/contact" />
      </Helmet>
    
    <main className="forms" role="main">
    <section className="forms__section">
      <header className="section__header">
        <h1 className="header__title">Contacta con Nosotros</h1>
      </header>
      <Formik
        initialValues={{ username: '', request: '' }}
        onSubmit={onsubmit}
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
          <form className="section__form" onSubmit={handleSubmit} noValidate>
            <img className="form__img" src="/assets/img/IconUser.svg" alt="Imagen de registro" />
            <fieldset className="form__fieldset">
              <legend className="visually-hidden">Formulario de contacto</legend>
              <label className="fieldset__label" htmlFor="contact-username">
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
                id="contact-username"
                className={errors.username && touched.username 
                  ? 'fieldset__input fieldset__input--error'
                  : 'fieldset__input'
                }
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
                <span id="username-error" className="fieldset__error" role="alert">
                  {errors.username}
                </span>
              )}

              <label className="fieldset__label" htmlFor="contact-request">
                Mensaje
                {errors.request && touched.request && (
                  <img 
                    className="input__error" 
                    src="/assets/img/wrong.png" 
                    alt="Error en el campo"
                    role="img"
                  />
                )}
              </label>
              <textarea
                id="contact-request"
                className={errors.request && touched.request
                  ? 'fieldset__textarea fieldset__textarea--error'
                  : 'fieldset__textarea'
                }
                name="request"
                aria-required="true"
                aria-invalid={errors.request && touched.request ? "true" : "false"}
                aria-describedby={errors.request && touched.request ? "request-error" : undefined}
                placeholder="Introduce tu Mensaje"
                value={values.request}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.request && touched.request && (
                <span id="request-error" className="fieldset__error" role="alert">
                  {errors.request}
                </span>
              )}
            </fieldset>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="form__button"
              aria-disabled={isSubmitting}
            >
              Enviar
            </Button>
          </form>
        )}
      </Formik>
      </section>
    </main>
  </>
  );
};

export default ContactPage;