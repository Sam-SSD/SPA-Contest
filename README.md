# SPA-Contest

A modern, professional Single Page Application (SPA) for event management, built with vanilla JavaScript, HTML5, and CSS3. The project uses Vite for fast development and [`json-server`](https://github.com/typicode/json-server) as a local REST API for development. It features a clean, responsive UI faithful to provided mockups, robust authentication, role-based dashboards, and a seamless SPA navigation experience.

---

## 🚀 Features
- **User Authentication:** Secure registration and login with two roles: Admin and Visitor.
- **Role-based Dashboard:**
  - **Admin:** Full CRUD for events (create, edit, delete).
  - **Visitor:** View and enroll in available events, see personal enrollments.
- **Session Persistence:** User session is stored in LocalStorage and persists across reloads.
- **Protected Routes:** Only authenticated users can access dashboard routes; admin-only sections are enforced.
- **Responsive UI:** Modern, mobile-friendly interface, pixel-perfect to the provided mockups.
- **SweetAlert2 Integration:** All alerts and confirmations use beautiful SweetAlert2 modals.
- **Local API:** All data is managed via [`json-server`](https://github.com/typicode/json-server), which provides a full REST API for development and testing.
- **Vite-powered:** Fast development server, hot reload, and modern build tooling.

---

## 📁 Project Structure
```
SPA-Contest/
├── public/
│   └── img/           # Icons, event images, SVGs
├── src/
│   ├── css/           # Global and page-specific styles (style.css)
│   ├── components/    # Reusable UI components (EventList, etc.)
│   ├── pages/         # Main views (Login, Register, Dashboard, etc.)
│   ├── router/        # SPA router logic
│   ├── services/      # API abstraction
│   ├── utils/         # Auth/session helpers
│   └── main.js        # App entry point
├── db.json            # Local database for json-server
├── index.html         # App root HTML
├── package.json       # Scripts and dependencies
├── README.md          # Project documentation
├── PostmanCollection.json # Postman API tests
└── ...
```

---

## 🛠️ Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sam-SSD/SPA-Contest.git
   cd SPA-Contest
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the local API server (json-server):**
   ```bash
   npm run start:server
   ```
   The API will be available at [http://localhost:3001](http://localhost:3001)
4. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or the port Vite shows).
5. **Open the app in your browser and enjoy!**

---

## 👤 Default Users
- **Admin:**
  - Email: `admin@admin.com`
  - Password: `admin123`
- **Visitors:** Register via the app or use the Postman collection.

---

## 🧪 API Testing (Postman)
- Import the file `PostmanCollection.json` into Postman.
- Test all endpoints: users, events, enrollments (CRUD).
- Example requests included for login, registration, event management, and enrollments.

---

## 📝 Endpoints Overview

### Users
- `GET /users` — List all users
- `POST /users` — Register new user
- `GET /users?email=...&password=...` — Login (query by credentials)

### Events
- `GET /events` — List all events
- `POST /events` — Create event (admin)
- `PUT /events/:id` — Edit event (admin)
- `DELETE /events/:id` — Delete event (admin)

### Enrollments
- `GET /enrollments` — List all enrollments
- `POST /enrollments` — Enroll user in event
- `GET /enrollments?userId=...` — Get enrollments by user
- `GET /enrollments?eventId=...` — Get enrollments by event

---

## 🖥️ Main Views & Navigation
- **Login:** `/login` — User authentication
- **Register:** `/register` — New user registration
- **Dashboard:** `/dashboard` — Main event list (role-based)
- **Create Event:** `/dashboard/events/create` (admin only)
- **Edit Event:** `/dashboard/events/edit?id=EVENT_ID` (admin only)
- **Enrollments:** `/dashboard/enrollments` (visitor only)
- **Not Found:** `/not-found` — Custom 404 page

---

## 💡 Technical Notes
- All code and UI are in English.
- Alerts and confirmations use SweetAlert2 for a modern UX.
- The project is fully functional, modular, and easy to extend.
- Responsive design ensures usability on all devices.
- For any issues, please open an issue or contact the author.

---