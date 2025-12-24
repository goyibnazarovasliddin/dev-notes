/**
 * src/services/api.ts
 * Purpose: Frontend API service. Handles all HTTP requests to the backend.
 * Connected Files:
 * - src/app/App.tsx (Used for data fetching)
 */
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface NotesResponse {
    success: boolean;
    data: {
        notes: Note[];
        total: number;
    };
}

export interface NoteResponse {
    success: boolean;
    data: Note;
}

export const getNotes = async (search?: string, page?: number, limit?: number): Promise<{ notes: Note[], total: number }> => {
    const response = await axios.get<NotesResponse>(API_URL, {
        params: { search, page, limit }
    });
    return response.data.data; // Adjusted to match backend response structure
};

export const createNote = async (title: string, content: string): Promise<Note> => {
    const response = await axios.post<NoteResponse>(API_URL, { title, content });
    return response.data.data;
};

export const updateNote = async (id: string, title: string, content: string): Promise<Note> => {
    const response = await axios.put<NoteResponse>(`${API_URL}/${id}`, { title, content });
    return response.data.data;
};

export const deleteNote = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
