# 🏢 HRMS Lite — HR Management System

HRMS Lite is a lightweight HR management system built with **Django + PostgreSQL** backend and **React + Vite + Redux + Bootstrap5** frontend.  
It supports employee management and daily attendance tracking with authentication and dashboard analytics.

---

##  Features

###  Authentication
- Admin login (session-based auth)
- Secure cookies (SameSite, CSRF)
- Protected routes (React + Redux)
- Logout support

###  Employee Management
- Add employee
- Delete employee
- View employee details
- Search + Pagination
- Reusable table component

### Attendance System
- Mark attendance (Present/Absent/Leave)
- Unique constraint (no duplicate day entries)
- View attendance history per employee
- Recent feed in dashboard

###  Dashboard
- KPI Cards:
  - Total Employees
  - Present Today
  - Absent Today
  - Leave Today
- Recent 5 attendance records

---

## 🏗 Tech Stack

### **Frontend**
- React (Vite)
- Redux Toolkit
- Axios
- Bootstrap 5
- React Toastify

### **Backend**
- Django 5
- Django REST Framework
- PostgreSQL
- Session Authentication
- CSRF Protection
- CORS + Cookies

---



## Backend Setup

```sh
cd backend
python3 -m venv venv
source venv/bin/activate     # mac/linux
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser(for login as a admin it is required)
python manage.py runserver
```

### 🗄 PostgreSQL Configuration

Update `.env` or settings:

```
DB_NAME=hrms_db
DB_USER=hrms_user
DB_PASSWORD=****
DB_HOST=localhost
DB_PORT=5432
```

---

## 🎨 Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

Runs at:
```
http://localhost:5173
```

---

## 🔐 Authentication & Cookies

- Backend uses Authorization: Bearer <access_token>
- Frontend uses:
  - `axios.withCredentials = true`

---

## 🌍 Deployment Notes

If using subdomains (recommended):

```
FE: https://hrm.hypertonic.co.in
BE: https://backend.hrm.hypertonic.co.in
```

Important Django settings in production:

```
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SAMESITE = 'None'
CSRF_COOKIE_SAMESITE = 'None'
CORS_ALLOW_CREDENTIALS = True
```


---

## 🧪 API Endpoints

### **Auth**
```
POST /api/login/
POST /api/logout/
GET  /api/get-csrf/
```

### **Employees**
```
GET    /api/employees/
POST   /api/employees/
DELETE /api/employees/<employee_id>/
```

### **Attendance**
```
GET  /api/attendance/
POST /api/attendance/
GET  /api/attendance/<employee_id>/   # optional - individual history
```

---



## 📄 License

Private project — not open source (can update based on needs)

---

## 👨‍💻 Developer

Made by **Kshitiz Mehta**

