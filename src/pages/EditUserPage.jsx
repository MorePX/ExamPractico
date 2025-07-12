import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API_URL from '../services/api';
import UserForm from '../components/UserForm';

const EditUserPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLocalUser, setIsLocalUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = parseInt(id);
        
        if (userId > 10) {
          setIsLocalUser(true);
          const localUsers = JSON.parse(localStorage.getItem("users")) || [];
          const localUser = localUsers.find(u => u.id === userId);
          
          if (localUser) {
            setUserData(localUser);
          } else {
            navigate('/users');
          }
        } else {
          setIsLocalUser(false);
          const res = await API_URL.get(`/users/${userId}`);
          setUserData(res.data);
        }
      } catch (err) {
        console.error('Error al obtener usuario');
        navigate('/users');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleUserUpdated = (updatedUser) => {
    setTimeout(() => navigate("/users"), 1000);
  };

  if (loading) return <p className="text-center mt-20">Cargando...</p>;

  return (
    <div className="p-6 mt-20 bg-gradient-to-br from-indigo-100 to-blue-200 min-h-screen">
      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Editar Usuario</h1>
        {!loading && userData && (
          <UserForm 
            editingUser={userData} 
            isLocalUser={isLocalUser}
            onUserCreated={handleUserUpdated}
          />
        )}
      </div>
    </div>
  );
};

export default EditUserPage;