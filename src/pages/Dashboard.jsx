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
        <div className="p-6 mt-20">

            <UserForm
                editingUser={selectedUser}
                cancelEdit={() => setSelectedUser(null)}
                onUserCreated={(userData) => {
                    setEditingUser((prev) => {
                        const exists = prev.find(u => u.id === userData.id);
                        if (exists) {
                            return prev.map(u => u.id === userData.id ? userData : u);
                        }
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
