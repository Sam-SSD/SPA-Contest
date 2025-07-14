import { isAuthenticated, getUserRole } from '../utils/auth.js';

// 🌐 Rutas reales de tu aplicación
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

// 🚀 Enlaces SPA con data-link y logout
document.body.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    navigate(e.target.getAttribute('href'));
  }

  if (e.target.id === 'logout-btn') {
    e.preventDefault();
    // Si tienes SweetAlert2 instalado, usa esto:
    if (window.Swal) {
      Swal.fire({
        title: '¿Cerrar sesión?',
        text: 'Tu sesión actual se cerrará',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('user');
          navigate('/');
        }
      });
    } else {
      // Fallback si no tienes SweetAlert2
      if (confirm('¿Cerrar sesión? Tu sesión actual se cerrará')) {
        localStorage.removeItem('user');
        navigate('/');
      }
    }
  }
});

// 📦 Navegador SPA con validación de sesión y rol
export async function navigate(pathname) {
  console.log('Navegando a:', pathname);

  let user;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    localStorage.removeItem('user');
    user = null;
  }

  // 🚫 Ya logueado y quiere volver al login
  if ((pathname === '/' || pathname === '/login') && user) {
    return navigate('/dashboard');
  }

  // 🔐 No logueado y quiere acceder a una ruta protegida
  const isProtected = [
    '/dashboard',
    '/dashboard/events/create',
    '/dashboard/events/edit',
    '/dashboard/enrollments'
  ];
  if (!user && isProtected.includes(pathname)) {
    if (window.Swal) {
      Swal.fire('Ups', 'Primero iniciá sesión', 'warning');
    } else {
      alert('Primero iniciá sesión');
    }
    return navigate('/');
  }

  // 🔒 Protección de rol: solo admin puede acceder a ciertas rutas de creación/edición
  const adminOnlyRoutes = ['/dashboard/events/create', '/dashboard/events/edit'];
  if (adminOnlyRoutes.includes(pathname) && user?.role !== 'admin') {
    if (window.Swal) {
      Swal.fire('Acceso denegado', 'No tienes permisos para acceder a esta sección', 'error');
    } else {
      alert('Acceso denegado: No tienes permisos para acceder a esta sección');
    }
    return navigate('/dashboard');
  }

  // Permitir a usuarios visitor/estudiante ver enrollments y dashboard
  const route = routes[pathname];
  if (!route) {
    console.error('Ruta no encontrada:', pathname);
    return navigate('/not-found');
  }

  try {
    console.log('Importando módulo:', route);
    // Importamos el módulo correspondiente dinámicamente
    const module = await import(route);
    console.log('Módulo importado:', module);

    // Limpiamos y preparamos el contenedor
    const app = document.getElementById('app');
    if (!app) throw new Error('Contenedor app no encontrado');

    // Renderizamos el contenido de la página
    let pageContent;
    // Buscamos una función exportada que podamos usar
    if (module.default) {
      pageContent = await module.default();
    } else {
      // Buscamos la primera función exportada
      for (const key in module) {
        if (typeof module[key] === 'function') {
          pageContent = await module[key]();
          break;
        }
      }

      // Si no encontramos ninguna función, usamos el primer valor exportado
      if (!pageContent) {
        pageContent = Object.values(module)[0];
      }
    }

    if (pageContent) {
      app.innerHTML = typeof pageContent === 'function' ? await pageContent() : pageContent;
    } else {
      throw new Error('No se pudo encontrar contenido exportado en el módulo');
    }

    // Ejecutar cualquier script de inicialización específico según la página
    if (pathname === '/' || pathname === '/login') {
      // Inicializar página de login
      if (module.loginPageLogic && typeof module.loginPageLogic === 'function') {
        module.loginPageLogic();
      }
    } else if (pathname === '/register') {
      // Inicializar página de registro si existe la función
      if (module.setupRegister && typeof module.setupRegister === 'function') {
        module.setupRegister();
      }
    } else if (pathname.includes('/dashboard')) {
      // Inicializar dashboard y otras páginas según la ruta
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

    // Actualizamos la URL sin recargar
    history.pushState({}, '', pathname);
  } catch (err) {
    console.error('Error navegando:', err);
    if (window.Swal) {
      Swal.fire('Ups', 'Algo salió mal al cargar la ruta', 'error');
    } else {
      alert('Ups, algo salió mal al cargar la ruta');
    }
    if (pathname !== '/') navigate('/');
  }
}

// 🔙 Back/forward del navegador
window.addEventListener('popstate', () => {
  navigate(location.pathname);
});

// Inicialización del router
export function initRouter() {
  // 🚀 Cargar ruta actual al iniciar la app
  navigate(location.pathname);
}
