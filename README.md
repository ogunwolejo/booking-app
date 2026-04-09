# Booking App

A full-stack booking application built with modern technologies. This monorepo contains both the backend API server and frontend web application for managing bookings.

## 📁 Project Structure

This repository is organized as a monorepo with two main projects:

```
booking-app/
├── booking-backend/     # Express.js REST API server
├── booking-frontend/    # React 19 web application
├── .gitignore
├── package.json (root)
└── README.md (this file)
```

## 🚀 Getting Started

Each project can be set up and run independently. For detailed setup instructions, refer to the individual README files:

- **[booking-backend/README.md](booking-backend/README.md)** - Backend API server setup and development
- **[booking-frontend/README.md](booking-frontend/README.md)** - Frontend React app setup and development

### Quick Start

**Backend:**
```bash
cd booking-backend
pnpm install
pnpm dev
```

**Frontend:**
```bash
cd booking-frontend
pnpm install
pnpm dev
```

## 📚 Project Overview

### Backend (`booking-backend/`)
Express.js REST API server providing booking management services.
- **Tech**: TypeScript, Express.js, Node.js
- **Features**: Security middleware (Helmet, CORS), Rate limiting, Structured logging (Winston, Morgan), Input validation (Joi)
- **Port**: Configured in environment variables (see backend README)

### Frontend (`booking-frontend/`)
Modern React web application for interacting with the booking system.
- **Tech**: React 19, TypeScript, Vite
- **Features**: Fast HMR development, React Compiler optimization, Responsive UI
- **Port**: Default `localhost:5173`

## 📋 Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** package manager (can also use npm or yarn)

## 🛠️ Development Workflow

1. **Install pnpm** (if not already installed):
   ```bash
   npm install -g pnpm
   ```

2. **Clone and setup the repository**:
   ```bash
   git clone <repository-url>
   cd booking-app
   ```

3. **Start the backend**:
   ```bash
   cd booking-backend
   pnpm install
   pnpm dev
   ```

4. **In a new terminal, start the frontend**:
   ```bash
   cd booking-frontend
   pnpm install
   pnpm dev
   ```

5. Open your browser to `http://localhost:5173`

## 📦 Common Commands

### Backend
- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build TypeScript to JavaScript
- `pnpm start` - Run production build
- `pnpm lint` - Check code quality
- `pnpm format` - Format code with Prettier

### Frontend
- `pnpm dev` - Start development server with HMR
- `pnpm build` - Create optimized production build
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Check code quality

## 🔧 Configuration

Both projects include their own configuration files:
- Backend: `tsconfig.json`, `eslint.config.js`, `vite.config.ts`
- Frontend: `tsconfig.json`, `vite.config.ts`, `eslint.config.js`

For specific configuration details, see the individual project READMEs.

## 📝 Contributing

- Follow the existing code structure and naming conventions
- Run linting and formatting before committing
- Use TypeScript strict mode
- Write meaningful commit messages
- Check individual project README files for specific guidelines

## 📖 Documentation

For comprehensive documentation, setup instructions, and available scripts:
- See [booking-backend/README.md](booking-backend/README.md) for backend details
- See [booking-frontend/README.md](booking-frontend/README.md) for frontend details

## 📄 License

[Add your license information here]

## 🤝 Support

If you encounter issues, refer to the individual project READMEs first, as they contain troubleshooting information specific to each application.
