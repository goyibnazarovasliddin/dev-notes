/**
 * src/main.tsx
 * Purpose: Frontend entry point. Mounts the React application.
 * Connected Files:
 * - src/app/App.tsx (Main component)
 * - src/styles/index.css (Global styles)
 */
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);
