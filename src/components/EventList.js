import { fetchAPI } from '../services/api.js';
import { getUser } from '../utils/auth.js';
import { navigate } from '../router/Router.js';

export async function EventList() {
  const user = getUser();
  const events = await fetchAPI('/events');
  let html = `<div class="events-list">`;
  if (user.role === 'admin') {
    html += `<div class="event-header-bar"><a href="/dashboard/events/create" class="add-event-btn" data-link>ADD NEW EVENT</a></div>`;
  }
  html += `<table class="event-table"><thead><tr><th></th><th>Name</th><th>Description</th><th>Capacity</th><th>Date</th><th></th></tr></thead><tbody>`;
  for (const event of events) {
    html += `<tr class="event-row">
      <td><img src="/public/img/eventos 1.png" alt="event" class="event-img" /></td>
      <td>${event.name}</td>
      <td>${event.description}</td>
      <td>${event.capacity}</td>
      <td>${event.date}</td>
      <td style="text-align:right;">`;
    if (user.role === 'admin') {
      html += `
        <button class="icon-btn" title="Edit" onclick="editEvent(${event.id})">
          <img src="/public/img/edit.svg" alt="Edit" width="22" height="22" />
        </button>
        <button class="icon-btn" title="Delete" onclick="deleteEvent(${event.id})">
          <img src="/public/img/delete.svg" alt="Delete" width="22" height="22" />
        </button>
      `;
    } else {
      // Check if event is sold out
      const enrollments = await fetchAPI(`/enrollments?eventId=${event.id}`);
      if (enrollments.length >= event.capacity) {
        html += `<button class="event-btn soldout" disabled>sold out</button>`;
      } else {
        html += `<button class="event-btn enroll" onclick="enrollEvent(${event.id})">enroll</button>`;
      }
    }
    html += `</td></tr>`;
  }
  html += '</tbody></table></div>';
  return html;
}

window.editEvent = async function(id) {
  try {
    const event = await fetchAPI(`/events/${id}`);
    // Ahora que tenemos el evento, lo almacenamos temporalmente
    sessionStorage.setItem('currentEditEvent', JSON.stringify(event));
    // Y navegamos a la página de edición
    navigate('/dashboard/events/edit');
  } catch (err) {
    Swal.fire('Error', 'Error loading event for editing', 'error');
    console.error(err);
  }
};

window.deleteEvent = async function(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetchAPI(`/events/${id}`, { method: 'DELETE' });
      Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      navigate('/dashboard');
    }
  });
};

window.enrollEvent = async function(eventId) {
  const user = getUser();
  try {
    await fetchAPI('/enrollments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, eventId })
    });
    Swal.fire('Success', 'Successfully enrolled!', 'success');
    navigate('/dashboard/enrollments');
  } catch (err) {
    Swal.fire('Error', 'Error enrolling in event', 'error');
    console.error(err);
  }
};
