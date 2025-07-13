import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserList from "../components/UserList";
import Pagination from "../components/Pagination";
import API_URL from "../services/api";

const UserListPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const location = useLocation();

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(allUsers.length / usersPerPage);

  useEffect(() => {
    const fetchAndCombineUsers = async () => {
      try {
        const res = await API_URL.get("/users");
        const apiUsers = res.data;
        const localUsers = JSON.parse(localStorage.getItem("users")) || [];

        const combinedUsers = apiUsers.map(apiUser => {
          const localVersion = localUsers.find(u => u.id === apiUser.id);
          return localVersion || apiUser;
        });

        const additionalLocalUsers = localUsers.filter(u => u.id > 10);
        const combined = [...combinedUsers, ...additionalLocalUsers]
          .sort((a, b) => a.id - b.id);

        setAllUsers(combined); // <-- Actualizamos allUsers
      } catch (error) {
        console.error("Error fetching API users:", error);
        const localUsers = JSON.parse(localStorage.getItem("users")) || [];
        setAllUsers(localUsers.sort((a, b) => a.id - b.id));
      }
    };
    fetchAndCombineUsers();
  }, [location.pathname]);

  const handleDeleteUser = (id) => {
    setAllUsers(prevUsers => {
      const updatedUsers = prevUsers.filter(u => u.id !== id);
      
      if (id > 10) {
        const localUsers = updatedUsers.filter(u => u.id > 10);
        localStorage.setItem("users", JSON.stringify(localUsers));
      }
      
      return updatedUsers;
    });

    if (currentUsers.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center uppercase">
        Lista de Usuarios ({allUsers.length} total)
      </h1>
      
      <UserList 
        allUsers={allUsers} // <-- Pasamos todos los usuarios
        currentPageUsers={currentUsers} // <-- Pasamos usuarios paginados
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