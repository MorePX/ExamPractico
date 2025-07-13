import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UserForm = ({ onUserCreated, editingUser, isLocalUser = true }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validate = () => {
        if (!name || !email) {
            setError('Todos los campos son obligatorios');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('El email no es válido');
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setEmail(editingUser.email);
        }
    }, [editingUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validate()) return;

        if (editingUser) {
            if (isLocalUser) {
                // Editar usuario - local
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const updatedUsers = users.map((u) =>
                    u.id === editingUser.id ? { ...u, name, email } : u
                );
                localStorage.setItem("users", JSON.stringify(updatedUsers));
                setSuccess('Usuario actualizado correctamente.');
                
                if (onUserCreated) onUserCreated({ ...editingUser, name, email });
            } else {
                setSuccess('Los usuarios de demostración no pueden ser editados permanentemente.');
                setTimeout(() => navigate("/users"), 1000);
                return;
            }
        } else {
            // Crear nuevo usuario - local
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 11;
            const newUser = { id, name, email };
            localStorage.setItem("users", JSON.stringify([...users, newUser]));
            setSuccess('Usuario creado exitosamente.');
            if (onUserCreated) onUserCreated(newUser);
        }

        setTimeout(() => navigate("/users"), 1000);
    };

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
            <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50'
            >
                {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
            </button>
        </form>
    );
};

export default UserForm;