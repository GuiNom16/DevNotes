import React, { useState, useEffect } from 'react';
import { createNote, updateNote } from '../api';
import type { NoteCreateDTO, NoteDTO, NoteUpdateDTO } from '../types';

interface CreateNoteFormProps {
  onCreate: (note: NoteCreateDTO) => void;
  onUpdate?: (note: NoteUpdateDTO) => void;
  initialData?: NoteDTO;
  isEditing?: boolean;
  onCancel?: () => void;
}

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({
  onCreate,
  onUpdate,
  initialData,
  isEditing = false,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing && onUpdate && initialData) {
        await onUpdate({ id: initialData.id, title, content });
      } else {
        await onCreate({ title, content });
      }
      setTitle('');
      setContent('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? (isEditing ? 'Updating...' : 'Creating...') : isEditing ? 'Update Note' : 'Create Note'}
      </button>
      {isEditing && onCancel && (
        <button type="button" onClick={onCancel} disabled={loading} style={{ marginLeft: '8px' }}>
          Cancel
        </button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default CreateNoteForm;
