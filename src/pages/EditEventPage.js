import { fetchAPI } from '../services/api.js';
import { navigate } from '../router/Router.js';

export function EditEventPage() {
  // Obtenemos el evento desde sessionStorage
  let event = { name: '', description: '', date: '', capacity: 0, id: null };
  try {
    const storedEvent = JSON.parse(sessionStorage.getItem('currentEditEvent'));
    if (storedEvent) {
      event = storedEvent;
    }
  } catch (err) {
    console.error('Error retrieving event data:', err);
  }

  // Si no hay evento almacenado, mostramos un mensaje de error
  if (!event.id) {
    return `
      <div class="event-form-container">
        <h2>Error</h2>
        <p>No se encontró el evento para editar.</p>
        <button onclick="window.goToDashboard()">Volver al dashboard</button>
      </div>
    `;
  }

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

export function editEventPageLogic() {
  const form = document.getElementById('edit-event-form');
  const cancelBtn = document.getElementById('cancel-btn');

  // Obtener el ID del evento desde sessionStorage
  let eventId = null;
  try {
    const storedEvent = JSON.parse(sessionStorage.getItem('currentEditEvent'));
    if (storedEvent && storedEvent.id) {
      eventId = storedEvent.id;
    }
  } catch (err) {
    console.error('Error retrieving event ID:', err);
  }

  if (form && eventId) {
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
        // Limpiar los datos guardados
        sessionStorage.removeItem('currentEditEvent');
        navigate('/dashboard');
      } catch (err) {
        alert('Error updating event');
      }
    };
  } else {
    console.error('Form or eventId not found');
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      sessionStorage.removeItem('currentEditEvent');
      navigate('/dashboard');
    };
  }
}
