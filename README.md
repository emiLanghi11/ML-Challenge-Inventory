# Inventory Service

A NestJS-based inventory management service with PostgreSQL, Redis, and RabbitMQ support.

## 🏗️ Project Structure

```
inventory-service/
├── src/
│   ├── inventory/
│   │   ├── inventory.controller.ts    # REST API controller
│   │   ├── inventory.controller.spec.ts
│   │   └── inventory.module.ts        # Inventory module
│   ├── app.module.ts                  # Main application module
│   └── main.ts                        # Application entry point
├── test/
│   ├── app.e2e-spec.ts               # End-to-end tests
│   └── jest-e2e.json                 # Jest E2E configuration
├── docker-compose.yml                # Docker services configuration
├── init.sql                          # Database initialization script
├── env.example                       # Environment variables template
└── package.json                      # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Docker and Docker Compose

### 1. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 2. Setup Environment

Copy the environment template and configure your settings:

```bash
# Copy environment template
cp env.example .env

# Edit .env file with your preferred settings (default values work with Docker setup)
```

### 3. Start Infrastructure Services

Start PostgreSQL, Redis, and RabbitMQ using Docker Compose:

```bash
# Start all services in background
npm run docker:up

# Or manually
docker-compose up -d
```

This will start:
- **PostgreSQL** on port `5433` (database: `inventory`, user: `postgres`, password: `inventoryLocal`)
- **Redis** on port `6379`
- **RabbitMQ** on port `5672` (Management UI: http://localhost:15672, user: `admin`, password: `admin123`)

### 4. Start the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The service will be available at `http://localhost:3000`

## 📡 API Endpoints

### GET /inventory/:sku

Returns inventory information for a given SKU.

**Example Request:**
```bash
curl http://localhost:3000/inventory/LAPTOP-001
```

**Example Response:**
```json
{
  "sku": "LAPTOP-001",
  "available": 42
}
```

## 🧪 Testing

### Unit Tests

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov
```

### End-to-End Tests

```bash
# Run e2e tests
npm run test:e2e
```

## 🐳 Docker Services

### Database Access

Connect to PostgreSQL:
```bash
# Using psql
psql -h localhost -p 5433 -U postgres -d inventory

# Using Docker
docker exec -it inventory-postgres psql -U postgres -d inventory
```

### Redis Access

Connect to Redis:
```bash
# Using redis-cli
redis-cli -p 6379

# Using Docker
docker exec -it inventory-redis redis-cli
```

### RabbitMQ Management

Access RabbitMQ Management UI:
- URL: http://localhost:15672
- Username: `admin`
- Password: `admin123`

## 🛠️ Development

### Available Scripts

```bash
npm run build          # Build the application
npm run start          # Start the application
npm run start:dev      # Start in development mode
npm run start:debug    # Start in debug mode
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
npm run docker:up      # Start Docker services
npm run docker:down    # Stop Docker services
```

### Database Configuration

The application uses TypeORM with PostgreSQL. Configuration is handled through environment variables:

```env
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=inventoryLocal
DB_NAME=inventory
```

### Adding New Features

1. Create new modules in the `src/` directory
2. Register modules in `app.module.ts`
3. Add tests for new functionality
4. Update this README if needed

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5433` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `inventoryLocal` |
| `DB_NAME` | Database name | `inventory` |
| `NODE_ENV` | Environment | `development` |
| `PORT` | Application port | `3000` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `RABBITMQ_URL` | RabbitMQ connection URL | `amqp://localhost:5672` |

## 📝 Notes

- The application includes sample data in the database initialization script
- TypeORM synchronization is enabled in development mode
- CORS is enabled for cross-origin requests
- Global validation pipes are configured
- The service returns random availability numbers for testing purposes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the UNLICENSED License.