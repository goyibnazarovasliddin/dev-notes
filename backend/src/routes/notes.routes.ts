/**
 * src/routes/notes.routes.ts
 * Purpose: Defines the API routes for note operations.
 * Connected Files:
 * - src/controllers/notes.controller.ts (Handles route logic)
 */
import { Router } from 'express';
import * as NotesController from '../controllers/notes.controller';

const router = Router();

router.get('/', NotesController.getNotes);
router.get('/:id', NotesController.getNoteById);
router.post('/', NotesController.createNote);
router.put('/:id', NotesController.updateNote);
router.delete('/:id', NotesController.deleteNote);

export default router;
