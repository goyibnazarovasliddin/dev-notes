/**
 * src/controllers/notes.controller.ts
 * Purpose: Request handlers for note operations (CRUD, Search, Sort).
 * Connected Files:
 * - src/services/notes.service.ts (Business logic and data access)
 * - src/validators/note.schema.ts (Zod validation schemas)
 */
import { Request, Response, NextFunction } from 'express';
import * as NoteService from '../services/notes.service';
import { NoteSchema, UpdateNoteSchema } from '../validators/note.schema';

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const search = req.query.search as string;
        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

        const result = await NoteService.getNotes(search, page, limit);
        res.json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const note = await NoteService.getNoteById(req.params.id);
        if (!note) {
            res.status(404).json({ success: false, message: 'Note not found' });
            return; // Ensure we don't continue
        }
        res.json({ success: true, data: note });
    } catch (error) {
        next(error);
    }
};

export const createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = NoteSchema.parse(req.body);
        const newNote = await NoteService.createNote(validatedData.title, validatedData.content);
        res.status(201).json({ success: true, data: newNote });
    } catch (error) {
        next(error);
    }
};

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UpdateNoteSchema.parse(req.body);
        const updatedNote = await NoteService.updateNote(req.params.id, validatedData.title, validatedData.content);

        if (!updatedNote) {
            res.status(404).json({ success: false, message: 'Note not found' });
            return;
        }

        res.json({ success: true, data: updatedNote });
    } catch (error) {
        next(error);
    }
};

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const success = await NoteService.deleteNote(req.params.id);
        if (!success) {
            res.status(404).json({ success: false, message: 'Note not found' });
            return;
        }
        res.json({ success: true, data: null });
    } catch (error) {
        next(error);
    }
};
