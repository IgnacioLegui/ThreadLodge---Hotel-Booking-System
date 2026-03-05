# ThreadLodge 🏨✨

**ThreadLodge** is a modern, full-stack hotel booking system built with **Next.js** and **Spring Boot**. It provides a premium, responsive booking experience with smooth animations, dynamic room availability checks, multi-language support (EN/ES), and a complete reservation pipeline — all wrapped in a sleek, glassmorphic design.

![React](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Java](https://img.shields.io/badge/Java-17%2B-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4-brightgreen?logo=springboot)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss)
![License](https://img.shields.io/github/license/IgnacioLegui/ThreadLodge---Hotel-Booking-System)
![Version](https://img.shields.io/badge/version-1.0-blue)

---

## 🚀 Key Features

### 📅 Booking Flow
- **Date Search**: Interactive responsive calendar (date-fns) for Check-in and Check-out selection.
- **Dynamic Routing**: SEO-friendly URL structure (`/habitaciones/[checkIn]/[checkOut]`).
- **Real-time Availability**: Backend queries automatically exclude dates with overlapping reservations.

### 💳 Checkout & Reservations
- **Guest Details Form**: Comprehensive guest data collection with input validation.
- **Dynamic Pricing**: Instant calculation of total price based on selected room category and nights.
- **Confirmation Screen**: Animated success confirmation with Booking ID generation.

### 🌐 Bilingual Interface (i18n)
- **Full English & Spanish Support**: Translated across all views, buttons, models, and dates.
- **Instant Switching**: Change language seamlessly from the navigation bar without page reloads.
- **Dynamic Data Translation**: Database entities (e.g., room names, status) are translated on-the-fly.

### ✨ Premium UI/UX Ecosystem
- **Staggered Animations**: Scroll-triggered fade-ups, zooms, and blurs using Intersection Observer.
- **Smart Navigation**: Smooth scroll for anchor links locally, or delayed smooth scroll across pages.
- **Image Preloading**: Eager loading for primary assets with elegant crossfade spinners.

---

## 🛠️ Technology Stack

| Component       | Technology                     |
|----------------|--------------------------------|
| Frontend        | Next.js (App Router), React   |
| Styling         | Tailwind CSS, shadcn/ui        |
| Icons & Dates   | Lucide React, date-fns         |
| Backend API     | Java 17, Spring Boot 3.4.3     |
| Database        | PostgreSQL (Neon.tech)         |
| ORM             | Hibernate, Spring Data JPA     |
| Build Tool      | Maven                          |

---

## 📥 Installation

### 1. Database Setup
The backend requires a PostgreSQL connection. Ensure these environment variables are exported before running the application:
- `DB_URL` (e.g. `jdbc:postgresql://<host>/<db>?sslmode=require`)
- `DB_USERNAME`
- `DB_PASSWORD`

### 2. Run Backend (Spring Boot)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build and run with Maven:
   ```bash
   mvn spring-boot:run
   ```
   *The API will be available at `http://localhost:8080`.*

### 3. Run Frontend (Next.js)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:3000`.*

---

## 📁 Project Structure

```
hotel-booking-system/
├── backend/                  # Spring Boot Java application
│   ├── src/main/java         # Controllers, Services, Repositories, Entities
│   └── src/main/resources    # application.properties, data.sql (db seed)
│
└── frontend/                 # Next.js React application
    ├── app/                  # Next.js App Router (Pages & Layout)
    ├── components/           # Reusable UI (Navbar, Carousel, ScrollAnimate)
    ├── lib/                  # API clients, Type definitions, i18n logic
    └── public/               # Local static assets & images
```

---

## 📚 Documentation

- [📄 **Software Requirements Specification (SRS)**](./ThreadLodge_SRS_English.pdf)

---

## 📬 Contact Developer

**Ignacio Leguizamon**  
Software Developer

[![Website](https://img.shields.io/badge/Website-ignacioleguizamon.site-blueviolet?style=flat&logo=safari)](https://ignacioleguizamon.site)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/ignaciolegui/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/IgnacioLegui)

---

> **Note**: This project is open-source under the MIT License. Contributions are welcome!
