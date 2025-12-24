# Notes App Frontend

A modern, responsive React application for managing notes, designed with a Cyber/Neon aesthetic.

## Features

-   **Modern UI**: Cyber-styled interface with glassmorphism and neon accents.
-   **Rich Text Editor**: Custom editor supporting bold, italic, code blocks, lists, etc.
-   **Live Search**: Real-time filtering of notes via the backend API.
-   **Pagination**: seamless navigation through large sets of notes.
-   **Responsive**: Fully optimized for desktop and mobile viewports.

## Tech Stack

-   **Framework**: React (Vite)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React
-   **HTTP Client**: Axios

## Project Structure

```bash
src/
├── app/
│   ├── components/         # Reusable UI components
│   │   ├── NoteCard.tsx    # List item view
│   │   ├── NoteDetail.tsx  # Full view
│   │   ├── NoteModal.tsx   # Edit/Create dialog
│   │   └── ...
│   └── App.tsx             # Main application logic
├── services/
│   └── api.ts              # API integration layer
└── styles/
    └── index.css           # Global styles & Tailwind
```

## Getting Started

### Prerequisites

-   Node.js
-   npm
-   **Backend Running**: Ensure the backend server is running on port 5000.

### Installation

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App

-   **Development**:
    ```bash
    npm run dev
    ```
    Open the URL shown in the terminal (usually `http://localhost:5173`).

-   **Build for Production**:
    ```bash
    npm run build
    ```

## Backend Integration

This frontend connects to `http://localhost:5000/api`. Ensure CORS is enabled on the backend (already configured in the provided backend).