/**
 * src/app.ts
 * Purpose: configures the Express application, middleware, and routes.
 * Connected Files: 
 * - src/server.ts (Imports app to start server)
 * - src/routes/notes.routes.ts (Defines API routes)
 * - src/middlewares/error.middleware.ts (Handles errors)
 */
import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notes.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRoutes);

app.use(errorHandler);

export default app;
