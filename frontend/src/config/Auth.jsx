import axios from 'axios';

// Change to the URL of your API backend
const apiBackend = process.env.VITE_API_BASE_URL;

export async function registerUser(username, email, password) {
    const userData = {
        username: username,
        email: email,
        password: password
    };

    try {
        const response = await axios.post(`${apiBackend}api/auth/register`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error al registrar usuario:', error.response.data.message);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
    }
}

/**
 * Logs in an existing user by sending a POST request to the backend API with the user's credentials.
 *
 * @param {string} username - The username of the user trying to log in.
 * @param {string} password - The password of the user trying to log in.
 * @returns {Object} The response data from the backend, typically containing the login result or error message.
 */
export async function loginUser(username, password) {
    const userData = {
        username: username,
        password: password
    };

    try {
        const response = await axios.post(`${apiBackend}api/auth/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error al loguear usuario:', error.response.data.message);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
    }
}

/**
 * Retrieves the details of the currently authenticated user using a GET request to the backend API.
 *
 * @param {string} token - The authentication token (Bearer token) for the user.
 * @returns {Object} The response data from the backend, typically containing the user details or error message.
 */
export async function getUser(token) {
    try {
        const response = await axios.get(`${apiBackend}api/auth/user-details`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error al obtener detalles del usaurio:', error.response.data.message);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
    }
}

export async function renewToken(token) {
    try {
        const response = await axios.get(`${apiBackend}api/auth/refresh-token`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data
    } catch (error) {
        if (error.response) {
            console.error('Error al renovar el token:', error.response.data.message);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
    }
}

export async function updateUsername(newUsername, token) {
    try {
        console.log(token)
        const response = await axios.put(`${apiBackend}api/auth/change-username`,{ newUsername }, {

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

            },
        });
        return response.data
    } catch (error) {
        if (error.response) {
            console.error('Error al registrar usuario:', error.response.data.message);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
    }
}