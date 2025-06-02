import React, { useState, useEffect, useRef } from "react";

interface TagSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestedTags: string[];
  allTags: string[];
  selectedTags: string[]; // passed from parent (already selected tags)
  onAddSelected: (tags: string[]) => void;
}

const TagSuggestionModal: React.FC<TagSuggestionModalProps> = ({
  isOpen,
  onClose,
  suggestedTags,
  allTags,
  selectedTags,
  onAddSelected,
}) => {
  const [internalSelectedTags, setInternalSelectedTags] = useState<Set<string>>(
    new Set()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // When modal opens, preload selected tags
  useEffect(() => {
    if (isOpen) {
      setInternalSelectedTags(new Set(selectedTags));
    } else {
      setInternalSelectedTags(new Set());
      setSearchTerm("");
      setShowDropdown(false);
    }
  }, [isOpen, selectedTags]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setInternalSelectedTags((prev) => {
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
    // Only send tags that weren't already selected
    const newTags = Array.from(internalSelectedTags).filter(
      (tag) => !selectedTags.includes(tag)
    );
    onAddSelected(newTags);
    onClose();
  };

  const filteredDropdownTags = allTags.filter(
    (tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !internalSelectedTags.has(tag)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={containerRef}
        className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Suggested Tags
        </h3>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search or select tags..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="mb-2 w-full p-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100"
          />

          {/* Dropdown */}
          {showDropdown && filteredDropdownTags.length > 0 && (
            <ul className="absolute z-10 w-full max-h-48 overflow-auto bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded shadow">
              {filteredDropdownTags.map((tag) => (
                <li
                  key={tag}
                  onClick={() => {
                    toggleTag(tag);
                    setSearchTerm("");
                    setShowDropdown(false);
                  }}
                  className="cursor-pointer px-3 py-2 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Suggested + Selected Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            ...new Set([...suggestedTags, ...Array.from(internalSelectedTags)]),
          ].map((tag) => {
            const isSelected = internalSelectedTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full border cursor-pointer select-none ${
                  isSelected
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-gray-200 text-gray-800 border-gray-300 dark:bg-zinc-700 dark:text-gray-300 dark:border-zinc-600"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >
            Cancel
          </button>
          <button
            disabled={
              Array.from(internalSelectedTags).filter(
                (t) => !selectedTags.includes(t)
              ).length === 0
            }
            onClick={handleAddClick}
            className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-50"
          >
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagSuggestionModal;
