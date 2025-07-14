import { Navigate } from 'react-router-dom';
import { auth } from '../services/auth';

/*
  Router privado para proteger rutas que requieren autenticación
  Si el usuario no está autenticado, redirige a la página de inicio de sesión
*/
const PrivateRoute = ({ children }) => {
  return auth.getCurrentUser() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;