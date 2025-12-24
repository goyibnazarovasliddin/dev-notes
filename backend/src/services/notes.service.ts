/**
 * src/services/notes.service.ts
 * Purpose: Handles data access and business logic for notes.
 * Connected Files:
 * - data/notes.json (Data storage)
 * - src/models/note.model.ts (Data interface)
 */
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../models/note.model';

const DATA_FILE = path.join(process.cwd(), 'data/notes.json');
console.log('>>> SERVER DATA FILE PATH:', DATA_FILE);

export const getNotes = async (search?: string, page?: number, limit?: number): Promise<{ notes: Note[], total: number }> => {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    let notes: Note[] = JSON.parse(data);

    // Sorting: Newest first
    notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Search
    if (search) {
        const lowerSearch = search.toLowerCase();
        notes = notes.filter(note =>
            note.title.toLowerCase().includes(lowerSearch) ||
            note.content.toLowerCase().includes(lowerSearch)
        );
    }

    const total = notes.length;

    // Pagination
    if (page && limit) {
        const startIndex = (page - 1) * limit;
        notes = notes.slice(startIndex, startIndex + limit);
    }

    return { notes, total };
};

export const getNoteById = async (id: string): Promise<Note | undefined> => {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const notes: Note[] = JSON.parse(data);
    return notes.find(n => n.id === id);
};

export const createNote = async (title: string, content: string): Promise<Note> => {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const notes: Note[] = JSON.parse(data);

    const newNote: Note = {
        id: uuidv4(),
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    notes.push(newNote);
    await fs.writeFile(DATA_FILE, JSON.stringify(notes, null, 2));

    return newNote;
};

export const updateNote = async (id: string, title?: string, content?: string): Promise<Note | null> => {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const notes: Note[] = JSON.parse(data);

    const index = notes.findIndex(n => n.id === id);
    if (index === -1) return null;

    const updatedNote = { ...notes[index], updatedAt: new Date().toISOString() };
    if (title) updatedNote.title = title;
    if (content) updatedNote.content = content;

    notes[index] = updatedNote;
    await fs.writeFile(DATA_FILE, JSON.stringify(notes, null, 2));

    return updatedNote;
};

export const deleteNote = async (id: string): Promise<boolean> => {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    let notes: Note[] = JSON.parse(data);

    const initialLength = notes.length;
    notes = notes.filter(n => n.id !== id);

    if (notes.length === initialLength) return false;

    await fs.writeFile(DATA_FILE, JSON.stringify(notes, null, 2));
    return true;
};
