import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import { useState } from "react";

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUser, setEditingUser] = useState([]);

    const logout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2x1 font-bold">Bienvenido, {user.name}</h1>
                <button
                    onClick = {logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Cerrar Sesión
                </button>
            </div>

            <UserForm
                editingUser={selectedUser}
                cancelEdit={() => setSelectedUser(null)}
                onUserCreated={(userData) => {
                    setEditingUser((prev) => {
                        // Si el usuario ya existe, actualízalo
                        const exists = prev.find(u => u.id === userData.id);
                        if (exists) {
                            return prev.map(u => u.id === userData.id ? userData : u);
                        }
                        // Si es nuevo, agrégalo
                        return [...prev, userData];
                    });
                    setSelectedUser(null);
                }}
            />

            <UserList
                newOrUpdateUser = {editingUser}
                onEditUser = {(user) => setSelectedUser(user)}
            />
        </div>
    );
};

export default Dashboard;
