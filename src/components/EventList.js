import { fetchAPI } from '../services/api.js';
import { getUser } from '../utils/auth.js';
import { navigate } from '../router/Router.js';

export async function EventList() {
  const user = getUser();
  const events = await fetchAPI('/events');
  let html = `<div class="events-list">`;
  if (user.role === 'admin') {
    html += `<a href="/dashboard/events/create" data-link class="btn">Add New Event</a>`;
  }
  html += `<table><thead><tr><th>Name</th><th>Description</th><th>Capacity</th><th>Date</th><th></th></tr></thead><tbody>`;
  for (const event of events) {
    html += `<tr>
      <td>${event.name}</td>
      <td>${event.description}</td>
      <td>${event.capacity}</td>
      <td>${event.date}</td>
      <td>`;
    if (user.role === 'admin') {
      html += `<button onclick="editEvent(${event.id})">Edit</button>
      <button onclick="deleteEvent(${event.id})">Delete</button>`;
    } else {
      // Check if event is sold out
      const enrollments = await fetchAPI(`/enrollments?eventId=${event.id}`);
      if (enrollments.length >= event.capacity) {
        html += `<button disabled>Sold Out</button>`;
      } else {
        html += `<a href="javascript:void(0)" onclick="enrollEvent(${event.id})" class="btn">Enroll</a>`;
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
    alert('Error loading event for editing');
    console.error(err);
  }
};

window.deleteEvent = async function(id) {
  if (confirm('Are you sure you want to delete this event?')) {
    await fetchAPI(`/events/${id}`, { method: 'DELETE' });
    navigate('/dashboard');
  }
};

window.enrollEvent = async function(eventId) {
  const user = getUser();
  try {
    await fetchAPI('/enrollments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, eventId })
    });
    alert('Successfully enrolled!');
    navigate('/dashboard/enrollments');
  } catch (err) {
    alert('Error enrolling in event');
    console.error(err);
  }
};
