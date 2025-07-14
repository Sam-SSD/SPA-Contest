import { isAuthenticated, getUserRole } from '../utils/auth.js';

// 🌐 Real application routes
const routes = {
  '/': '../pages/LoginPage.js',
  '/login': '../pages/LoginPage.js',
  '/register': '../pages/RegisterPage.js',
  '/dashboard': '../pages/DashboardPage.js',
  '/dashboard/events/create': '../pages/CreateEventPage.js',
  '/dashboard/events/edit': '../pages/EditEventPage.js',
  '/dashboard/enrollments': '../pages/EnrollmentsPage.js',
  '/not-found': '../pages/NotFoundPage.js'
};

// 🚀 SPA links with data-link and logout
document.body.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    navigate(e.target.getAttribute('href'));
  }

  if (e.target.id === 'logout-btn') {
    e.preventDefault();
    // If you have SweetAlert2 installed, use this:
    if (window.Swal) {
      Swal.fire({
        title: 'Log out?',
        text: 'Your current session will be closed',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log out',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('user');
          navigate('/');
        }
      });
    } else {
      // Fallback if you don't have SweetAlert2
      if (confirm('Log out? Your current session will be closed')) {
        localStorage.removeItem('user');
        navigate('/');
      }
    }
  }
});

// 📦 SPA navigator with session and role validation
export async function navigate(pathname) {
  console.log('Navigating to:', pathname);

  let user;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    localStorage.removeItem('user');
    user = null;
  }

  // 🚫 Already logged in and wants to go back to login
  if ((pathname === '/' || pathname === '/login') && user) {
    return navigate('/dashboard');
  }

  // 🔐 Not logged in and wants to access a protected route
  const isProtected = [
    '/dashboard',
    '/dashboard/events/create',
    '/dashboard/events/edit',
    '/dashboard/enrollments'
  ];
  if (!user && isProtected.includes(pathname)) {
    if (window.Swal) {
      Swal.fire('Oops', 'Please log in first', 'warning');
    } else {
      Swal.fire('Oops', 'Please log in first', 'warning');
    }
    return navigate('/');
  }

  // 🔒 Role protection: only admin can access certain creation/edit routes
  const adminOnlyRoutes = ['/dashboard/events/create', '/dashboard/events/edit'];
  if (adminOnlyRoutes.includes(pathname) && user?.role !== 'admin') {
    if (window.Swal) {
      Swal.fire('Access denied', 'You do not have permission to access this section', 'error');
    } else {
      Swal.fire('Access denied', 'You do not have permission to access this section', 'error');
    }
    return navigate('/dashboard');
  }

  // Allow visitor/student users to view enrollments and dashboard
  const route = routes[pathname];
  if (!route) {
    console.error('Route not found:', pathname);
    return navigate('/not-found');
  }

  try {
    console.log('Importing module:', route);
    // Dynamically import the corresponding module
    const module = await import(route);
    console.log('Módulo importado:', module);

    // Clean and prepare the container
    const app = document.getElementById('app');
    if (!app) throw new Error('Contenedor app no encontrado');

    // Render the page content
    let pageContent;
    // Look for an exported function we can use
    if (module.default) {
      pageContent = await module.default();
    } else {
      // Look for the first exported function
      for (const key in module) {
        if (typeof module[key] === 'function') {
          pageContent = await module[key]();
          break;
        }
      }

      // If we don't find any function, use the first exported value
      if (!pageContent) {
        pageContent = Object.values(module)[0];
      }
    }

    if (pageContent) {
      app.innerHTML = typeof pageContent === 'function' ? await pageContent() : pageContent;
    } else {
      throw new Error('Could not find exported content in the module');
    }

    // Run any page-specific initialization script
    if (pathname === '/' || pathname === '/login') {
      // Initialize login page
      if (module.loginPageLogic && typeof module.loginPageLogic === 'function') {
        module.loginPageLogic();
      }
    } else if (pathname === '/register') {
      // Initialize register page if the function exists
      if (module.registerPageLogic && typeof module.registerPageLogic === 'function') {
        module.registerPageLogic();
      }
    } else if (pathname.includes('/dashboard')) {
      // Initialize dashboard and other pages according to the route
      if (pathname === '/dashboard') {
        if (module.setupDashboard && typeof module.setupDashboard === 'function') {
          module.setupDashboard();
        }
      } else if (pathname === '/dashboard/events/create') {
        if (module.createEventPageLogic && typeof module.createEventPageLogic === 'function') {
          module.createEventPageLogic();
        } else if (module.setupCreateEvent && typeof module.setupCreateEvent === 'function') {
          module.setupCreateEvent();
        }
      } else if (pathname === '/dashboard/events/edit') {
        if (module.editEventPageLogic && typeof module.editEventPageLogic === 'function') {
          module.editEventPageLogic();
        } else if (module.setupEditEvent && typeof module.setupEditEvent === 'function') {
          module.setupEditEvent();
        }
      } else if (pathname === '/dashboard/enrollments') {
        if (module.setupEnrollments && typeof module.setupEnrollments === 'function') {
          module.setupEnrollments();
        }
      }
    }

    // Update the URL without reloading
    history.pushState({}, '', pathname);
  } catch (err) {
    console.error('Navigation error:', err);
    if (window.Swal) {
      Swal.fire('Oops', 'Something went wrong loading the route', 'error');
    } else {
      Swal.fire('Oops', 'Something went wrong loading the route', 'error');
    }
    if (pathname !== '/') navigate('/');
  }
}

// 🔙 Browser back/forward
window.addEventListener('popstate', () => {
  navigate(location.pathname);
});

// Router initialization
export function initRouter() {
  // 🚀 Load current route on app start
  navigate(location.pathname);
}
