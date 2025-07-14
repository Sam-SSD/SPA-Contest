import { fetchAPI } from '../services/api.js';
import { navigate } from '../router/Router.js';

export function EditEventPage(event) {
  return `
    <div class="event-form-container">
      <h2>Edit Event</h2>
      <form id="edit-event-form">
        <label>Name</label>
        <input type="text" name="name" value="${event.name}" required />
        <label>Description</label>
        <textarea name="description" required>${event.description}</textarea>
        <label>Date</label>
        <input type="date" name="date" value="${event.date}" required />
        <label>Capacity</label>
        <input type="number" name="capacity" value="${event.capacity}" required min="1" />
        <button type="submit">Save</button>
        <button type="button" id="cancel-btn">Cancel</button>
      </form>
    </div>
  `;
}

export function editEventPageLogic(eventId) {
  const form = document.getElementById('edit-event-form');
  const cancelBtn = document.getElementById('cancel-btn');
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const name = form.name.value;
      const description = form.description.value;
      const date = form.date.value;
      const capacity = parseInt(form.capacity.value, 10);
      try {
        await fetchAPI(`/events/${eventId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, date, capacity })
        });
        alert('Event updated!');
        navigate('/dashboard');
      } catch (err) {
        alert('Error updating event');
      }
    };
  }
  if (cancelBtn) {
    cancelBtn.onclick = () => navigate('/dashboard');
  }
} 