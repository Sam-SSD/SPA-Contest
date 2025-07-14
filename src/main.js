import { router } from './router/Router.js';
import { renderApp } from './App.js';

window.addEventListener('hashchange', () => {
  router();
  renderApp();
});

window.addEventListener('DOMContentLoaded', () => {
  router();
  renderApp();
}); 