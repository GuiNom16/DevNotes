// CreateNoteForm.tsx
import React, { useState } from 'react';

interface CreateNoteFormProps {
  onCreate: (title: string, content: string) => void | Promise<void>;
}

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    await onCreate(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default CreateNoteForm;
