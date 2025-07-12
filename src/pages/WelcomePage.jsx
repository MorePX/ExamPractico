import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const WelcomePage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const  user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        } else {
            setUsername(user.name);
        }
    }, [navigate]);

    return (
        <div className='min-h-screen bg-gradient-to-tr from-blue-200 to-indigo-300 flex items-center justify-center px-4'>
            <div className='bg-white/70 backfrop-blur-md shadow-xl p-10 rounded-3xl text-center max-w-xl w-full animate-fade-in'>
                <h1 className='text-4xl font-bold text-gray-800 mb-4'>
                    ¡BIENVENIDO, <span className='text-blue-600'>{username}</span>
                </h1>
                <button
                    onClick={() => navigate('/users')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg font-semibold transition-transform duration-200 hover:scale-105 mx-auto"
                >
                    Ir al Dashboard <ArrowForwardIcon />
                </button>
            </div>
        </div>
    )
}

export default WelcomePage;
