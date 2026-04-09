# Booking Frontend

A modern React 19 application built with TypeScript and Vite for the booking platform. Features fast development experience with instant hot module replacement (HMR) and optimized production builds.

## Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** (or npm/yarn)

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd booking-frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Project Structure

```
src/
├── App.tsx            # Root application component
├── main.tsx           # React DOM entry point
├── App.css            # Application styles
├── index.css          # Global styles
└── assets/            # Static assets (images, etc.)

public/                # Static files served as-is
```

## Available Scripts

### Development
Start the development server with hot reload:
```bash
pnpm dev
```
The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Build
Compile TypeScript and create an optimized production build:
```bash
pnpm build
```
Output will be in the `dist/` directory, ready for deployment.

### Preview
Preview the production build locally:
```bash
pnpm preview
```
Useful for testing the production build before deployment.

### Linting
Check for code quality issues:
```bash
pnpm lint
```

## Tech Stack

- **Framework**: React 19.x
- **Language**: TypeScript 6.x
- **Build Tool**: Vite 8.x
- **Development Server**: Vite dev server with HMR
- **Code Quality**: ESLint with React and refresh plugins
- **Compiler**: Babel with React Compiler plugin
- **Styling**: CSS Modules / Global CSS

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Open your browser to `http://localhost:5173` (or the URL shown in the terminal)

4. Edit files in `src/` and see changes instantly with HMR (Hot Module Replacement)

## Building for Production

1. Build the project:
   ```bash
   pnpm build
   ```

2. The `dist/` folder contains the production-ready files

3. To test the production build locally:
   ```bash
   pnpm preview
   ```

## Configuration

- **Vite Config**: `vite.config.ts`
- **TypeScript Config**: `tsconfig.json` (main), `tsconfig.app.json` (app), `tsconfig.node.json` (tooling)
- **ESLint Config**: `eslint.config.js`

## Browser Support

The application uses modern JavaScript features (ES2020+). Check `tsconfig.app.json` for the target ECMAScript version.

## Performance

- Vite's lightning-fast development server
- React Compiler for optimized component rendering
- Code splitting and lazy loading built-in

## Contributing

- Run linting before committing
- Follow React best practices and hooks patterns
- Use TypeScript for type safety
