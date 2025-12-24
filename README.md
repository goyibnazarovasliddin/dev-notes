# Developer Notes Application

A full-stack, production-ready notes management system featuring a modern Cyber-styled React frontend and a robust Node.js/Typescript backend.

## Project Structure

This project is organized as a monorepo containing two distinct applications. Please refer to their respective documentation for detailed setup and usage instructions:

-   **[Frontend Application](./frontend/README.md)**
    -   Built with React, Vite, Tailwind CSS, and Shadcn UI.
    -   Features a rich text editor, cyber-aesthetic UI, and responsive design.

-   **[Backend API](./backend/README.md)**
    -   Built with Node.js, Express, and TypeScript.
    -   Provides a RESTful API with validation, error handling, and file-based persistence.

## Quick Start

To run the full application locally, you will need to start both the backend and frontend services.

1.  **Start the Backend**:
    ```bash
    cd backend
    npm install
    npm run dev
    ```

2.  **Start the Frontend** (in a new terminal):
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

Check the individual README files linked above for comprehensive guides on features, architecture, and testing.
