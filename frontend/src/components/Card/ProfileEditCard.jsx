import React from "react";
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
    const token = localStorage.getItem("authToken"); // Get the authentication token from localStorage
    const navigate = useNavigate(); // Hook to navigate to a different route

    // Validation schema for the form
    const validationSchema = Yup.object({
        username: usernameValidation, // Use a custom validation from the validationSchemaHook
    });

    /**
     * Handles form submission to update the username.
     * Calls the API and navigates to the profile page if successful.
     *
     * @param {Object} values - The form values.
     * @param {Object} actions - Formik actions (e.g., setSubmitting).
     */
    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const data = await updateUsername(values.username, token);
            if (data.success) {
                setEdit(); // Toggle edit mode off
                navigate("/profile"); // Navigate to the profile page
            }
        } catch (error) {
            console.error('Error during username update:', error);
        } finally {
            setSubmitting(false); // Set submitting state to false when the process is complete
        }
    };

    return (
        <article>
            <Formik
                initialValues={{ username: userData.user.username }} // Set initial value for username
                onSubmit={onSubmit} // Submit handler
                validationSchema={validationSchema} // Apply validation schema
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
                            <Button type="submit" disabled={isSubmitting} className="buttons__button">Guardar</Button>
                            <Button className="buttons__button" onClick={setEdit}>Cancelar</Button>
                        </fieldset>
                    </form>
                )}
            </Formik>
        </article>
    );
};

export default ProfileEditCard;
