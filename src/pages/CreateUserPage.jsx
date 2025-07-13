import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { useState, useEffect } from 'react';
import API_URL from '../services/api';

const CreateUserPage = () => {
  const navigate = useNavigate();
  const [apiUsers, setApiUsers] = useState([]);
  const [localUsers, setLocalUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API_URL.get("/users");
        setApiUsers(res.data);
      } catch (error) {
        console.error("Error fetching API users:", error);
      }
      const usersFromStorage = JSON.parse(localStorage.getItem("users")) || [];
      setLocalUsers(usersFromStorage);
    };

    fetchUsers();
  }, []);

  const allUsers = [...apiUsers, ...localUsers];

  return (
    <div className="p-6 mt-20 bg-gradient-to-br from-indigo-100 to-blue-200 min-h-screen">
      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Registrar Nuevo Usuario</h1>
        <UserForm 
          onUserCreated={() => navigate('/users')}
          onCancel={() => navigate('/users')}
          allUsers={allUsers}
        />
      </div>
    </div>
  );
};

export default CreateUserPage;