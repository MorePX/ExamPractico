import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserList from "../components/UserList";
import API_URL from "../services/api";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchAndCombineUsers = async () => {
      try {
        const res = await API_URL.get("/users");
        const apiUsers = res.data;
        const localUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Reemplazar usuarios de la API (1-10) con sus versiones modificadas en localStorage
        const combinedUsers = apiUsers.map(apiUser => {
          const localVersion = localUsers.find(u => u.id === apiUser.id);
          return localVersion || apiUser; // Usar la versión local si existe
        });

        // Agregar usuarios locales con ID > 10
        const additionalLocalUsers = localUsers.filter(u => u.id > 10);
        const combined = [...combinedUsers, ...additionalLocalUsers]
          .sort((a, b) => a.id - b.id);

        setUsers(combined);
      } catch (error) {
        console.error("Error fetching API users, using local only:", error);
        setUsers(localUsers.sort((a, b) => a.id - b.id));
      }
    };
    fetchAndCombineUsers();
  }, [location.pathname]);

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    const localUsers = updatedUsers.filter(u => u.id > 10);
    localStorage.setItem("users", JSON.stringify(localUsers));
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(prevUsers => 
      prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u)
    );
    
    // Actualizar localStorage si es usuario local
    if (updatedUser.id > 10) {
      const localUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedLocalUsers = localUsers.map(u => 
        u.id === updatedUser.id ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedLocalUsers));
    }
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center uppercase">Lista de Usuarios</h1>
      <UserList 
          users={users} 
          onDeleteUser={handleDeleteUser} 
          onUserUpdated={handleUserUpdated}
      />
    </div>
  );
};

export default UserListPage;