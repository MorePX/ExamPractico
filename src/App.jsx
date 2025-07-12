import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import Navbar from './components/Navbar';
import UserListPage from './pages/UserListPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';

const AppWrapper = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

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
        <Route path="/users" element={isLoggedIn ? <UserListPage /> : <Navigate to="/login" />} />
        <Route path="/create" element={isLoggedIn ? <CreateUserPage /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={isLoggedIn ? <EditUserPage /> : <Navigate to="/login" />} />
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
