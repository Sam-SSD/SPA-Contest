import { LoginPage, loginPageLogic } from './pages/LoginPage.js';
import { RegisterPage, registerPageLogic } from './pages/RegisterPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';
import { EnrollmentsPage } from './pages/EnrollmentsPage.js';
import { CreateEventPage, createEventPageLogic } from './pages/CreateEventPage.js';
import { EditEventPage, editEventPageLogic } from './pages/EditEventPage.js';
import { isAuthenticated, logout } from './utils/auth.js';
import { fetchAPI } from './services/api.js';

export async function renderApp() {
  const app = document.getElementById('app');
  const path = window.location.hash.replace('#', '') || '/dashboard';

  if (path === '/login') {
    app.innerHTML = LoginPage();
    loginPageLogic();
    return;
  }
  if (path === '/register') {
    app.innerHTML = RegisterPage();
    registerPageLogic();
    return;
  }
  if (path === '/dashboard') {
    if (!isAuthenticated()) {
      window.location.hash = '/not-found';
      return;
    }
    app.innerHTML = await DashboardPage();
    document.getElementById('logout-link').onclick = () => {
      logout();
      window.location.hash = '/login';
    };
    return;
  }
  if (path === '/dashboard/enrollments') {
    if (!isAuthenticated()) {
      window.location.hash = '/not-found';
      return;
    }
    app.innerHTML = await EnrollmentsPage();
    document.getElementById('logout-link').onclick = () => {
      logout();
      window.location.hash = '/login';
    };
    return;
  }
  if (path === '/dashboard/events/create') {
    app.innerHTML = CreateEventPage();
    createEventPageLogic();
    return;
  }
  if (path.startsWith('/dashboard/events/edit')) {
    // Get event ID from URL
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const eventId = params.get('id');
    if (!eventId) {
      app.innerHTML = NotFoundPage();
      return;
    }
    try {
      const event = await fetchAPI(`/events/${eventId}`);
      app.innerHTML = EditEventPage(event);
      editEventPageLogic(eventId);
    } catch (err) {
      app.innerHTML = NotFoundPage();
    }
    return;
  }
  if (path === '/not-found') {
    app.innerHTML = NotFoundPage();
    return;
  }
  // Fallback
  app.innerHTML = NotFoundPage();
} 