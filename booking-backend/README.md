# Booking Backend

An Express.js REST API server built with TypeScript for the booking application. It provides backend services with security middleware, logging, rate limiting, and structured error handling.

## Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** (or npm/yarn)

## Installation

1. Navigate to the backend directory:
   ```bash
   cd booking-backend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env  # If available
   ```
   Configure your environment variables in the `.env` file as needed.

## Project Structure

```
src/
├── app.ts              # Express application setup
├── config/             # Configuration files
├── controller/         # Request handlers
├── middleware/         # Custom middleware (CORS, Helmet, Morgan)
├── routes/             # API route definitions
├── service/            # Business logic
├── types/              # TypeScript type definitions
└── utils/              # Utility functions (logging, etc.)
```

## Available Scripts

### Development
Start the development server with hot reload:
```bash
pnpm dev
```
The server will watch for file changes and automatically restart.

### Build
Compile TypeScript to JavaScript:
```bash
pnpm build
```
Output will be in the `dist/` directory.

### Production
Run the compiled production build:
```bash
pnpm start
```

### Linting
Check for code quality issues:
```bash
pnpm lint
```

Fix linting issues automatically:
```bash
pnpm lint:fix
```

### Formatting
Format code with Prettier:
```bash
pnpm format
```

Check formatting without changing files:
```bash
pnpm format:check
```

## Tech Stack

- **Framework**: Express.js 5.x
- **Language**: TypeScript 6.x
- **Server Runtime**: Node.js (with tsx for dev)
- **Security**: Helmet, CORS, express-rate-limit
- **Validation**: Joi
- **Logging**: Winston, Morgan
- **Dev Tools**: ESLint, Prettier

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. The server will be running on the port specified in your configuration (default: check `src/config/config.ts`)

## Configuration

Configuration is managed in `src/config/config.ts`. Update environment variables as needed for your deployment.

## API Documentation

Routes are defined in `src/routes/`. Refer to individual route files for endpoint documentation.

## Contributing

- Run linting and formatting before committing
- Follow the existing code structure and naming conventions
- Use TypeScript strict mode
