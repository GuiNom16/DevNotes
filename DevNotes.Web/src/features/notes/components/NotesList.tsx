import React, { useState, useMemo } from "react";
import type { NoteDTO } from "../types";

interface NotesListProps {
  notes: NoteDTO[];
  onEdit: (note: NoteDTO) => void;
  onDelete: (id: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const notesPerPage = 5;

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, notes]);

  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const paginatedNotes = filteredNotes.slice(
    (page - 1) * notesPerPage,
    page * notesPerPage
  );

  const inputBaseClasses =
    "w-full p-2 rounded mb-4 border placeholder-gray-500 " +
    "bg-white text-black border-gray-300 " +
    "dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-600 dark:placeholder-gray-400";

  return (
    <div className="mt-8 max-w-3xl mx-auto px-4">
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className={inputBaseClasses}
      />

      <h2 className="text-2xl font-semibold mb-4 text-center">Your Notes</h2>

      {filteredNotes.length === 0 ? (
        <p className="text-red-600 dark:text-red-400 text-center">
          No notes found.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedNotes.map((note) => (
              <div
                key={note.id}
                className="bg-gray-100 border border-gray-300 text-black dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-700 rounded-lg p-6 shadow-md"
              >
                <h3 className="text-xl font-bold mb-2">{note.title}</h3>
                <p className="whitespace-pre-wrap mb-2">{note.content}</p>
                <small className="text-gray-600 dark:text-gray-400 block mb-4">
                  Created at: {new Date(note.createdAt).toLocaleString()}
                </small>
                <div className="flex gap-4">
                  <button
                    onClick={() => onEdit(note)}
                    className="px-6 py-2 rounded transition disabled:opacity-50 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(note.id)}
                    className="px-4 py-2 rounded transition text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NotesList;
