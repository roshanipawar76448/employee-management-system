# Employee Management System (EMS)

A full-stack Employee Management System built using React, Spring Boot, and MySQL. The application helps organizations manage employees, attendance, leave requests, tasks, and user authentication through a secure role-based system.

---

## Features

### Authentication & Authorization
- JWT-based authentication
- Secure login system
- Role-based access control (Admin & HR)
- Protected APIs and routes
- BCrypt password encryption

### Employee Management
- Add employees
- Update employee details
- Delete employees
- View employee records
- Employee profile management

### Attendance Management
- Mark attendance
- View attendance history
- Attendance tracking

### Leave Management
- Apply for leave
- Approve or reject leave requests
- Leave history tracking

### Task Management
- Create tasks
- Assign tasks to employees
- Update task status

### Reports & Export
- Export data to Excel
- Export reports to PDF

### Dashboard
- Employee statistics
- Attendance summary
- Leave request overview
- Task monitoring

---

## Tech Stack

### Frontend
- React.js
- React Router
- Material UI (MUI)
- Axios
- Context API
- Vite

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication

### Database
- MySQL

### Build Tools
- Maven
- npm

---

## Project Structure

```text
Employee-Management-System
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── context
│   │   ├── routes
│   │   ├── hooks
│   │   └── utils
│   └── package.json
│
├── backend
│   ├── src/main/java
│   │   ├── config
│   │   ├── controller
│   │   ├── dto
│   │   ├── model
│   │   ├── repository
│   │   ├── security
│   │   └── service
│   │
│   ├── src/main/resources
│   │   └── application.properties
│   │
│   └── pom.xml
│
└── README.md
```

---

## Security Features

- JWT Token Authentication
- BCrypt Password Encryption
- Stateless Session Management
- Role-Based Access Control
- CORS Configuration
- Protected REST APIs

---

## Database Modules

- Users
- Employees
- Attendance
- Leave Requests
- Tasks
- Notifications
- Audit Logs

---

## User Roles

| Role | Permissions |
|--------|-------------|
| ADMIN | Full system access |
| HR | Employee, attendance, leave and task management |

---

## Installation & Setup

### Backend Setup

```bash
cd backend/employee-management

mvn clean install

mvn spring-boot:run
```

Backend Server:

```text
http://localhost:8080
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend Server:

```text
http://localhost:5173
```

---

## Default Credentials

### Admin

```text
Username: admin
Password: admin123
```

### HR

```text
Username: hr
Password: hr123
```

---

## API Modules

### Authentication
- Login
- JWT Token Validation

### Employee Management
- Create Employee
- Update Employee
- Delete Employee
- Get Employee Details

### Attendance
- Mark Attendance
- Attendance Reports

### Leave Management
- Apply Leave
- Approve Leave
- Reject Leave

### Task Management
- Create Task
- Assign Task
- Update Task Status

---

## Skills Demonstrated

- Java
- Spring Boot
- Spring Security
- Hibernate/JPA
- MySQL
- React.js
- REST API Development
- JWT Authentication
- Role-Based Access Control
- Material UI
- Git & GitHub

---

## Future Enhancements

- Payroll Management
- Email Notifications
- Employee Self-Service Portal
- Performance Evaluation Module
- Cloud Deployment
- Docker Containerization
- Advanced Analytics Dashboard

---

## Author

**Roshani Pawar**

B.Tech Information Science Engineering

