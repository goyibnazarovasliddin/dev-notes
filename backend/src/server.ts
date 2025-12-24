/**
 * src/server.ts
 * Purpose: Entry point for the backend. Starts the Express server.
 * Connected Files:
 * - src/app.ts (The Express application instance)
 */
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
