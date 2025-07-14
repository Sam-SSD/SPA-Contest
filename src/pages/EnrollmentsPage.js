import { getUser } from '../utils/auth.js';
import { fetchAPI } from '../services/api.js';

export async function EnrollmentsPage() {
  const user = getUser();
  const enrollments = await fetchAPI(`/enrollments?userId=${user.id}`);
  let tableHtml = `<div class="events-list"><table class="event-table"><thead><tr><th></th><th>Name</th><th>Description</th><th>Date</th></tr></thead><tbody>`;
  if (enrollments.length === 0) {
    tableHtml += `<tr><td colspan="4" style="text-align:center;">No enrollments yet.</td></tr>`;
  } else {
    for (const enrollment of enrollments) {
      const event = await fetchAPI(`/events/${enrollment.eventId}`);
      tableHtml += `<tr class="event-row">
        <td><img src="/public/img/eventos 1.png" alt="event" class="event-img" /></td>
        <td>${event.name}</td>
        <td>${event.description}</td>
        <td>${event.date}</td>
      </tr>`;
    }
  }
  tableHtml += '</tbody></table></div>';

  return `
    <div class="dashboard-container">
      <aside class="sidebar">
        <div class="sidebar-title">Enrollments</div>
        <div class="profile">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" class="profile-img" />
          <div class="profile-info">
            <div class="profile-name">${user.fullName}</div>
            <div class="profile-role">${user.role === 'admin' ? 'Admin' : 'Visitor'}</div>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href="/dashboard/enrollments" data-link class="active"><img src="/public/img/enrollments.svg" class="sidebar-icon" alt="Enrollments" width="22" height="22"/>Enrollments</a></li>
            <li><a href="/dashboard" data-link><img src="/public/img/events.svg" class="sidebar-icon" alt="Events" width="22" height="22"/>Events</a></li>
            <li><button id="logout-btn"><img src="/public/img/logout.svg" class="sidebar-icon" alt="Logout" width="22" height="22"/>Logout</button></li>
          </ul>
        </nav>
      </aside>
      <main class="main-content">
        ${tableHtml}
      </main>
    </div>
  `;
}
