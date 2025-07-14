import { getUser } from '../utils/auth.js';
import { fetchAPI } from '../services/api.js';

export async function EnrollmentsPage() {
  const user = getUser();
  const enrollments = await fetchAPI(`/enrollments?userId=${user.id}`);
  let tableHtml = `<div class="events-list"><table><thead><tr><th></th><th>Name</th><th>Description</th><th>Date</th></tr></thead><tbody>`;
  if (enrollments.length === 0) {
    tableHtml += `<tr><td colspan="4" style="text-align:center;">No enrollments yet.</td></tr>`;
  } else {
    for (const enrollment of enrollments) {
      const event = await fetchAPI(`/events/${enrollment.eventId}`);
      tableHtml += `<tr>
        <td><img src="../../public/img/eventos%201.png" alt="event" style="width:75px;height:55px;border-radius:8px;object-fit:cover;"></td>
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
        <div class="profile">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" class="profile-img" />
          <div>
            <div class="profile-name">${user.fullName}</div>
            <div class="profile-role">${user.role === 'admin' ? 'Admin' : 'Visitor'}</div>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href="/dashboard/enrollments" data-link class="active">Enrollments</a></li>
            <li><a href="/dashboard" data-link>Events</a></li>
            <li><button id="logout-btn">Logout</button></li>
          </ul>
        </nav>
      </aside>
      <main class="main-content">
        ${tableHtml}
      </main>
    </div>
  `;
}
