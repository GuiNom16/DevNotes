import { useState, useEffect } from "react";
import { NoteDTO, NoteCreateDTO, NoteUpdateDTO } from "../types";

interface UseNoteFormProps {
  onCreate: (note: NoteCreateDTO) => Promise<NoteDTO>;
  onUpdate?: (note: NoteUpdateDTO) => Promise<NoteDTO>;
  initialData?: NoteDTO;
  isEditing?: boolean;
  onSuggestTags?: () => Promise<string[]>;
  onAssignTags?: (tags: string[]) => void;
}

export const useNoteForm = ({
  onCreate,
  onUpdate,
  initialData,
  isEditing = false,
  onSuggestTags,
  onAssignTags,
}: UseNoteFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [beautifyLoading, setBeautifyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tags state
  const [tags, setTags] = useState<string[]>([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [modalSuggestedTags, setModalSuggestedTags] = useState<string[]>([]);

  // Summary panel states
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setTags(initialData.tags ?? []);
    } else {
      setTitle("");
      setContent("");
      setTags([]);
    }
  }, [initialData]);

  // Generate summary (unchanged)
  const generateSummary = async (text: string) => {
    setSummaryLoading(true);
    setSummaryError(null);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      const fakeSummary = text.length > 100 ? text.slice(0, 100) + "..." : text;
      setSummary(fakeSummary);
    } catch (e) {
      setSummaryError("Failed to generate summary. Please try again.");
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleSummarizeClick = () => {
    setIsSummaryOpen(true);
    generateSummary(content);
  };

  const handleAcceptSummary = () => {
    setContent(summary);
    setIsSummaryOpen(false);
  };

  // Submit handler (unchanged)
  const [localIsEditing, setLocalIsEditing] = useState(isEditing);
  const [lastSavedNote, setLastSavedNote] = useState<NoteDTO | null>(
    initialData ?? null
  );

  useEffect(() => {
    setLocalIsEditing(isEditing);
  }, [isEditing]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (localIsEditing && onUpdate && initialData) {
        const updatedNote = await onUpdate({
          id: initialData.id,
          title,
          content,
          tags,
        });
        setTitle(updatedNote.title);
        setContent(updatedNote.content);
        setTags(updatedNote.tags ?? []);
        setLastSavedNote(updatedNote); // ⬅️ Track last saved state
        setLocalIsEditing(true);
      } else {
        const createdNote = await onCreate({ title, content, tags });
        setTitle(createdNote.title);
        setContent(createdNote.content);

        setTags(createdNote.tags ?? []);
        setLastSavedNote(createdNote); // ⬅️ Track newly created note
        setLocalIsEditing(true); // ⬅️ Switch to edit mode
      }
    } catch (err: any) {
      setError(err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Add tags helper (local update + propagate)
  const addTags = (newTags: string[]) => {
    setTags((prev) => {
      const setPrev = new Set(prev);
      newTags.forEach((t) => setPrev.add(t));
      return Array.from(setPrev);
    });

    // Also call onAssignTags if editing and prop is provided
    if (isEditing && onAssignTags) {
      onAssignTags(newTags);
    }
  };

  // New handler for Add Tag button click
  const handleAddTagClick = async () => {
    if (onSuggestTags) {
      try {
        const suggested = await onSuggestTags();
        setModalSuggestedTags(suggested);
      } catch {
        setModalSuggestedTags([]);
      }
    } else {
      // fallback: empty suggested tags
      setModalSuggestedTags([]);
    }
    setIsTagModalOpen(true);
  };

  const isUnchanged =
    localIsEditing &&
    lastSavedNote &&
    title === lastSavedNote.title &&
    content === lastSavedNote.content &&
    JSON.stringify(tags) === JSON.stringify(lastSavedNote.tags ?? []);

  return {
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    loading,
    error,
    localIsEditing,
    handleSubmit,
    addTags,
    isTagModalOpen,
    setIsTagModalOpen,
    modalSuggestedTags,
    handleAddTagClick,
    summary,
    setSummary,
    summaryLoading,
    summaryError,
    setIsSummaryOpen,
    isSummaryOpen,
    handleSummarizeClick,
    handleAcceptSummary,
    isUnchanged,
    beautifyLoading,
    setBeautifyLoading,
  };
};
