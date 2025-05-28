// src/features/notes/api.ts
import type { NoteDTO, NoteCreateDTO, NoteUpdateDTO } from "./types";

const API_URL = "https://localhost:7012/api/notes";

// ----------------- Note CRUD -----------------

export async function fetchNotes(): Promise<NoteDTO[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch notes");
  return await response.json();
}

export async function createNote(note: NoteCreateDTO): Promise<NoteDTO> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!response.ok) throw new Error("Failed to create note");
  return await response.json();
}

export async function updateNote(note: NoteUpdateDTO): Promise<NoteDTO> {
  const response = await fetch(`${API_URL}/${note.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!response.ok) throw new Error("Failed to update note");
  return await response.json();
}

export async function deleteNote(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete note");
}

// ----------------- AI Features -----------------

// ✅ Suggest tags based on note content
export async function suggestTags(noteText: string): Promise<string[]> {
  const response = await fetch(
    "https://localhost:7012/api/tagsuggestions/suggest",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: noteText }),
    }
  );
  if (!response.ok) throw new Error("Failed to suggest tags");
  return await response.json();
}

// ✅ Summarize note content
export async function summarizeNote(noteText: string): Promise<string> {
  const response = await fetch(
    "https://localhost:7012/api/summarizations/summarize",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: noteText }),
    }
  );
  if (!response.ok) throw new Error("Failed to summarize note");
  return await response.text(); // Returns plain text
}

// Assign selected tags to a note
export async function assignTags(
  noteId: string,
  tags: string[]
): Promise<void> {
  const response = await fetch(`${API_URL}/${noteId}/tags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tags),
  });
  if (!response.ok) throw new Error("Failed to assign tags");
}
