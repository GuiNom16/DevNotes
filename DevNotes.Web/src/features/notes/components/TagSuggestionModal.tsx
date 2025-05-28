import React, { useState } from "react";

interface TagSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestedTags: string[];
  onAddSelected: (tags: string[]) => void;
}

const TagSuggestionModal: React.FC<TagSuggestionModalProps> = ({
  isOpen,
  onClose,
  suggestedTags,
  onAddSelected,
}) => {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const copy = new Set(prev);
      if (copy.has(tag)) {
        copy.delete(tag);
      } else {
        copy.add(tag);
      }
      return copy;
    });
  };

  const handleAddClick = () => {
    onAddSelected(Array.from(selectedTags));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Suggested Tags
        </h3>
        {suggestedTags.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No tags suggested.</p>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full border cursor-pointer select-none
                  ${
                    selectedTags.has(tag)
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-gray-200 text-gray-800 border-gray-300 dark:bg-zinc-700 dark:text-gray-300 dark:border-zinc-600"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >
            Cancel
          </button>
          <button
            disabled={selectedTags.size === 0}
            onClick={handleAddClick}
            className={`px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-50`}
          >
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagSuggestionModal;
