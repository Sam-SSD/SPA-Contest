# Event Management SPA

A modern Single Page Application (SPA) for event management, built with vanilla JavaScript, HTML5, CSS3, and powered by Vite and json-server. This project allows administrators to manage events and visitors to enroll in them, with full authentication, protected routes, and session persistence.

---

## 👤 Coder Info
- **Name:** Your Name
- **Clan:** Your Clan
- **Email:** your.email@example.com
- **ID:** 123456789

---

## 🚀 Features
- **User Authentication:** Register and login with two roles: Admin and Visitor.
- **Role-based Dashboard:**
  - **Admin:** Full CRUD for events.
  - **Visitor:** View and enroll in available events, see their own enrollments.
- **Session Persistence:** User session is stored in LocalStorage and persists across reloads.
- **Protected Routes:** Only authenticated users can access dashboard routes.
- **Responsive UI:** Clean, modern, and mobile-friendly interface faithful to the provided design.
- **Mock Database:** All data is managed via `json-server` (REST API simulation).
- **Vite-powered:** Fast development server and hot reload.

---

## 📁 Project Structure
```
SPA/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── utils/
│   └── main.js
├── db.json
├── style.css
├── index.html
├── package.json
├── README.md
└── event-management-spa.postman_collection.json
```

---

## 🛠️ Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/event-management-spa.git
   cd event-management-spa
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the mock API server:**
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
- Import the file `event-management-spa.postman_collection.json` into Postman.
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

## 🖥️ Main Views
- **Login:** `/login`
- **Register:** `/register`
- **Dashboard:** `/dashboard`
- **Create Event:** `/dashboard/events/create` (admin only)
- **Edit Event:** `/dashboard/events/edit?id=EVENT_ID` (admin only)
- **Enrollments:** `/dashboard/enrollments` (visitor only)
- **Not Found:** `/not-found`

---

## 📚 Notes
- All code and UI are in English.
- The project is fully functional and easy to extend.
- For any issues, please open an issue or contact the coder.

---

## 🏆 Author & License
- Developed by **Your Name** for the JavaScript SPA Performance Test.
- © 2024 Your Name. All rights reserved.