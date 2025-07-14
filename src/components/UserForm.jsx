import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LockIcon from "@mui/icons-material/Lock";

const UserForm = ({ onUserCreated, editingUser, isLocalUser = true, onCancel, allUsers = []}) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Validación de campos name, password, email y estructura del email
    const validate = () => {
        if (!name || !email || !password) {
            setError('Todos los campos son obligatorios');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('El email no es válido');
            return false;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        return true;
    };

    // Validación de email único (que no se repitan)
    const validateEmailUnique = (currentEmail) => {
        const emailExists = allUsers.some(user => {
            if (editingUser && user.id === editingUser.id) return false;
            return user.email === currentEmail;
        });

        if (emailExists) {
            setError('El correo electrónico ya está en uso por otro usuario');
            return false;
        }
        return true;
    };

    // Cargar datos del usuario a editar si existe
    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setEmail(editingUser.email);
            setPassword(editingUser.password || '');
        }
    }, [editingUser]);

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validate()) return;
        if (!validateEmailUnique(email)) return;

        // Si es un usuario local, actualizamos o creamos en localStorage
        if (editingUser) {
            if (isLocalUser) { // Actualizar usuario en localStorage
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const updatedUsers = users.map((u) =>
                    u.id === editingUser.id ? { ...u, name, email, password } : u
                );
                localStorage.setItem("users", JSON.stringify(updatedUsers));
                setSuccess('Usuario actualizado correctamente.');
            } else { // Actualizar usuario en la API (simulado)
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const updatedUser = { ...editingUser, name, email, password };
                
                const filteredUsers = users.filter(u => u.id !== editingUser.id);
                
                localStorage.setItem("users", JSON.stringify([...filteredUsers, updatedUser]));
                
                setSuccess('Cambios guardados localmente (los datos originales de la API no se modifican).');
            }
            
            if (onUserCreated) onUserCreated({ ...editingUser, name, email, password });
        } else {
            // Crear nuevo usuario
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 11; // Comenzar ID desde 11 para evitar conflictos con usuarios preexistentes
            const newUser = { id, name, email, password };
            localStorage.setItem("users", JSON.stringify([...users, newUser])); // Guardar nuevo usuario en localStorage
            setSuccess('Usuario creado exitosamente.');
            if (onUserCreated) onUserCreated(newUser);
        }
    };
    
    // Render del formulario
    return (
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg drop-shadow-sm shadow-lg mb-6 max-w-xl mx-auto'>
            <h2 className='text-xl font-bold mb-4'>
                {editingUser ? 'Editar usuario' : 'Crear nuevo usuario'}
            </h2>

            {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}
            {success && <p className='text-green-500 text-sm mb-3'>{success}</p>}

            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-1'>Nombre</label>
                <input
                    type='text'
                    className='w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Nombre Completo'
                />
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-1'>Email</label>
                <input
                    type='email'
                    className='w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='example@example.com'
                />
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-1'>Contraseña</label>
                <div className="flex items-center border rounded px-3 py-2">
                    <LockIcon className="text-gray-500 mr-2" />
                    <input
                        type="password"
                        className="w-full outline-none flex"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                    />
                </div>
            </div>
            <div className="flex">
                <button
                    type='submit'
                    className='bg-green-700 text-white px-4 py-2 rounded hover:bg-green-400 transition-colors disabled:opacity-50'
                >
                    {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
                <button
                    type='button'
                    onClick={onCancel}
                    className='bg-red-700 text-white px-4 py-2 rounded hover:bg-red-400 transition-colors flex-1 ml-5'
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default UserForm;