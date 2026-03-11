# DataArena Sports Hub

A comprehensive college sports data portal for tracking statistics, achievements, and match records for Cricket, Kabaddi, Basketball, Throwball, Football, and Badminton.

## Overview

DataArena Sports Hub is a full-stack web application designed to manage and display college sports data. It provides an intuitive interface for viewing sports information, match records, and team statistics, along with an admin dashboard for managing sports content.

## Features

### User Features
- **Sports Catalog**: Browse all available sports with detailed information
- **Match Records**: View match results, dates, venues, and team performances
- **Sport Details**: Comprehensive information including rules, equipment, coach, captain, and achievements
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices

### Admin Features
- **Secure Admin Login**: JWT-based authentication system
- **Sports Management**: Create, read, update, and delete sports entries
- **Dashboard**: Admin dashboard for managing all sports data
- **Real-time Updates**: Instant data management with live updates

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui (Radix UI primitives)
- **State Management**: React Context API
- **Routing**: React Router DOM
- **HTTP Client**: TanStack Query

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
datarena-sports-hub/
├── backend/                  # Express.js backend API
│   ├── middleware/           # Authentication middleware
│   │   └── auth.js          # JWT verification
│   ├── models/               # MongoDB schemas
│   │   ├── Match.js         # Match data model
│   │   └── Sport.js         # Sport data model
│   ├── routes/              # API endpoints
│   │   ├── auth.js          # Authentication routes
│   │   ├── matches.js       # Match routes
│   │   └── sports.js        # Sports routes
│   ├── scripts/             # Utility scripts
│   │   └── seed.js          # Database seeding
│   ├── package.json         # Backend dependencies
│   └── server.js            # Main server file
│
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/         # shadcn-ui components
│   │   │   ├── DirectorInfo.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── HeroCarousel.tsx
│   │   │   └── NavLink.tsx
│   │   ├── contexts/       # React contexts
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── Index.tsx
│   │   │   ├── NotFound.tsx
│   │   │   └── SportDetails.tsx
│   │   ├── assets/         # Static assets (images)
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.ts      # Vite configuration
│   └── tailwind.config.ts  # Tailwind configuration
│
└── README.md                # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login (returns JWT token)

### Sports
- `GET /api/sports` - Get all sports
- `GET /api/sports/:id` - Get sport by ID
- `POST /api/sports` - Create new sport (admin only)
- `PUT /api/sports/:id` - Update sport (admin only)
- `DELETE /api/sports/:id` - Delete sport (admin only)

### Matches
- `GET /api/matches` - Get all match records
- Additional match management endpoints

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd datarena-sports-hub
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the backend directory:
   ```env
   PORT=3045
   MONGODB_URI=mongodb://localhost:27017/sports-hub
   JWT_SECRET=your-secret-key
   ```

5. **Start the development servers**

   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   Server runs on http://localhost:3045

   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on http://localhost:5173

6. **Access the application**

   Open your browser and navigate to http://localhost:5173

## Available Sports

1. **Cricket** - Bat and ball team sport
2. **Kabaddi** - Contact team sport
3. **Basketball** - Fast-paced court game
4. **Throwball** - Net team game
5. **Football** - Popular global sport
6. **Badminton** - Racket sport

## Security

- JWT-based authentication for admin routes
- Password hashing for user credentials
- CORS protection for API endpoints
- Input validation and sanitization
- Protected admin-only endpoints

## License

MIT License - feel free to use this project for educational or commercial purposes.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

