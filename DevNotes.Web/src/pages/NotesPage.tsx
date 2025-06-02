import React, { useEffect, useRef, useState } from "react";
import type { NoteDTO, NoteCreateDTO, NoteUpdateDTO } from "../types";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
  suggestTags,
  assignTags,
  removeTag,
  beautifyNoteContent,
  fetchTags,
} from "../features/notes/api";
import NotesList from "../features/notes/components/NotesList/NotesList";
import CreateNoteForm from "../features/notes/components/CreateNoteForm/CreateNoteForm";
import ConfirmModal from "../shared/ConfirmModal"; // Import this near the top
import FullScreenSpinner from "../shared/FullScreenSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<NoteDTO | null>(null);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [tagLoading, setTagLoading] = useState(false);
  const [tagError, setTagError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    loadNotes();
    loadTags();
  }, []);

  // Scroll to form when editingNote changes to non-null
  useEffect(() => {
    if (editingNote && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      // Optionally, focus first input inside form here if you want
    }
  }, [editingNote]);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await fetchNotes();
      setNotes(data);
      // Optionally show success toast here if you want feedback on loading
      // toast.success("Notes loaded successfully");
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const tags = await fetchTags();
      setAvailableTags(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast.error("Failed to load tags");
    }
  };

  const handleCreateNote = async (note: NoteCreateDTO): Promise<NoteDTO> => {
    try {
      const newNote = await createNote(note);
      setEditingNote(newNote);
      await loadNotes();
      toast.success("Note created successfully");
      return newNote;
    } catch (error) {
      toast.error("Failed to create note");
      throw error; // Re-throw so caller knows
    }
  };

  const handleUpdateNote = async (note: NoteUpdateDTO): Promise<NoteDTO> => {
    try {
      const updatedNote = await updateNote(note);
      setEditingNote(updatedNote);
      await loadNotes();
      toast.success("Note updated successfully");
      return updatedNote;
    } catch (error) {
      toast.error("Failed to update note");
      throw error;
    }
  };

  const handleDeleteNote = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteNote(confirmDeleteId);
      await loadNotes();
      if (editingNote?.id === confirmDeleteId) {
        setEditingNote(null);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setConfirmDeleteId(null); // Close modal
    }
  };

  const requestDeleteNote = (id: string) => {
    setConfirmDeleteId(id);
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
    // No scroll needed here when canceling edit
  };

  const handleSuggestTags = async (noteContent: string): Promise<string[]> => {
    setTagLoading(true);
    setTagError(null);
    try {
      const tags = await suggestTags(noteContent);
      setSuggestedTags(tags);
      return tags;
    } catch (error) {
      console.error("Error suggesting tags:", error);
      toast.error("Error suggesting tags");
      setTagError("Failed to fetch suggested tags");
      return [];
    } finally {
      setTagLoading(false);
    }
  };

  // const handleAssignTags = async (noteId: string, newTags: string[]) => {
  //   try {
  //     setEditingNote(
  //       (prev) =>
  //         ({
  //           ...(prev ?? {}),
  //           tags: newTags,
  //         } as NoteDTO)
  //     );

  //     await assignTags(noteId, newTags);
  //     await loadNotes();
  //     setSuggestedTags([]);
  //   } catch (error) {
  //     console.error("Error assigning tags:", error);
  //     toast.error("Error assigning tags:");
  //     setTagError("Failed to assign tags");
  //   }
  // };

  const handleAssignTags = async (noteId: string, newTags: string[]) => {
    try {
      setEditingNote((prev) => {
        const existingTags = prev?.tags ?? [];
        const mergedTags = Array.from(new Set([...existingTags, ...newTags])); // merge & deduplicate

        return {
          ...(prev ?? {}),
          tags: mergedTags,
        } as NoteDTO;
      });

      const allTags = Array.from(
        new Set([...(editingNote?.tags ?? []), ...newTags])
      );

      await assignTags(noteId, allTags);
      await loadNotes();
      setSuggestedTags([]);
    } catch (error) {
      console.error("Error assigning tags:", error);
      toast.error("Error assigning tags");
      setTagError("Failed to assign tags");
    }
  };

  const handleRemoveTag = async (noteId: string, tagToRemove: string) => {
    try {
      // Optimistically update UI by removing tag from editingNote if editing the same note
      if (editingNote && editingNote.id === noteId) {
        setEditingNote(
          (prev) =>
            ({
              ...(prev ?? {}),
              tags: editingNote.tags.filter((tag) => tag !== tagToRemove),
            } as NoteDTO)
        );
      }

      await removeTag(noteId, tagToRemove);
      await loadNotes();
    } catch (error) {
      console.error("Failed to remove tag:", error);
      toast.error("Failed to remove tag");
    }
  };

  const handleBeautifyNote = async (): Promise<string> => {
    if (!editingNote) throw new Error("No note to beautify");

    try {
      const beautified = await beautifyNoteContent(editingNote.content);
      setEditingNote({
        ...editingNote,
        content: beautified,
      });
      toast.success("Note beautified");
      return beautified;
    } catch (error) {
      console.error("Failed to beautify note:", error);
      toast.error("Failed to beautify note");
      throw error;
    }
  };

  return (
    <div>
      <div ref={formRef}>
        <CreateNoteForm
          onCreate={handleCreateNote}
          onUpdate={handleUpdateNote}
          initialData={editingNote ?? undefined}
          isEditing={!!editingNote}
          onCancel={handleCancelEdit}
          onBeautify={handleBeautifyNote}
          onSuggestTags={
            editingNote
              ? () => handleSuggestTags(editingNote.content)
              : undefined
          }
          suggestedTags={suggestedTags}
          onAssignTags={(tags: string[]) =>
            editingNote && handleAssignTags(editingNote.id, tags)
          }
          onRemoveTag={(tag) =>
            editingNote && handleRemoveTag(editingNote.id, tag)
          }
          tagLoading={tagLoading}
          tagError={tagError}
          allExistingTags={availableTags}
        />
      </div>
      {loading ? (
        <FullScreenSpinner />
      ) : (
        <NotesList
          notes={notes}
          onEdit={handleEditClick}
          onDelete={requestDeleteNote}
        />
      )}

      <ConfirmModal
        isOpen={!!confirmDeleteId}
        onConfirm={handleDeleteNote}
        onCancel={() => setConfirmDeleteId(null)}
        message="Are you sure you want to delete this note?"
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default NotesPage;
