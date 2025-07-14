import { isAuthenticated, getUserRole } from '../utils/auth.js';

const routes = {
  '/login': 'LoginPage',
  '/register': 'RegisterPage',
  '/dashboard': 'DashboardPage',
  '/dashboard/events/create': 'CreateEventPage',
  '/dashboard/events/edit': 'EditEventPage',
  '/dashboard/enrollments': 'EnrollmentsPage',
  '/not-found': 'NotFoundPage'
};

export function navigate(path) {
  window.location.hash = path;
}

export function router() {
  const path = window.location.hash.replace('#', '') || '/dashboard';
  const user = isAuthenticated();
  const role = getUserRole();

  // Route protection logic
  if (!user && ['/dashboard', '/dashboard/events/create', '/dashboard/events/edit', '/dashboard/enrollments'].includes(path)) {
    window.location.hash = '/not-found';
    return;
  }
  if (user && (path === '/login' || path === '/register')) {
    window.location.hash = '/dashboard';
    return;
  }
  // Aquí se puede agregar lógica para renderizar la página correspondiente
} 