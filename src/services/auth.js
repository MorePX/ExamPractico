export const auth = {
  currentUser: null,

  login(email, password) {
    // Buscar en los usuarios predeterminados
    const defaultUsers = JSON.parse(localStorage.getItem('defaultUsers')) || [];
    // Buscar en los usuarios creados localmente
    const localUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Combinar ambos arrays de usuarios
    const allUsers = [...defaultUsers, ...localUsers];
    
    const user = allUsers.find(u => u.email === email && u.password === password);
    
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

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
    return this.currentUser;
  },

  isOwner(userId) {
    const user = this.getCurrentUser();
    return user && user.id === userId;
  }
};