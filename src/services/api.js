import axios from 'axios';

// API
const API_URL = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

// Simular la actualización de usuario de forma local
export const updateUser = async (userId, userData) => {
  if (userId > 10) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, ...userData } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return { ...userData, id: userId };
  }
  try {
    const response = await API_URL.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario (simulado):", error);
    return { ...userData, id: userId };
  }
};

export default API_URL;
