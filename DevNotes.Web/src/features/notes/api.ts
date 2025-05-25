// src/features/notes/api.ts
import type { NoteDTO, CreateNoteInput } from './types';

const API_URL = 'http://localhost:5000/api/notes';

export async function fetchNotes(): Promise<NoteDTO[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }

  return await response.json();
}

export async function createNote(note: CreateNoteInput): Promise<NoteDTO> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error('Failed to create note');
  }

  return await response.json();
}
