import * as Yup from "yup";

//Email Regex
const regexMail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/

/**
 * Validation schema for email input.
 * Ensures the email is a valid format and is required.
 *
 * @type {Yup.StringSchema}
 */
export const emailValidation = Yup.string()
.trim()
.matches(regexMail, "El correo no es válido")
.required("El correo es necesario");

/**
 * Validation schema for password input.
 * Ensures the password meets complexity requirements:
 * - Minimum 8 characters
 * - Maximum 20 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character (!@#$%^&*)
 * - No spaces
 *
 * @type {Yup.StringSchema}
 */
export const passwordValidation = Yup.string()
.trim()
.min(8, "Contraseña mínimo 8 caracteres")
.max(20, "Contraseña máximo 20 caracteres")
.matches(/[A-Z]/, "Contraseña falta una mayúscula")
.matches(/[a-z]/, "Contraseña falta una minúscula")
.matches(/[0-9]/, "Contraseña falta un número")
.matches(/[!@#$%^&*]/, "Contraseña falta caracter especial")
.matches(/^\S*$/, "La contraseña no debe contener espacios")
.required("La contraseña es necesaria");

/**
 * Validation schema for username input.
 * Ensures the username is between 5 and 9 characters long and is required.
 *
 * @type {Yup.StringSchema}
 */
export const usernameValidation = Yup.string()
.trim()
.min(5, "Usuario mínimo 5 caracteres")
.max(9, "Usuario máximo 9 caracteres")
.required("El Nombre de Usuario es obligatorio");

/**
 * Validation schema for confirming password input.
 * Ensures the confirmed password matches the original password.
 *
 * @type {Yup.StringSchema}
 */
export const passwordVerificationValidation = Yup.string()
.trim()
.oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
.required("Confirmar la contraseña es necesario");

/**
 * Validation schema for request input.
 * Ensures the request is a valid string with at least 10 characters and is required.
 *
 * @type {Yup.StringSchema}
 */
export const requestValidation = Yup.string()
.trim()
.min(10, "Introduce una frase real")
.required("La petición es obligatoria");
