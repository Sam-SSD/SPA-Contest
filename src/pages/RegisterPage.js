import { fetchAPI } from '../services/api.js';
import { navigate } from '../router/Router.js';

export function RegisterPage() {
  return `
    <div class="auth-container">
      <h2>Register</h2>
      <form id="register-form">
        <label>Full Name</label>
        <input type="text" name="fullName" required />
        <label>Email</label>
        <input type="email" name="email" required />
        <label>Password</label>
        <input type="password" name="password" required />
        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="#/login">Login</a></p>
    </div>
  `;
}

export function registerPageLogic() {
  const form = document.getElementById('register-form');
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const fullName = form.fullName.value;
      const email = form.email.value;
      const password = form.password.value;
      const confirmPassword = form.confirmPassword.value;
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      try {
        await fetchAPI('/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, password, role: 'visitor' })
        });
        alert('Registration successful!');
        navigate('/login');
      } catch (err) {
        alert('Registration error');
      }
    };
  }
} 