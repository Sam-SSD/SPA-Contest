import { getUser } from '../utils/auth.js';
import { fetchAPI } from '../services/api.js';

export async function EnrollmentsPage() {
  const user = getUser();
  const enrollments = await fetchAPI(`/enrollments?userId=${user.id}`);
  let tableHtml = `<div class=\"events-list\"><table><thead><tr><th></th><th>Name</th><th>Description</th><th>Date</th></tr></thead><tbody>`;
  if (enrollments.length === 0) {
    tableHtml += `<tr><td colspan=\"4\" style=\"text-align:center;\">No enrollments yet.</td></tr>`;
  } else {
    for (const enrollment of enrollments) {
      const event = await fetchAPI(`/events/${enrollment.eventId}`);
      tableHtml += `<tr>
        <td><img src=\"https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=facearea&w=64&h=64\" alt=\"event\" style=\"width:48px;height:48px;border-radius:8px;object-fit:cover;\"></td>
        <td>${event.name}</td>
        <td>${event.description}</td>
        <td>${event.date}</td>
      </tr>`;
    }
  }
  tableHtml += '</tbody></table></div>';

  return `
    <div class=\"dashboard-container\">
      <aside class=\"sidebar\">
        <div class=\"profile\">
          <img src=\"https://randomuser.me/api/portraits/men/1.jpg\" alt=\"Profile\" class=\"profile-img\" />
          <div>
            <div class=\"profile-name\">${user.fullName}</div>
            <div class=\"profile-role\">${user.role === 'admin' ? 'Admin' : 'Visitor'}</div>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href=\"#/dashboard/enrollments\" class=\"active\">Enrollments</a></li>
            <li><a href=\"#/dashboard\">Events</a></li>
            <li><a href=\"#/logout\" id=\"logout-link\">Logout</a></li>
          </ul>
        </nav>
      </aside>
      <main class=\"main-content\">
        ${tableHtml}
      </main>
    </div>
  `;
} 