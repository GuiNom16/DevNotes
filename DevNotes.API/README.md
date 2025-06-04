# DevNotes Backend

This repository contains the backend API for **DevNotes**, built with **.NET 8**, following **Clean Architecture** principles and implementing the **CQRS pattern** using **MediatR**. It uses **Entity Framework Core** with **PostgreSQL** as the database.

---

## Project Structure

The solution is organized into the following projects:

- `DevNotes.Domain`  
  Contains the core business logic, entities, and interfaces. This layer is independent of any infrastructure concerns.

- `DevNotes.Application`  
  Implements application logic, including CQRS handlers (commands and queries), DTOs, and validation logic.

- `DevNotes.Infrastructure`  
  Handles data persistence (EF Core), external services, and implementations of repository interfaces.

- `DevNotes.API`  
  The ASP.NET Core Web API project responsible for exposing endpoints, configuring services, authentication, and middleware.

- `DevNotes.Tests`  
  Contains unit and integration tests for the backend projects.

  ***

## Technologies & Tools Used

- **.NET 8** � Modern, high-performance framework for building APIs
- **MediatR** � Implements the CQRS pattern with command and query handlers
- **Entity Framework Core** � ORM for data access to PostgreSQL database
- **PostgreSQL** � Relational database system used for persistence
- **FluentValidation** � Validation library integrated with MediatR pipeline behaviors
- **Swagger (Swashbuckle)** � API documentation and testing UI
- **Dependency Injection (DI)** � Built-in .NET DI container for service registration and resolution
- **MediatR Pipeline Behaviors** � Cross-cutting concerns like validation handled via MediatR pipeline

---

## Setup & Running

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) installed
- [PostgreSQL](https://www.postgresql.org/download/) installed and running
- (Optional) A PostgreSQL client tool to manage the database

### Configuration

- The connection string for PostgreSQL is configured in `appsettings.json` under `ConnectionStrings:DefaultConnection`.
- By default, it connects to a local PostgreSQL instance:

  ```json
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=DevNotesDb;Username=postgres;Password=postgres"
  }
  ```

- Adjust the connection string as needed for your environment.

### Database Setup

- To create and update the database schema, use Entity Framework Core migrations.
- From the `DevNotes.Infrastructure` project folder (or root if solution-wide), run:

  ```bash
  dotnet ef database update
  ```

- This will apply all pending migrations and create the database if it does not exist.

### Running the API

- Navigate to the `DevNotes.API` project folder.
- Run the application with:

  ```bash
  dotnet run
  ```

- The API will be available at the URLs configured in `launchSettings.json`, typically:

  - `http://localhost:5114`
  - `https://localhost:7012`

- Swagger UI is enabled in development and accessible at `/swagger`.

## 4. Architecture Overview & Dependency Injection

### Clean Architecture Layers

- **DevNotes.Domain**: Core business entities and domain models.
- **DevNotes.Application**: Application logic, interfaces, CQRS handlers, validation, and services.
- **DevNotes.Infrastructure**: Implements Application interfaces, handles persistence with EF Core and PostgreSQL.
- **DevNotes.API**: Entry point exposing REST APIs, configures DI, middleware, and routing.
- **DevNotes.Tests**: Unit and integration tests.

### CQRS and MediatR

- Commands and Queries reside in the Application layer.
- Handlers process requests via MediatR, enabling separation of concerns.

### Dependency Injection & Middleware

- Registers DbContext, repositories, services, MediatR handlers, and validators.
- Configures Swagger, CORS, HTTPS, authentication (JWT prepared), and routing.

## 5. Testing

### Overview

The **DevNotes.Tests** project contains unit and integration tests to ensure code quality and correctness.

### Testing Frameworks & Libraries

- **xUnit** for test running and assertions.
- **Moq** for mocking dependencies such as repositories and services.
- **FluentAssertions** for expressive and readable assertions.

### Running Tests

To run all tests, execute the following command from the solution root or the `DevNotes.Tests` directory:

```bash
dotnet test
```

This command will build and run the tests, showing a summary of passed/failed tests.

## 6. Environment Configuration

The application uses `appsettings.json` to configure:

- **Database Connection** via `ConnectionStrings:DefaultConnection` (PostgreSQL).
- **JWT Authentication Settings** under `AuthSettings` (prepared but not currently active).
- **Logging** and **Allowed Hosts**.

Example `appsettings.json` snippet:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=DevNotesDb;Username=postgres;Password=postgres"
  },
  "AuthSettings": {
    "Key": "your-secret-key",
    "Issuer": "DevNotes.API",
    "Audience": "DevNotes.Client",
    "ExpiryMinutes": 60
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

Note: Update the connection string as needed for your local environment.

## 7\. Project Conventions & Contribution Guidelines

This project aims to be a helpful and evolving codebase, so conventions here are pretty flexible.

### Coding Style

- The project follows **clean architecture** principles and uses **CQRS** with MediatR.
- Manual mapping is used between entities and DTOs/services.
- Naming generally follows PascalCase for classes/methods and camelCase for variables, but don�t stress too much, clarity matters most!
- Keep functions focused and readable.

### Contributions & Feedback

- Feel free to open issues or pull requests, no matter how big or small!
- If you notice anything that could be improved, or if something doesn�t make sense, your feedback is always welcome.
- We�re all here to learn and improve, so don�t hesitate to suggest better ways of doing things.

### Pull Requests

- Please make sure your code builds and tests pass (if applicable).
- Including tests for new features or fixes is appreciated but not mandatory.
- No strict rules, just try to keep the code clear and understandable.

## 8\. Future Improvements

- **Note Versioning:** Track changes and history of notes over time.
- **User Authentication:** Implement JWT-based authentication and authorization for secure access.

If you have ideas or want to contribute to these features, contributions are very welcome!

## 9\. Summary

This backend project follows clean architecture with separate layers for domain, application, infrastructure, API, and tests.It uses .NET 8, MediatR for CQRS, Entity Framework Core with PostgreSQL, and manual mapping.The API is configured for easy local development with Swagger UI for exploration.

Thanks for checking out the project! Feel free to open issues, suggest improvements, or contribute code.
