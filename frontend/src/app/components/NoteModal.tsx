/**
 * src/app/components/NoteModal.tsx
 * Purpose: Dialog for creating and editing notes.
 * Connected Files:
 * - src/app/components/RichTextEditor.tsx (Rich text input)
 * - src/app/App.tsx (Parent component)
 */
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  initialTitle?: string;
  initialContent?: string;
  mode: "create" | "edit";
}

export function NoteModal({
  isOpen,
  onClose,
  onSave,
  initialTitle = "",
  initialContent = "",
  mode
}: NoteModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave(title, content);
      setTitle("");
      setContent("");
    }
  };

  const handleClose = () => {
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f1e] rounded-lg border border-[#00ff9c]/30 shadow-[0_0_40px_rgba(0,255,156,0.2)] w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-[#00ff9c]/20">
          <h2 className="text-[#00ff9c] font-mono">
            {mode === "create" ? "// CREATE NEW NOTE" : "// EDIT NOTE"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-[#00ff9c] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="note-title" className="block text-[#00ff9c]/80 mb-2 font-mono text-sm">
              TITLE:
            </label>
            <input
              id="note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="w-full bg-[#0b0f0e] border border-[#00ff9c]/30 rounded px-4 py-3 text-white placeholder-gray-600 focus:border-[#00ff9c] focus:outline-none focus:ring-2 focus:ring-[#00ff9c]/20 font-mono"
            />
          </div>

          <div>
            <label htmlFor="note-content" className="block text-[#00ff9c]/80 mb-2 font-mono text-sm">
              CONTENT:
            </label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Write your note..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-[#00ff9c]/20">
          <button
            onClick={handleClose}
            className="px-6 py-2 rounded bg-transparent border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white transition-all font-mono"
          >
            CANCEL
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            className="px-6 py-2 rounded bg-[#00ff9c] text-black hover:bg-[#00ff9c]/90 hover:shadow-[0_0_20px_rgba(0,255,156,0.3)] transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}