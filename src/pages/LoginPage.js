import { login } from '../utils/auth.js';
import { fetchAPI } from '../services/api.js';
import { navigate } from '../router/Router.js';

export function LoginPage() {
  return `
    <div class="auth-container">
      <h2>Login</h2>
      <form id="login-form">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="" required />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="" required />
        <button type="submit">Log in</button>
      </form>
      <p class="auth-register-text">Don’t have an account? <a href="/register" data-link>Register</a></p>
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
          Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            text: 'Redirecting...',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            navigate('/dashboard');
          });
        } else {
          Swal.fire('Error', 'Invalid credentials', 'error');
        }
      } catch (err) {
        Swal.fire('Error', 'Login error', 'error');
      }
    };
  }
}
