import React from 'react';
import type { NoteDTO } from '../types';

interface NotesListProps {
  notes: NoteDTO[];
  onEdit: (note: NoteDTO) => void;
  onDelete: (id: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) return <p>No notes found.</p>;

  return (
    <div>
      <h2>Your Notes</h2>
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            border: '1px solid #ccc',
            margin: '1rem 0',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <small>Created at: {new Date(note.createdAt).toLocaleString()}</small>
          <div style={{ marginTop: '0.5rem' }}>
            <button onClick={() => onEdit(note)} style={{ marginRight: '1rem' }}>
              Edit
            </button>
            <button onClick={() => onDelete(note.id)} style={{ color: 'red' }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
