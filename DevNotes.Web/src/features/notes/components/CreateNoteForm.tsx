import React, { useState, useEffect } from "react";
import SummaryPanel from "./SummaryPanel";
import type { NoteCreateDTO, NoteDTO, NoteUpdateDTO } from "../types";
import TagSuggestionModal from "./TagSuggestionModal";

interface CreateNoteFormProps {
  onCreate: (note: NoteCreateDTO) => void;
  onUpdate?: (note: NoteUpdateDTO) => void;
  initialData?: NoteDTO;
  isEditing?: boolean;
  onCancel?: () => void;
  onSuggestTags?: () => Promise<string[]>; // new prop to fetch suggested tags
  suggestedTags?: string[]; // optional pre-fetched tags (not used here but kept for completeness)
  onAssignTags?: (tags: string[]) => void; // assign tags to note
  tagLoading?: boolean;
  tagError?: string | null;
}

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({
  onCreate,
  onUpdate,
  initialData,
  isEditing = false,
  onCancel,
  onSuggestTags,
  onAssignTags,
  tagLoading,
  tagError,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tags state
  const [tags, setTags] = useState<string[]>([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [modalSuggestedTags, setModalSuggestedTags] = useState<string[]>([]);

  // Summary panel states (unchanged)
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing && onUpdate && initialData) {
        await onUpdate({ id: initialData.id, title, content, tags });
      } else {
        await onCreate({ title, content, tags });
      }
      setTitle("");
      setContent("");
      setTags([]);
    } catch (err) {
      setError((err as Error).message);
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

  return (
    <>
      <h2 className="mt-8 text-2xl font-semibold mb-4 text-center">
        Create/Update Note
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-full mx-auto p-8 rounded-lg shadow-lg
                   bg-gray-100 text-gray-900
                   dark:bg-zinc-800 dark:text-gray-100 relative"
      >
        <input
          type="text"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-amber-500
                     dark:border-zinc-600 dark:bg-zinc-900 dark:text-gray-100 dark:placeholder-gray-400"
        />
        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full h-48 p-3 rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none
                     dark:border-zinc-600 dark:bg-zinc-900 dark:text-gray-100 dark:placeholder-gray-400"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-amber-500 text-amber-900 dark:bg-amber-400 dark:text-amber-900 px-2 py-0.5 rounded-full text-sm select-none"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded transition disabled:opacity-50
                       bg-amber-500 hover:bg-amber-600 text-white
                       dark:bg-amber-600 dark:hover:bg-amber-700"
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
              className="px-6 py-2 rounded transition disabled:opacity-50
                         border border-gray-300 text-gray-700 hover:bg-gray-200
                         dark:border-zinc-600 dark:text-gray-200 dark:hover:bg-zinc-700"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSummarizeClick}
            disabled={summaryLoading}
            className="px-4 py-2 rounded transition disabled:opacity-50
                       bg-indigo-500 hover:bg-indigo-600 text-white
                       dark:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            {summaryLoading ? "Summarizing..." : "Summarize"}
          </button>
          <button
            type="button"
            onClick={handleAddTagClick}
            disabled={tagLoading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
          >
            {tagLoading ? "Loading Tags..." : "Add Tag"}
          </button>
        </div>
        {error && (
          <p className="mt-4 text-red-600 dark:text-red-400 font-medium">
            {error}
          </p>
        )}
        {tagError && (
          <p className="mt-2 text-red-600 dark:text-red-400 font-medium">
            {tagError}
          </p>
        )}
      </form>

      <SummaryPanel
        isOpen={isSummaryOpen}
        summary={summary}
        loading={summaryLoading}
        error={summaryError}
        onClose={() => setIsSummaryOpen(false)}
        onAccept={handleAcceptSummary}
        onChangeSummary={setSummary}
      />

      <TagSuggestionModal
        isOpen={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
        suggestedTags={modalSuggestedTags}
        onAddSelected={(selectedTags) => {
          addTags(selectedTags);
          setIsTagModalOpen(false);
        }}
      />
    </>
  );
};

export default CreateNoteForm;
