import { fetchAPI } from '../services/api.js';
import { navigate } from '../router/Router.js';

export function EditEventPage() {
  // Get event from sessionStorage
  let event = { name: '', description: '', date: '', capacity: 0, id: null };
  try {
    const storedEvent = JSON.parse(sessionStorage.getItem('currentEditEvent'));
    if (storedEvent) {
      event = storedEvent;
    }
  } catch (err) {
    console.error('Error retrieving event data:', err);
  }

  // If no event found, show error message
  if (!event.id) {
    return `
      <div class="event-form-container">
        <h2>Error</h2>
        <p>Event not found for editing.</p>
        <button onclick="window.goToDashboard()">Back to dashboard</button>
      </div>
    `;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  return `
    <div class="dashboard-container">
      <aside class="sidebar">
        <div class="sidebar-title">Events</div>
        <div class="profile">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" class="profile-img" />
          <div class="profile-info">
            <div class="profile-name">${user?.fullName || ''}</div>
            <div class="profile-role">${user?.role === 'admin' ? 'Admin' : 'Visitor'}</div>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href="/dashboard" data-link class="active"><img src="/public/img/events.svg" class="sidebar-icon" alt="Events" width="22" height="22"/>Events</a></li>
            <li><button id="logout-btn"><img src="/public/img/logout.svg" class="sidebar-icon" alt="Logout" width="22" height="22"/>Logout</button></li>
          </ul>
        </nav>
      </aside>
      <main class="main-content">
        <div class="event-form-container wide">
          <h2>Edit Event</h2>
          <form id="edit-event-form">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" value="${event.name}" required />
            <label for="description">Description</label>
            <textarea name="description" id="description" required>${event.description}</textarea>
            <div class="form-row">
              <div class="form-col">
                <label for="date">Date</label>
                <input type="date" name="date" id="date" value="${event.date}" required />
              </div>
              <div class="form-col">
                <label for="capacity">Capacity</label>
                <input type="number" name="capacity" id="capacity" value="${event.capacity}" required min="1" />
              </div>
            </div>
            <div class="form-actions">
              <button type="button" id="cancel-btn" class="btn-outline">Cancel</button>
              <button type="submit" class="btn-primary">Save</button>
            </div>
          </form>
        </div>
      </main>
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
        Swal.fire('Success', 'Event updated!', 'success');
        // Clear saved data
        sessionStorage.removeItem('currentEditEvent');
        navigate('/dashboard');
      } catch (err) {
        Swal.fire('Error', 'Error updating event', 'error');
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
