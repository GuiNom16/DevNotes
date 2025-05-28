import React from "react";
import { X, Check, Loader } from "lucide-react";

interface SummaryPanelProps {
  isOpen: boolean;
  summary: string;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onAccept: () => void;
  onChangeSummary: (newSummary: string) => void;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({
  isOpen,
  summary,
  loading,
  error,
  onClose,
  onAccept,
  onChangeSummary,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-gray-100 text-gray-900 shadow-lg transform transition-transform duration-300 z-50 dark:bg-zinc-900 dark:text-gray-100 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 bg-indigo-500 border-b text-white border-gray-300 dark:border-zinc-700">
        <h2 className="text-lg font-semibold">AI Summary</h2>
        <button
          onClick={onClose}
          className="hover:text-red-600 dark:hover:text-red-400 transition"
        >
          <X />
        </button>
      </div>
      <div className="p-4 flex flex-col h-[calc(100%-3.5rem)]">
        {loading ? (
          <div className="flex items-center justify-center flex-1">
            <Loader className="animate-spin text-amber-600 dark:text-amber-500" />
          </div>
        ) : error ? (
          <p className="text-red-600 dark:text-red-500">{error}</p>
        ) : (
          <textarea
            value={summary}
            onChange={(e) => onChangeSummary(e.target.value)}
            className="flex-1 p-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none dark:bg-zinc-800 dark:border-zinc-600 dark:focus:ring-amber-500"
          />
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onAccept}
            disabled={loading || !summary}
            className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 transition disabled:opacity-50 dark:bg-green-600 dark:hover:bg-green-700"
          >
            <Check size={16} className="inline mr-1" />
            Accept
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition dark:border-zinc-600 dark:hover:bg-zinc-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;
