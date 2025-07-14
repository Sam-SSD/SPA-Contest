export function isAuthenticated() {
  return !!localStorage.getItem('user');
}

export function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function getUserRole() {
  const user = getUser();
  return user ? user.role : null;
}

export function login(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem('user');
} 