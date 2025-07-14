import { getUser } from '../utils/auth.js';
import { EventList } from '../components/EventList.js';

export async function DashboardPage() {
  const user = getUser();
  const eventsHtml = await EventList();
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
            ${user.role === 'admin' ? 
              '<li><a href="/dashboard" class="active" data-link>Events</a></li>' : 
              '<li><a href="/dashboard/enrollments" data-link>Enrollments</a></li><li><a class="active" href="/dashboard" data-link>Events</a></li>'
            }
            <li><button id="logout-btn">Logout</button></li>
          </ul>
        </nav>
      </aside>
      <main class="main-content">
        ${eventsHtml}
      </main>
    </div>
  `;
}
