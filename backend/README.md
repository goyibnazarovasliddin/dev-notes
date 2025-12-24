# Notes App Backend

A production-ready Node.js/Express REST API for managing notes, built with TypeScript.

## Features

-   **RESTful API**: Full CRUD operations for notes.
-   **Advanced Querying**: Support for search, pagination, and sorting.
-   **Validation**: Robust request validation using Zod.
-   **Error Handling**: Centralized error middleware with consistent response formats.
-   **Architecture**: Layered architecture (Controllers, Services, Models) for scalability.
-   **Persistence**: Data is persisted to a local JSON file (`data/notes.json`).

## Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Language**: TypeScript
-   **Validation**: Zod
-   **Utilities**: UUID (IDs), CORS, Dotenv

## Project Structure

```bash
src/
├── app.ts                  # Express app configuration
├── server.ts               # Server entry point
├── controllers/            # Request handlers
│   └── notes.controller.ts
├── services/               # Business logic & Data access
│   └── notes.service.ts
├── routes/                 # API Route definitions
│   └── notes.routes.ts
├── models/                 # TypeScript interfaces
│   └── note.model.ts
├── validators/             # Zod schemas
│   └── note.schema.ts
└── middlewares/            # Custom middlewares
    └── error.middleware.ts
```

## Getting Started

### Prerequisites

-   Node.js (v14+ recommended)
-   npm

### Installation

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file (optional, defaults provided):
    ```env
    PORT=5000
    ```

### Running the Server

-   **Development (with auto-reload)**:
    ```bash
    npm run dev
    ```
-   **Production Build**:
    ```bash
    npm run build
    npm start
    ```

## API Endpoints

Base URL: `http://localhost:5000/api`

### Notes

-   `GET /notes` - Retrieve notes (query params: `search`, `page`, `limit`)
-   `GET /notes/:id` - Retrieve a specific note
-   `POST /notes` - Create a new note
-   `PUT /notes/:id` - Update a note
-   `DELETE /notes/:id` - Delete a note

## Testing

You can use the provided frontend or tools like Postman/curl to test the endpoints.
