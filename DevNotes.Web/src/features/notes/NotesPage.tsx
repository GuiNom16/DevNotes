import React, { useEffect, useState } from 'react';
import type { NoteDTO } from './types';
import { fetchNotes, createNote } from './api';
import NotesList from './NotesList';
import CreateNoteForm from './CreateNoteForm';

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteDTO[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleCreateNote = async (title: string, content: string) => {
    try {
      const newNote = await createNote({ title, content });
      setNotes((prev) => [newNote, ...prev]);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  return (
    <div>
      <h1>DevNotes</h1>
      <CreateNoteForm onCreate={handleCreateNote} />
      {loading ? <p>Loading...</p> : <NotesList notes={notes} />}
    </div>
  );
};

export default NotesPage;
