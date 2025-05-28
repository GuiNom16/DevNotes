import React, { useEffect, useState } from "react";
import type { NoteDTO, NoteCreateDTO, NoteUpdateDTO } from "../types";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
  suggestTags,
  assignTags,
} from "../api";
import NotesList from "./NotesList";
import CreateNoteForm from "./CreateNoteForm";

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<NoteDTO | null>(null);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [tagLoading, setTagLoading] = useState(false);
  const [tagError, setTagError] = useState<string | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (note: NoteCreateDTO) => {
    try {
      await createNote(note);
      await loadNotes();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleUpdateNote = async (note: NoteUpdateDTO) => {
    try {
      await updateNote(note);
      setEditingNote(null);
      await loadNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      await loadNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEditClick = (note: NoteDTO) => {
    setEditingNote(note);
    setSuggestedTags([]);
    setTagError(null);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setSuggestedTags([]);
    setTagError(null);
  };

  // New: Fetch suggested tags for the note
  const handleSuggestTags = async (noteId: string): Promise<string[]> => {
    setTagLoading(true);
    setTagError(null);
    try {
      const tags = await suggestTags(noteId);
      setSuggestedTags(tags);
      return tags; // <-- Return the tags here!
    } catch (error) {
      console.error("Error suggesting tags:", error);
      setTagError("Failed to fetch suggested tags");
      return []; // Return empty array on error to satisfy return type
    } finally {
      setTagLoading(false);
    }
  };

  // New: Assign selected tags to a note
  const handleAssignTags = async (noteId: string, tags: string[]) => {
    try {
      await assignTags(noteId, tags);
      await loadNotes();
      setSuggestedTags([]);
    } catch (error) {
      console.error("Error assigning tags:", error);
      setTagError("Failed to assign tags");
    }
  };

  return (
    <div>
      <CreateNoteForm
        onCreate={handleCreateNote}
        onUpdate={handleUpdateNote}
        initialData={editingNote ?? undefined}
        isEditing={!!editingNote}
        onCancel={handleCancelEdit}
        onSuggestTags={
          editingNote ? () => handleSuggestTags(editingNote.content) : undefined
        }
        suggestedTags={suggestedTags}
        onAssignTags={(tags: string[]) =>
          editingNote && handleAssignTags(editingNote.id, tags)
        }
        tagLoading={tagLoading}
        tagError={tagError}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <NotesList
          notes={notes}
          onEdit={handleEditClick}
          onDelete={handleDeleteNote}
        />
      )}
    </div>
  );
};

export default NotesPage;
