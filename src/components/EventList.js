import { fetchAPI } from '../services/api.js';
import { getUser } from '../utils/auth.js';
import { navigate } from '../router/Router.js';

export async function EventList() {
  const user = getUser();
  const events = await fetchAPI('/events');
  let html = `<div class="events-list">`;
  if (user.role === 'admin') {
    html += `<button onclick="window.location.hash='/dashboard/events/create'">Add New Event</button>`;
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
      html += `<button onclick="window.location.hash='/dashboard/events/edit?id=${event.id}'">Edit</button>
      <button onclick="deleteEvent(${event.id})">Delete</button>`;
    } else {
      // Check if event is sold out
      const enrollments = await fetchAPI(`/enrollments?eventId=${event.id}`);
      if (enrollments.length >= event.capacity) {
        html += `<button disabled>Sold Out</button>`;
      } else {
        html += `<button onclick="enrollEvent(${event.id})">Enroll</button>`;
      }
    }
    html += `</td></tr>`;
  }
  html += '</tbody></table></div>';
  return html;
}

window.deleteEvent = async function(id) {
  if (confirm('Are you sure you want to delete this event?')) {
    await fetchAPI(`/events/${id}`, { method: 'DELETE' });
    window.location.reload();
  }
};

window.enrollEvent = async function(eventId) {
  const user = getUser();
  await fetchAPI('/enrollments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user.id, eventId })
  });
  alert('Enrolled!');
  window.location.reload();
}; 