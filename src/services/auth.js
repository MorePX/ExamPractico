export const auth = {
  currentUser: null,

  login(email, password) {
    // Buscar en los usuarios predeterminados
    const defaultUsers = JSON.parse(localStorage.getItem('defaultUsers')) || [];
    // Buscar en los usuarios creados localmente
    const localUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Combinar ambos arrays de usuarios
    const allUsers = [...defaultUsers, ...localUsers];

    // Verificar si el usuario existe
    const user = allUsers.find(u => u.email === email && u.password === password);
    
    // Si el usuario existe, guardar en currentUser y localStorage
    if (user) {
      this.currentUser = {
        id: user.id,
        email: user.email,
        name: user.name
      };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  },

  // Cerrar sesión
  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
  },

  // Obtener el usuario actual
  getCurrentUser() {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
    return this.currentUser;
  },

  // Verificar si el usuario está autenticado
  isOwner(userId) {
    const user = this.getCurrentUser();
    return user && user.id === userId;
  }
};