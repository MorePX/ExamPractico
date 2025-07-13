import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import Navbar from './components/Navbar';
import UserListPage from './pages/UserListPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';
import PrivateRoute from './components/PrivateRoute';
import { auth } from './services/auth';
import { useEffect } from 'react';
import userData from './data/user.json'; // Asegúrate de importar los datos de usuario

const AppWrapper = () => {
  const user = auth.getCurrentUser();
  const location = useLocation();

  useEffect(() => {
    // Cargar usuarios predeterminados al localStorage si no existen
    if (!localStorage.getItem('defaultUsers')) {
      localStorage.setItem('defaultUsers', JSON.stringify(userData));
    }
  }, []);

  const isLoggedIn = !!user;
  const hideNavbarPaths = ['/login', '/welcome'];

  const shouldShowNavbar = isLoggedIn && !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={isLoggedIn ? <WelcomePage /> : <Navigate to="/login" />} />
        <Route path="/users" element={<PrivateRoute><UserListPage /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditUserPage /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateUserPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;