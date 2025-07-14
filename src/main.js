import { initRouter } from './router/Router.js';
import { renderApp } from './App.js';

// Inicializamos la aplicación cuando el DOM está listo
window.addEventListener('DOMContentLoaded', () => {
  initRouter();
  renderApp();
});
