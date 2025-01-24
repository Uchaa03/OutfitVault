import axios from 'axios';
import {setToken, token} from "../hooks/authHook.jsx";


const apiBackend = process.env.VITE_API_BASE_URL

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
        setToken(response.data) // Set data in zustand store2
        console.log('Usuario registrado con éxito:', token);
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
        setToken(response.data) // Set data in zustand store
        console.log('Usuario logueado con éxito:', token);

    } catch (error) {
        if (error.response) {
            console.error('Error al registrar usuario:', error.response.data.message);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
    }
}