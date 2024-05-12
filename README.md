# meaty-backend

## Project Overview

`meaty-backend` is a robust e-commerce web application tailored for the sale of cannabis for both medical and recreational purposes. This platform provides a seamless interface for browsing and purchasing a variety of cannabis products, ensuring a secure and user-friendly experience for its users.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io/)

### Setting Up the Development Environment

Follow these steps to set up your local development environment:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/meaty-backend.git
   cd meaty-backend
   ```

2. **Start Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Run Database Migrations:**
   ```bash
   yarn migrate
   ```

5. **Allow Execution Scripts:**
   ```bash
   yarn allow:exec
   ```

6. **Start the Development Servers:**
   ```bash
   yarn start:dev:all
   ```

### Stopping the Servers

To stop all development servers, use the following command:

```bash
yarn stop:dev:all
```

### Adding Initial Data to the Database

To populate the database with initial data, follow these steps:

1. **Copy the backup SQL file into the Docker container:**
   ```bash
   docker cp ./db_backup.sql {docker_id}:/var/lib/postgresql/data/db_backup.sql
   ```

2. **Execute the SQL file inside the Docker container:**
   ```bash
   docker exec -it {docker_id} psql -U myuser -d meaty-db -f /var/lib/postgresql/data/db_backup.sql
   ```
   Replace `{docker_id}` with the actual Docker container ID, which can be found by running:
   ```bash
   docker ps
   ```

## Contributing

We encourage you to contribute to `meaty-backend`! Please check out the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines about how to proceed. 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
