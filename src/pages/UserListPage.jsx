import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import UserList from "../components/UserList";
import Pagination from "../components/Pagination";
import API_URL from "../services/api";
import { auth } from "../services/auth";

const UserListPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(allUsers.length / usersPerPage);

  useEffect(() => {
    const fetchAndCombineUsers = async () => {
      try {
        setLoading(true);
        
        // Obtener usuarios de la API
        const apiResponse = await API_URL.get("/users");
        const apiUsers = apiResponse.data;

        // Obtener usuarios predeterminados (de user.json)
        const defaultUsers = JSON.parse(localStorage.getItem("defaultUsers")) || [];
        
        // Obtener usuarios creados localmente
        const localUsers = JSON.parse(localStorage.getItem("users")) || [];

        /* Combinación:
          Primero los ID de al API (1-10)
          Luego usuarios predeterminados que no estén en la API
          Finalmente usuarios locales (ID > 10)
        */
        const combinedUsers = [
          ...apiUsers,
          ...defaultUsers.filter(du => !apiUsers.some(au => au.id === du.id)),
          ...localUsers
        ].sort((a, b) => a.id - b.id);

        setAllUsers(combinedUsers);
        setError(null);
      } catch (err) {
        console.error("Error loading users:", err);
        setError("Error al cargar usuarios de la API. Mostrando solo usuarios locales.");
        
        // Cargar solo usuarios locales y predeterminados
        const defaultUsers = JSON.parse(localStorage.getItem("defaultUsers")) || [];
        const localUsers = JSON.parse(localStorage.getItem("users")) || [];
        setAllUsers([...defaultUsers, ...localUsers].sort((a, b) => a.id - b.id));
      } finally {
        setLoading(false);
      }
    };

    fetchAndCombineUsers();
  }, [location.pathname]);

  const handleDeleteUser = (id) => {
    // Solo permitir eliminar usuarios locales (ID > 10)
    if (id <= 10) return;

    setAllUsers(prevUsers => {
      const updatedUsers = prevUsers.filter(u => u.id !== id);
      
      // Actualizar localStorage
      const localUsers = updatedUsers.filter(u => u.id > 10);
      localStorage.setItem("users", JSON.stringify(localUsers));
      
      return updatedUsers;
    });

    // Ajustar paginación
    if (currentUsers.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="p-6 mt-20 text-center">
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mt-20">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <UserList 
          allUsers={allUsers}
          currentPageUsers={currentUsers}
          onDeleteUser={handleDeleteUser}
        />
      </div>
    );
  }

  return (
    <div className="p-6 mt-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-700 uppercase">
          Lista de Usuarios ({allUsers.length} total)
        </h1>
      </div>
      
      <UserList 
        allUsers={allUsers}
        currentPageUsers={currentUsers}
        onDeleteUser={handleDeleteUser}
      />
      
      {allUsers.length > usersPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UserListPage;