# DevNotes — Overview

Welcome to **DevNotes**, a multi-layered application designed to help developers manage and enhance their notes efficiently. This repository contains three main parts working together to provide a smooth user experience:

---

## Project Structure & Readmes

- **DevNotes.API** — The .NET backend.  
  Contains the core business logic, API endpoints, and data access.  
  [See detailed backend README here](./DevNotes.API/README.md)

- **MLServices** — The Flask backend.  
  Hosts AI-powered services that support features like **Summarize**, **Beautify**, and **Tag Suggestion**.  
  [See detailed ML backend README here](./MLServices/README.md)

- **DevNotes.Web** — The React frontend.  
  Provides the user interface built with React, Vite, and TypeScript.  
  [See detailed frontend README here](./DevNotes.Web/README.md)

---

## How It Works Together

1. The **React frontend** interacts exclusively with the **.NET backend API** (`DevNotes.API`). This centralizes all requests, improving security, validation, and maintainability by keeping business logic and data management in one place.

2. The .NET backend calls the **Flask AI services** (`MLServices`) internally to power smart features like summarizing notes, beautifying content, and suggesting tags. This separation allows the AI models to be developed and scaled independently from the main backend.

3. The application uses a PostgreSQL database for persistence, managed by the .NET backend.

4. Currently, only the **Flask service** is containerized with Docker for easier local development and isolation. The frontend and backend are run locally without containers for simplicity.

---

## Why This Architecture?

- **Separation of Concerns:** Each part focuses on its responsibility — frontend for UI, .NET backend for API and business logic, Flask backend for AI models.
- **Scalability:** The AI services can evolve independently, and later could be deployed separately or scaled horizontally.
- **Maintainability:** Centralizing access through the .NET API simplifies security, logging, and validation, reducing duplicated logic on the client.
- **Flexibility:** You can replace or upgrade each layer without disrupting the others.

---

## Getting Started

To explore the project:

- Start by checking out each component’s README for setup, usage, and development details.
- The backend and frontend run locally; the Flask AI service runs in Docker.
- The database connection and migration instructions are in the backend README.

---

## Feedback & Contributions

This is one of my first projects posted publicly on GitHub, and I’m eager to learn and improve. If you find any issues, have suggestions, or want to contribute, please don’t hesitate to open an issue or a pull request. Your feedback is invaluable!

---

Happy coding! 🚀
