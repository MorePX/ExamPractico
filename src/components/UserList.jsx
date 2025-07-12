import { useEffect, useState } from "react";
import API_URL from "../services/api";

const UserList = ({ newOrUpdateUser, onEditUser }) => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await API_URL.get("/users");
            setUsers(res.data);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (Array.isArray(newOrUpdateUser) && newOrUpdateUser.length > 0) {
            const merge = [...users];
            newOrUpdateUser.forEach((u) => {
                const index = merge.findIndex((m) => m.id === u.id);
                if (index !== -1){
                    merge[index] = u;
                } else {
                    merge.push(u);
                }
            });
            setUsers(merge);
        }
    }, [newOrUpdateUser]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
        if (!confirmDelete) return;

        try {
            await API_URL.delete(`/users/${id}`);
            setUsers((prev) => prev.filter((u) => u.id !== id));
            alert("Usuario eliminado correctamente");
        } catch (err) {
            alert("Error al eliminar el usuario. Inténtalo de nuevo.");
            console.error(err);
        }
    };

    const filteredUsers = users.filter((u) => 
        `${u.name}${u.email}`.toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) return <div className="text-center">Cargando usuarios...</div>;

    return (
        <div className="mt-6">
            <input
                type="text"
                className="border px-3 py-2 rounded w-full max-w-md mb-4"
                placeholder="Buscar por nombre o correo"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

            <div className="overflow-x-auto shadow">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead>
                        <tr className="bg-blue-500 text-white text-left">
                            <th className="py-2 px-4">ID</th>
                            <th className="py-2 px-4">Nombre</th>
                            <th className="py-2 px-4">Correo</th>
                            <th className="py-2 px-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-100">
                                <td className="py-2 px-4">{user.id}</td>
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => onEditUser(user)}
                                        className="text-blue-600 hover:underline mr-2"
                                    >
                                        Editar
                                    </button>
                                    
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;