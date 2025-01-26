import axios from 'axios';

// Change to the URL of your API backend
const apiBackend = process.env.VITE_API_BASE_URL;

console.log('API Backend:', apiBackend);
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
        return response.data
    } catch (error) {
        if (error.response) {
            console.error('Error al registrar usuario:', error.response.data.message);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
    }
}

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
        return response.data
    } catch (error) {
        if (error.response) {
            console.error('Error al registrar usuario:', error.response.data.message);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
    }
}