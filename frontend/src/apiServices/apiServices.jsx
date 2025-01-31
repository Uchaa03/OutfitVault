import axios from 'axios'
import { useToken } from '../store/authStore.jsx'

export class Clothes {
  static async getAllClothes() {
    const token = useToken()
    try {
      const response = await axios.get(`${process.env.VITE_API_BASE_URL}api/cloths`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data.cloths
    } catch (error) {
      console.error('Error fetching cloths:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  static async createCloth(cloth) {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}api/cloths`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cloth),
    });
    return await response.json();
  }

  static async deleteCloth(clothId) {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}api/cloths/${clothId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }

  static async getClothById(clothId) {
    try {
      const response = await axios.get(`${process.env.VITE_API_BASE_URL}api/cloths/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data.cloth;
      setTimeout(() => {
        // Is called when the animation ends
      }, 1000);
    } catch (error) {
      console.error('Error fetching cloth details:', error);
    }
  }
}