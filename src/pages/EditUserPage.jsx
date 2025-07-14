import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../services/auth';
import API_URL from '../services/api';
import UserForm from '../components/UserForm';

const EditUserPage = () => {
  const { id } = useParams(); // ID del usuario a editar
  const [userData, setUserData] = useState(null); // Datos del usuario a editar
  const [loading, setLoading] = useState(true);
  const [isLocalUser, setIsLocalUser] = useState(false); // Para usuarios con  un ID mayor a 10
  const [allUsers, setAllUsers] = useState([]); // Todos los usuarios (API y LocalStorage)
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los datos del usuario
    const fetchData = async () => {
      try {
        const userId = parseInt(id);
        const res = await API_URL.get("/users");
        const apiUsers = res.data;
        const localUsers = JSON.parse(localStorage.getItem("users")) || [];
        
        setAllUsers([...apiUsers, ...localUsers]);

        if (!auth.isOwner(userId)) {
          navigate('/users');
          return;
        }

        // Verificar si el usuario es local o de la API
        if (userId > 10) {
          setIsLocalUser(true);
          const localUser = localUsers.find(u => u.id === userId);
          if (localUser) {
            setUserData(localUser);
          } else {
            navigate('/users');
          }
        } else {
          setIsLocalUser(false);
          const apiUser = apiUsers.find(u => u.id === userId);
          setUserData(apiUser);
        }
      } catch (err) {
        console.error('Error al obtener usuario', err);
        navigate('/users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  // Función para manejar la actualización del usuario
  const handleUserUpdated = (updatedUser) => {
    setTimeout(() => navigate("/users"), 1000);
  };

  if (loading) return <p className="text-center mt-20">Cargando...</p>;

  // Si no hay datos del usuario, redirigir a la lista de usuarios
  return (
    <div className="p-6 mt-20 bg-gradient-to-br from-indigo-100 to-blue-200 min-h-screen">
      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Editar Usuario</h1>
        {!loading && userData && (
          <UserForm 
            editingUser={userData} 
            isLocalUser={isLocalUser}
            onUserCreated={handleUserUpdated}
            onCancel={() => navigate('/users')}
            allUsers={allUsers}
          />
        )}
      </div>
    </div>
  );
};

export default EditUserPage;