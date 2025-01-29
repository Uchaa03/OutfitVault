import * as Yup from "yup";

//Email Regex
const regexMail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/

export const emailValidation = Yup.string()
    .trim()
    .matches(regexMail, "El correo no es válido")
    .required("El correo es necesario")

export const passwordValidation = Yup.string()
    .trim()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(20, "La contraseña no debe exceder los 20 caracteres")
    .matches(/[A-Z]/, "La contraseña debe incluir al menos una letra mayúscula")
    .matches(/[a-z]/, "La contraseña debe incluir al menos una letra minúscula")
    .matches(/[0-9]/, "La contraseña debe incluir al menos un número")
    .matches(/[!@#$%^&*]/, "La contraseña debe incluir al menos un carácter especial (!@#$%^&*)")
    .matches(/^\S*$/, "La contraseña no debe contener espacios")
    .required("La contraseña es necesaria")

export const usernameValidation = Yup.string()
    .trim()
    .min(5, "El usuario debe tener mínimo 5 caracteres")
    .max(9, "El usuario debe tener máximo 9 caracteres")
    .required("El Nombre de Usuario es obligatorio")

export const passwordVerificationValidation = Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirmar la contraseña es necesario")

export const requestValidation = Yup.string()
    .trim()
    .min(10, "Introduce una frase real")
    .required("La petición es obligatoria")