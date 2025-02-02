import axios from 'axios';

// Change to the URL of your API backend
const apiBackend = process.env.VITE_API_BASE_URL;

/**
 * Registers a new user by sending a POST request to the backend API.
 *
 * @param {string} username - The username of the user to register.
 * @param {string} email - The email of the user to register.
 * @param {string} password - The password of the user to register.
 * @returns {Object} The response data from the backend, typically containing success or error message.
 */
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
            console.error('Error registering user:', error.response.data.message);
        } else {
            console.error('Request error:', error.message);
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
            console.error('Error logging in user:', error.response.data.message);
        } else {
            console.error('Request error:', error.message);
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
            console.error('Error fetching user details:', error.response.data.message);
        } else {
            console.error('Request error:', error.message);
        }
    }
}

/**
 * Renews the authentication token for the user using a GET request to the backend API.
 *
 * @param {string} token - The current authentication token (Bearer token) for the user.
 * @returns {Object} The response data from the backend, typically containing the new token or error message.
 */
export async function renewToken(token) {
    try {
        const response = await axios.get(`${apiBackend}api/auth/refresh-token`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error renewing token:', error.response.data.message);
        } else {
            console.error('Request error:', error.message);
        }
    }
}

/**
 * Updates the username of the currently authenticated user by sending a PUT request to the backend API.
 *
 * @param {string} newUsername - The new username to set for the user.
 * @param {string} token - The authentication token (Bearer token) for the user.
 * @returns {Object} The response data from the backend, typically containing success or error message.
 */
export async function updateUsername(newUsername, token) {
    try {
        console.log(token);
        const response = await axios.put(`${apiBackend}api/auth/change-username`, { newUsername }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error updating username:', error.response.data.message);
        } else {
            console.error('Request error:', error.message);
        }
    }
}
