import { getUser } from '../utils/auth.js';
import { EventList } from '../components/EventList.js';

export async function DashboardPage() {
  const user = getUser();
  const eventsHtml = await EventList();
  return `
    <div class="dashboard-container">
      <aside class="sidebar">
        <div class="sidebar-title">Events</div>
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
              '<li><a href="/dashboard" class="active" data-link><img src="/public/img/events.svg" class="sidebar-icon" alt="Events" width="22" height="22"/>Events</a></li>' : 
              '<li><a href="/dashboard/enrollments" data-link><img src="/public/img/enrollments.svg" class="sidebar-icon" alt="Enrollments" width="22" height="22"/>Enrollments</a></li><li><a class="active" href="/dashboard" data-link><img src="/public/img/events.svg" class="sidebar-icon" alt="Events" width="22" height="22"/>Events</a></li>'
            }
            <li><button id="logout-btn"><img src="/public/img/logout.svg" class="sidebar-icon" alt="Logout" width="22" height="22"/>Logout</button></li>
          </ul>
        </nav>
      </aside>
      <main class="main-content">
        ${eventsHtml}
      </main>
    </div>
  `;
}
