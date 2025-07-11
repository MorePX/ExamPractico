import { useState } from 'react';
import API_URL from '../services/api';

const UserForm = ({ onUserCreated }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name || !email){
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            setLoading(true);
            const res = await API_URL.post('/users', { name, email });
            setSuccess('Usuario creado con éxito');
            setName('');
            setEmail('');
            if (onUserCreated) onUserCreated(res.data); // Notifica al Dashboard
        } catch (err) {
            setError('Error al crear el usuario');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg drop-shadow-sm shadow-lg mb-6 max-w-xl mx-auto'>
            <h2 className='text-xl font-bold mb-4'>Crear Nuevo Usuario</h2>

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
                className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
            >
                {loading ? 'Creando Usuario...' : 'Registrar Usuario'}
            </button>
        </form>
    );
};

export default UserForm;