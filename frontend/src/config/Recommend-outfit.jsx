import axios from 'axios';

const apiBackend = import.meta.env.VITE_API_BASE_URL;

console.log('API Backend:', apiBackend);

/**
 * Function to recommend an outfit based on user prompt
 * @param {string} prompt - The user prompt for outfit recommendation
 * @returns {Promise<Object>} - The recommended outfit
 */
export async function recommendOutfit(prompt) {
    try {
        const response = await axios.post(`${apiBackend}api/cloths/recommend-outfit`, { userPrompt: prompt }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error recommendando outfit:', error.response.data.message);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
        throw error;
    }
}