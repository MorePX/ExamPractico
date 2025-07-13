import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../services/auth";
import ConfirmModal from "./ConfirmModal";
import SearchIcon from '@mui/icons-material/Search';

const UserList = ({ allUsers, currentPageUsers, onDeleteUser }) => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Verificar si el usuario puede editar y eliminar
    const canEdit = (userId) => auth.isOwner(userId) || userId <= 10; // Permitir editar usuarios de API o propios
    const canDelete = (userId) => auth.isOwner(userId); // Solo puede eliminar sus propios usuarios

    const confirmDelete = (id) => {
        setUserToDelete(id);
        setShowModal(true);
    };

    const handleConfirmedDelete = () => {
        onDeleteUser(userToDelete);
        setShowModal(false);
        setUserToDelete(null);
    };

    const usersToDisplay = filter 
        ? allUsers.filter(u => 
            `${u.name}${u.email}`.toLowerCase().includes(filter.toLowerCase()))
        : currentPageUsers;

    return (
        <div className="space-y-4">
            <div className="mt-6">
                <div className="relative w-full max-w-md mb-4">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o correo"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                    />
                </div>

                {usersToDisplay.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                        {filter ? "No se encontraron coincidencias" : "No hay usuarios para mostrar"}
                    </p>
                ) : (
                    <div className="overflow-x-auto shadow rounded-lg">
                        <table className="min-w-full bg-white rounded-lg border">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-left">
                                    <th className="py-3 px-5">ID</th>
                                    <th className="py-3 px-5">Nombre</th>
                                    <th className="py-3 px-5">Correo</th>
                                    <th className="py-3 px-5">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersToDisplay.map((user, i) => (
                                    <tr key={user.id} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b hover:bg-blue-50 transition-colors`}>
                                        <td className="py-3 px-5">{user.id}</td>
                                        <td className="py-3 px-5">{user.name}</td>
                                        <td className="py-3 px-5">{user.email}</td>
                                        <td className="py-3 px-5 space-x-2">
                                            {canEdit(user.id) && (
                                                <button onClick={() => navigate(`/edit/${user.id}`)} className="text-blue-600 hover:underline transition-all">
                                                    Editar
                                                </button>
                                            )}
                                            {canDelete(user.id) && (
                                                <button onClick={() => confirmDelete(user.id)} className="text-red-600 hover:underline">
                                                    Eliminar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <ConfirmModal
                isOpen={showModal}
                title="Confirmar eliminación"
                message="¿Deseas eliminar este usuario?"
                onConfirm={handleConfirmedDelete}
                onCancel={() => setShowModal(false)}
            />
        </div>
    );
};

export default UserList;