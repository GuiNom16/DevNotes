import React, { useState, useMemo } from "react";
import type { NoteDTO } from "../../../../types";

interface NotesListProps {
  notes: NoteDTO[];
  onEdit: (note: NoteDTO) => void;
  onDelete: (id: string) => void;
  formRef?: React.RefObject<HTMLDivElement>;
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  onEdit,
  onDelete,
  formRef,
}) => {
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
    "w-full p-2 rounded mb-6 border placeholder-gray-500 " +
    "bg-white text-black border-gray-300 " +
    "dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-600 dark:placeholder-gray-400";

  return (
    <div className="mt-10 max-w-4xl mx-auto px-4">
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

      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Your Notes
      </h2>

      {filteredNotes.length === 0 ? (
        <p className="text-red-600 dark:text-red-400 text-center">
          No notes found.
        </p>
      ) : (
        <>
          <div className="grid gap-6">
            {paginatedNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold truncate mb-2 text-indigo-700 dark:text-cyan-400">
                    {note.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-base whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {note.content}
                  </p>

                  {note.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {note.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-indigo-100 text-indigo-700 dark:bg-cyan-900 dark:text-cyan-200 text-sm px-3 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-4">
                  <small className="text-sm text-gray-500 dark:text-gray-400">
                    Created: {new Date(note.createdAt).toLocaleString()}
                  </small>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        onEdit(note);
                        formRef?.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      className="px-5 py-2 rounded-md transition bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(note.id)}
                      className="px-4 py-2 rounded-md transition bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-8 gap-4 text-gray-800 dark:text-gray-200">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700 disabled:opacity-50"
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
