import { Navigate } from 'react-router-dom';
import { auth } from '../services/auth';

const PrivateRoute = ({ children }) => {
  return auth.getCurrentUser() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;