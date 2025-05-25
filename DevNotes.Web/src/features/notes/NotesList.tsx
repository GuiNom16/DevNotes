import React from 'react';
import type { NoteDTO } from './types';

interface NotesListProps {
  notes: NoteDTO[];
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  if (notes.length === 0) return <p>No notes found.</p>;

  return (
    <div>
      <h2>Your Notes</h2>
      {notes.map((note) => (
        <div key={note.id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <small>Created at: {new Date(note.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
