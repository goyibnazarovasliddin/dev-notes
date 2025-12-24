/**
 * src/validators/note.schema.ts
 * Purpose: Zod schemas for validating note input data.
 * Connected Files:
 * - src/controllers/notes.controller.ts (Uses these schemas for validation)
 */
import { z } from 'zod';

export const NoteSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    content: z.string().min(5, 'Content must be at least 5 characters long'),
});

export const UpdateNoteSchema = NoteSchema.partial();
