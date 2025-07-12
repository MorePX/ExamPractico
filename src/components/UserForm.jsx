import { useEffect, useState } from 'react';
import API_URL from '../services/api';

const UserForm = ({ editingUser, cancelEdit, onUserCreated }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setEmail(editingUser.email);
        } else {
            setName('');
            setEmail('');
        }
    }, [editingUser]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validate()) return;

        try {
            if (editingUser) {
                const res = await API_URL.put(`/users/${editingUser.id}`, { 
                    name, 
                    email,
                });

                setSuccess('Usuario actualizado correctamente');
                onUserCreated(res.data);
            } else {
                const res = await API_URL.post('/users', { name, email });
                setSuccess('Usuario creado exitosamente');
                onUserCreated(res.data);
            }
            setName('');
            setEmail('');
        } catch (err) {
            setError('Error al guardar el usuario. Inténtalo de nuevo.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg drop-shadow-sm shadow-lg mb-6 max-w-xl mx-auto'>
            <h2 className='text-xl font-bold mb-4'>{editingUser ? 'Editar usuario' : 'Crear nuevo usuario'}</h2>

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

            <div className='flex gap-2'>
                <button
                    type='submit'
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50'
                >
                    {editingUser ? 'Actualizar Usuario' : 'Crear Usuario'}
                </button>

                {editingUser && (
                    <button
                        type='button'
                        onClick={cancelEdit}
                        className='bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors'
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default UserForm;