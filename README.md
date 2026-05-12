# Railway Ticket Booking System (UZ Analog)

**University Laboratory Works #9–10**

## Project Goal

The goal of this project is to build a web application that simulates the Ukrainian railway ticket sales system (similar to Ukrzaliznytsia). The application allows users to view available trains and flights, select wagons and seats, and book tickets by entering their personal data. 

## Status

- **[IN PROGRESS]** main
  - Initialized Vite + React + TypeScript template
  - Configured strict ESLint rules

- **[TODO]** feat/base-layout
  - Global styles and CSS variables setup
  - Header, Main, and Footer layout components
  - Base routing configuration

- **[TODO]** feat/home-page (Lab 9)
  - Train mock data generation
  - TrainCard and TrainList components
  - Search and filtering functionality (by route/number)

- **[TODO]** feat/anim-and-adapt
  - Responsive design (mobile-first approach)
  - Hover transitions and UI animations

- **[TODO]** feat/booking-system (Lab 10)
  - Interactive wagon and seat map
  - Booking state management (selection, availability)
  - Booking form with user details verification

## Tech Stack

* **Frontend:** React 18+
* **Language:** TypeScript
* **Build Tool:** Vite
* **Routing:** React Router v6+
* **State Management:** React Hooks (`useState`, `useEffect`, Context API)
* **API / Data:** Mock API (JSON-Server) / `localStorage`
* **Styling:** CSS Modules

## Core Features

* **Train Discovery:** View a list of trains displayed as cards, including details like train number, route (departure → arrival), dates, times, and travel duration.
* **Search & Filter:** Find specific routes or train numbers.
* **Interactive Seat Selection (Upcoming):** Choose a specific wagon type and select available seats via a visual, color-coded interactive layout (Free: Green, Selected: Blue, Booked: Red).
* **Booking System (Upcoming):** Reserve seats by filling out passenger details, with state saved either locally or via a mock backend.

## Running Locally

To run the railway ticket booking system locally, follow these steps:

1. Clone the repository using the following command:

```bash
git clone git@github.com:your-username/railway-booking.git
```

2. Navigate to the project folder:

```Bash
cd railway-booking
```
3. Install the dependencies:

```Bash
npm install
```
4. Start the development server:

```Bash
npm run dev
```
## Project Structure
```
/src
├── App.tsx
├── main.tsx
│ // future releases
├── components
│   ├── Layout
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── trains 
│   │   ├── TrainCard.tsx
│   │   ├── TrainCard.module.css
│   │   └── TrainList.tsx
│   ├── shared
│   │   └── SearchFilter.tsx
│   └── booking
│       ├── WagonSelector.tsx
│       ├── SeatMap.tsx
│       └── BookingForm.tsx
├── pages 
│   ├── Home.tsx
│   ├── NotFound.tsx
│   └── BookingDetails.tsx
├── data 
│   └── trains.ts
├── types 
│   └── train.ts
├── styles
│   └── global.css
├── services
│   └── api.ts
└── store
    └── BookingContext.tsx
```