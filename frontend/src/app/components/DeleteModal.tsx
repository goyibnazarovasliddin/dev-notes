/**
 * src/app/components/DeleteModal.tsx
 * Purpose: Modal dialog to confirm note deletion.
 * Connected Files:
 * - src/app/App.tsx (Parent component)
 */
import { X } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  noteTitle: string;
}

export function DeleteModal({ isOpen, onClose, onConfirm, noteTitle }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f1e] rounded-lg border border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.2)] w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-red-500/20">
          <h2 className="text-red-400 font-mono">// CONFIRM DELETE</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-400 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-300 mb-2">
            Are you sure you want to delete this note?
          </p>
          <p className="text-[#00ff9c] font-mono text-sm">
            "{noteTitle}"
          </p>
          <p className="text-gray-500 text-sm mt-4">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-red-500/20">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-transparent border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white transition-all font-mono"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded bg-red-500 text-white hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all font-mono"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
