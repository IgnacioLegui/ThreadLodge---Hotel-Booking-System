# ThreadLodge — Hotel Booking System 🏨✨

A modern, full-stack web application for reserving rooms in a luxury boutique hotel. Features a premium design, smooth animations, internationalization (EN/ES), and a complete booking flow.

## 🚀 Technologies Used

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons & Dates:** Lucide React, date-fns
- **Features:** 
  - Dynamic responsive layout with modern glassmorphism.
  - Custom scroll animations and image transitions.
  - i18n support built from scratch using Context API (English/Spanish).
  - Friendly routing (`/habitaciones/[checkIn]/[checkOut]`).

### Backend
- **Framework:** Spring Boot 3.4.3 (Java 17)
- **Database:** PostgreSQL (hosted on Neon.tech)
- **ORM:** Hibernate / Spring Data JPA
- **Build Tool:** Maven

## 📦 Project Structure

```
hotel-booking-system/
├── backend/                  # Spring Boot Java application
│   ├── src/main/java         # Controllers, Services, Repositories, Entities
│   └── src/main/resources    # application.properties, data.sql (initial db seed)
└── frontend/                 # Next.js React application
    ├── app/                  # Next.js App Router pages
    ├── components/           # Reusable UI components (Carousel, Navbar, etc.)
    ├── lib/                  # Utils, API calls, Types, i18n dictionary
    └── public/               # Static assets (images, icons)
```

## 🛠️ Getting Started

To run this project locally, you will need **Java 17**, **Maven**, and **Node.js** installed.

### 1. Database Setup
The backend is configured to connect to a PostgreSQL database. Ensure you have the database credentials exported as environment variables before starting the backend:
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

### 2. Start the Backend
```bash
cd backend
mvn spring-boot:run
```
The API will start at `http://localhost:8080`.

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
The web app will be available at `http://localhost:3000`.

## 📸 Core Features

1. **Date Search:** Interactive calendar to pick Check-in and Check-out dates.
2. **Room Availability:** Real-time query to the backend detecting overlapping reservations.
3. **Checkout Flow:** Guest details form with immediate price calculation.
4. **i18n Toggle:** Switch between English and Spanish instantly across the whole app.
5. **Polished UI:** Image preloaders, skeleton states, smooth scrolls, and staggered fade-ups.
