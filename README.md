# AI Training API

A TypeScript-based REST API using Express, TypeORM, and PostgreSQL.

## Prerequisites

- Node.js v20 or later
- PostgreSQL v16 or later
- Docker and Docker Compose (optional)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-training
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgres://user:password@db:5432/app
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=3600
REFRESH_TOKEN_EXPIRATION=604800
CORS_ORIGIN=http://localhost:3000
```

## Development

Start the development server:
```bash
npm run dev
```

## Docker Setup

Build and run the application using Docker Compose:
```bash
docker-compose up --build
```

## Available Scripts

- `npm run build` - Build the TypeScript code
- `npm run start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Documentation

API documentation is available at `/docs/api` when running the server.

## License

MIT 