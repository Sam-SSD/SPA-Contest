import { login } from '../utils/auth.js';
import { fetchAPI } from '../services/api.js';
import { navigate } from '../router/Router.js';

export function LoginPage() {
  return `
    <div class="auth-container">
      <h2>Login</h2>
      <form id="login-form">
        <label>Email</label>
        <input type="email" name="email" required />
        <label>Password</label>
        <input type="password" name="password" required />
        <button type="submit">Log in</button>
      </form>
      <p>Don't have an account? <a href="#/register">Register</a></p>
    </div>
  `;
}

export function loginPageLogic() {
  const form = document.getElementById('login-form');
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;
      try {
        const users = await fetchAPI('/users');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          login(user);
          navigate('/dashboard');
        } else {
          alert('Invalid credentials');
        }
      } catch (err) {
        alert('Login error');
      }
    };
  }
} 