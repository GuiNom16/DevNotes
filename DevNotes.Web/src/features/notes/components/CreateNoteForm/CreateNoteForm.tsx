import React from "react";
import SummaryPanel from "../SummaryPanel/SummaryPanel";
import type { NoteCreateDTO, NoteDTO, NoteUpdateDTO } from "../../../../types";
import TagSuggestionModal from "../TagSuggestionModal/TagSuggestionModal";
import { useNoteForm } from "../../../../hooks/useNoteForm";

interface CreateNoteFormProps {
  onCreate: (note: NoteCreateDTO) => Promise<NoteDTO>;
  onUpdate?: (note: NoteUpdateDTO) => Promise<NoteDTO>;
  initialData?: NoteDTO;
  isEditing?: boolean;
  onCancel?: () => void;
  onBeautify?: () => Promise<string>;
  onSuggestTags?: () => Promise<string[]>;
  suggestedTags?: string[];
  onAssignTags?: (tags: string[]) => void;
  onRemoveTag?: (tag: string) => void;
  tagLoading?: boolean;
  tagError?: string | null;
  allExistingTags: string[];
}

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({
  onCreate,
  onUpdate,
  initialData,
  isEditing = false,
  onCancel,
  onBeautify,
  onSuggestTags,
  onAssignTags,
  onRemoveTag,
  tagLoading,
  tagError,
  allExistingTags,
}) => {
  const {
    title,
    setTitle,
    content,
    setContent,
    tags,
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
  } = useNoteForm({
    initialData,
    onCreate,
    onUpdate,
    isEditing,
    onSuggestTags,
    onAssignTags,
  });

  return (
    <>
      <h2 className="mt-8 text-2xl font-semibold mb-4 text-center">
        Create/Update Note
      </h2>
      <form
        onSubmit={handleSubmit}
        data-testid="note-form"
        className="w-full max-w-7xl mx-auto p-10 rounded-lg shadow-2xl
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
             dark:border-zinc-600 dark:bg-zinc-900 dark:text-gray-100 dark:placeholder-gray-400
             text-xl font-bold"
        />

        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full h-124 p-3 rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-500
             focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none
             dark:border-zinc-600 dark:bg-zinc-900 dark:text-gray-100 dark:placeholder-gray-400"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {content.length} characters
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center bg-amber-500 text-amber-900 dark:bg-amber-400 dark:text-amber-900 px-2 py-0.5 rounded-full text-sm select-none"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemoveTag && onRemoveTag(tag)} // Use prop callback here
                className="ml-2 text-amber-900 dark:text-amber-900 hover:text-amber-700 dark:hover:text-amber-600
                 font-bold rounded-full focus:outline-none focus:ring-1 focus:ring-amber-700"
                aria-label={`Remove tag ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading || Boolean(localIsEditing && isUnchanged)}
            aria-label={localIsEditing ? "Update Note" : "Create Note"}
            className="px-6 py-2 rounded transition disabled:opacity-50
           bg-amber-500 hover:bg-amber-600 text-white
           dark:bg-amber-600 dark:hover:bg-amber-700"
          >
            {loading
              ? localIsEditing
                ? "Updating..."
                : "Creating..."
              : localIsEditing
              ? "Update Note"
              : "Create Note"}
          </button>

          {isEditing && onCancel && (
            <button
              type="button"
              data-testid="cancel-button"
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
            data-testid="summarize-button"
            onClick={handleSummarizeClick}
            disabled={summaryLoading}
            className="px-4 py-2 rounded transition disabled:opacity-50
               bg-indigo-500 hover:bg-indigo-600 text-white
               dark:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            🧠 {summaryLoading ? "Summarizing..." : "Summarize"}
          </button>

          <button
            type="button"
            onClick={async () => {
              if (onBeautify) {
                setBeautifyLoading(true);
                try {
                  const newContent = await onBeautify();
                  setContent(newContent);
                } catch (err) {
                  console.log("Error: ", err);
                } finally {
                  setBeautifyLoading(false);
                }
              }
            }}
            disabled={!onBeautify || beautifyLoading}
            className="px-4 py-2 rounded transition disabled:opacity-50
     bg-purple-600 hover:bg-purple-700 text-white
     dark:bg-purple-700 dark:hover:bg-purple-800"
          >
            ✨ {beautifyLoading ? "Beautifying..." : "Beautify"}
          </button>

          <button
            type="button"
            onClick={handleAddTagClick}
            disabled={tagLoading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
          >
            🏷️ {tagLoading ? "Loading Tags..." : "Add Tag"}
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
        allTags={allExistingTags}
        selectedTags={tags}
        onAddSelected={(selectedTags) => {
          addTags(selectedTags);
          setIsTagModalOpen(false);
        }}
      />
    </>
  );
};

export default CreateNoteForm;
