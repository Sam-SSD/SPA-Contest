import { fetchAPI } from '../services/api.js';
import { navigate } from '../router/Router.js';

export function CreateEventPage() {
  return `
    <div class="event-form-container">
      <h2>Create Event</h2>
      <form id="create-event-form">
        <label>Name</label>
        <input type="text" name="name" required />
        <label>Description</label>
        <textarea name="description" required></textarea>
        <label>Date</label>
        <input type="date" name="date" required />
        <label>Capacity</label>
        <input type="number" name="capacity" required min="1" />
        <button type="submit">Save</button>
        <button type="button" id="cancel-btn">Cancel</button>
      </form>
    </div>
  `;
}

export function createEventPageLogic() {
  const form = document.getElementById('create-event-form');
  const cancelBtn = document.getElementById('cancel-btn');
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const name = form.name.value;
      const description = form.description.value;
      const date = form.date.value;
      const capacity = parseInt(form.capacity.value, 10);
      try {
        await fetchAPI('/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, date, capacity })
        });
        alert('Event created!');
        navigate('/dashboard');
      } catch (err) {
        alert('Error creating event');
      }
    };
  }
  if (cancelBtn) {
    cancelBtn.onclick = () => navigate('/dashboard');
  }
} 