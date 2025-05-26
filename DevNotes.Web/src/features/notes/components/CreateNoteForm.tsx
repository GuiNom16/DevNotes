import React, { useState, useEffect } from "react";
import type { NoteCreateDTO, NoteDTO, NoteUpdateDTO } from "../types";

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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    } else {
      setTitle("");
      setContent("");
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
      setTitle("");
      setContent("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="mt-8 text-2xl font-semibold mb-4 text-center">
        Create/Update Note
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-full mx-auto p-8 rounded-lg shadow-lg bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-gray-100"
      >
        <input
          type="text"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded border border-zinc-300 text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-gray-100 dark:placeholder-gray-400"
        />
        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full h-48 p-3 rounded border border-zinc-300 text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none dark:border-zinc-600 dark:bg-zinc-900 dark:text-gray-100 dark:placeholder-gray-400"
        />
        <div className="mt-6 flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded transition disabled:opacity-50 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-600"
          >
            {loading
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
              ? "Update Note"
              : "Create Note"}
          </button>
          {isEditing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-6 py-2 border border-zinc-300 text-gray-800 rounded hover:bg-zinc-100 transition disabled:opacity-50 dark:border-zinc-600 dark:text-gray-200 dark:hover:bg-zinc-700"
            >
              Cancel
            </button>
          )}
        </div>
        {error && (
          <p className="mt-4 text-red-500 dark:text-red-400">{error}</p>
        )}
      </form>
    </>
  );
};

export default CreateNoteForm;
