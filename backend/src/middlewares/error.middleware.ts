/**
 * src/middlewares/error.middleware.ts
 * Purpose: Centralized error handling middleware.
 * Connected Files:
 * - src/app.ts (Registers this middleware)
 */
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof ZodError) {
        res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: err.issues,
        });
        return; // Ensure response is sent
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        errors: [err.message],
    });
};
