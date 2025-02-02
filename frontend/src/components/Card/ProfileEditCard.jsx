import React from "react";
import * as Yup from "yup";
import {usernameValidation} from "../../hooks/validationSchemaHook.jsx";
import {Formik} from "formik";
import {updateUsername} from "../../config/Auth.jsx";
import {useNavigate} from "react-router-dom";
import Button from "../button/button.jsx";

const ProfileEditCard = ({ userData, setEdit }) => {
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        username: usernameValidation,
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const data = await updateUsername(values.username,token);
            if (data.success) {
                setEdit()
                navigate("/profile");
            }
        } catch (error) {
            console.error('Error durante el cambio de username:', error);
        } finally {
            setSubmitting(false);
        }
    };

    console.log(userData)

    return (
        <article>
            <Formik
                initialValues={{  username: userData.user.username}}
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
                )
            }</Formik>

        </article>
    );
};

export default ProfileEditCard;