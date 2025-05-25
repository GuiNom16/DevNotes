import React, { useEffect, useState } from 'react';
import type { NoteDTO, NoteCreateDTO, NoteUpdateDTO } from '../types';
import { fetchNotes, createNote, updateNote, deleteNote } from '../api';
import NotesList from './NotesList';
import CreateNoteForm from './CreateNoteForm';

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<NoteDTO | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (note: NoteCreateDTO) => {
    try {
      await createNote(note);
      await loadNotes();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleUpdateNote = async (note: NoteUpdateDTO) => {
    try {
      await updateNote(note);
      setEditingNote(null);
      await loadNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      await loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEditClick = (note: NoteDTO) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div>
      <h1>DevNotes</h1>
      <CreateNoteForm
        onCreate={handleCreateNote}
        onUpdate={handleUpdateNote}
        initialData={editingNote ?? undefined}
        isEditing={!!editingNote}
        onCancel={handleCancelEdit}
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
