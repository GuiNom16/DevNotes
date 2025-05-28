import React, { useEffect, useState } from "react";
import { X, Check, Loader } from "lucide-react";

interface TagSuggestionModalProps {
  isOpen: boolean;
  noteContent: string;
  onClose: () => void;
  onAddTags: (tags: string[]) => void;
}

const TagSuggestionModal: React.FC<TagSuggestionModalProps> = ({
  isOpen,
  noteContent,
  onClose,
  onAddTags,
}) => {
  const [loading, setLoading] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchSuggestedTags();
    } else {
      setSuggestedTags([]);
      setSelectedTags(new Set());
      setError(null);
    }
  }, [isOpen]);

  const fetchSuggestedTags = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate AI call - replace with your actual API call
      await new Promise((r) => setTimeout(r, 1500));

      // Simple fake tags based on content length / words for demo
      const words = noteContent.split(/\s+/).filter(Boolean);
      const uniqueWords = Array.from(new Set(words));
      const fakeTags = uniqueWords.slice(0, 5).map((w) => w.toLowerCase());

      setSuggestedTags(fakeTags);
    } catch (e) {
      setError("Failed to fetch tags. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTagSelection = (tag: string) => {
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

  const handleAdd = () => {
    onAddTags(Array.from(selectedTags));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg w-96 max-w-full p-6 shadow-lg text-gray-900 dark:text-gray-100 flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Suggested Tags</h3>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center flex-1">
            <Loader className="animate-spin text-amber-500" size={24} />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : suggestedTags.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No tags suggested for the current note.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 overflow-auto max-h-[40vh] mb-4">
            {suggestedTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTagSelection(tag)}
                className={`px-3 py-1 rounded-full border transition ${
                  selectedTags.has(tag)
                    ? "bg-amber-600 border-amber-600 text-white"
                    : "border-gray-400 text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={handleAdd}
            disabled={selectedTags.size === 0}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
          >
            <Check size={16} className="inline mr-1" />
            Add Selected
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-400 dark:border-gray-600 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagSuggestionModal;
