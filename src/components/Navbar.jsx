import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';

// Componente de Navbar
const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className='bg-white shadow-md py-3 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50'>
            <div className='text-xl font-bold text-blue-600'>BLACK MAMBA</div>

            <ul className='flex items-center gap-6 text-gray-700 font-medium text-sm md:text-base'>
                <li className="flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-all" onClick={() => navigate('/welcome')}>                    
                    <HomeIcon fontSize='small'/>
                    Inicio
                </li>
                <li className="flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-all" onClick={() => navigate('/users')}>
                    <ListAltIcon fontSize="small" />
                    Usuarios
                    </li>
                <li className="flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-all" onClick={() => navigate('/create')}>
                    <PersonAddAlt1Icon fontSize="small" />
                    Crear
                </li>
                <li className="flex items-center gap-1 px-2 py-1 rounded hover:bg-red-100 hover:text-red-700 cursor-pointer transition-all" onClick={logout}>
                    <LogoutIcon fontSize="small" />
                    Cerrar sesión
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
