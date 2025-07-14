import { fetchAPI } from '../services/api.js';
import { navigate } from '../router/Router.js';

export function RegisterPage() {
  return `
    <div class="auth-container">
      <h2>Register</h2>
      <form id="register-form">
        <label for="fullName">Full Name</label>
        <input type="text" name="fullName" id="fullName" required />
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required />
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" required />
        <button type="submit">Register</button>
      </form>
      <p class="auth-register-text">Already have an account? <a href="/login" data-link>Login</a></p>
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
        Swal.fire('Error', 'Passwords do not match', 'error');
        return;
      }
      try {
        await fetchAPI('/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, password, role: 'visitor' })
        });
        Swal.fire('Success', 'Registration successful!', 'success');
        navigate('/login');
      } catch (err) {
        Swal.fire('Error', 'Registration error', 'error');
      }
    };
  }
}
