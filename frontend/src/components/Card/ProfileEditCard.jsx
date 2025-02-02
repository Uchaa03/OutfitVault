import React, { useState } from "react";
import * as Yup from "yup";
import { usernameValidation } from "../../hooks/validationSchemaHook.jsx";
import { Formik } from "formik";
import { updateUsername } from "../../config/Auth.jsx";
import { useNavigate } from "react-router-dom";
import Button from "../button/button.jsx";

/**
 * ProfileEditCard component allows users to edit their username.
 * 
 * It renders a form with a username input field, validates the input,
 * and calls the API to update the username when the form is submitted.
 * The form also allows the user to cancel the edit.
 *
 * @param {Object} userData - The user data, including the current username.
 * @param {Function} setEdit - A function that toggles the edit mode in the parent component.
 * 
 * @returns {JSX.Element} The form for editing the username.
 */
const ProfileEditCard = ({ userData, setEdit }) => {
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    const validationSchema = Yup.object({
        username: usernameValidation,
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const data = await updateUsername(values.username, token);
            if (data.success) {
                setEdit();
                navigate("/vault");
            } else {
                // Set server error message
                setServerError(data.message || "Error al actualizar el nombre de usuario");
            }
        } catch (error) {
            setServerError("El nombre de usuario ya está en uso");
            console.error('Error during username update:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <article>
            <Formik
                initialValues={{ username: userData.user.username }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    handleBlur,
                    errors,
                    touched
                }) => (
                    <form className="form__edit" onSubmit={handleSubmit}>
                        <fieldset className="edit__fieldset">
                            <label className="fieldset__label" htmlFor="username">
                                Nombre de Usuario
                            </label>
                            <input
                                className={`fieldset__input ${
                                    ((errors.username && touched.username) || serverError) 
                                    ? 'fieldset__input--error' 
                                    : ''
                                }`}
                                type="text"
                                name="username"
                                placeholder="Crea tu nombre de Usuario"
                                value={values.username}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {errors.username && touched.username && (
                                <p className="fieldset__error">{errors.username}</p>
                            )}
                            {serverError && (
                                <p className="fieldset__error">{serverError}</p>
                            )}
                            <Button 
                                type="submit" 
                                disabled={isSubmitting} 
                                className="buttons__button"
                            >
                                Guardar
                            </Button>
                            <Button 
                                className="buttons__button" 
                                onClick={setEdit}
                            >
                                Cancelar
                            </Button>
                        </fieldset>
                    </form>
                )}
            </Formik>
        </article>
    );
};

export default ProfileEditCard;