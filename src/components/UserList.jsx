import { useEffect, useState } from "react";
import API_URL from "../services/api";

const UserList = ({ newUser }) => {
    const [users, setUsers] = useState([]);
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
        if (newUser) {
            setUsers((prev) => [...prev, newUser]);
        }
    }, [newUser]);

    if (loading) return <div className="text-center">Cargando usuarios...</div>;

    return (
        <div className="overflow-x-auto shadow mt-6">
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
                    {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4">{user.id}</td>
                            <td className="py-2 px-4">{user.name}</td>
                            <td className="py-2 px-4">{user.email}</td>
                            <td className="py-2 px-4">
                                <button className="text-blue-600 hover:underline mr-2">Editar</button>
                                <button className="text-blue-600 hover:underline">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;