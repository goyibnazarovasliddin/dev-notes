/**
 * src/app/components/RichTextEditor.tsx
 * Purpose: Reusable rich text editor component.
 * Connected Files:
 * - src/app/components/NoteModal.tsx (Used in modal)
 */
import { useRef, useEffect } from "react";
import { Bold, Italic, Underline, Heading, List, ListOrdered, Code } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder = "Write your note..." }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const formatButtons = [
    { icon: Bold, command: "bold", label: "Bold (Ctrl+B)" },
    { icon: Italic, command: "italic", label: "Italic (Ctrl+I)" },
    { icon: Underline, command: "underline", label: "Underline (Ctrl+U)" },
    { icon: Code, command: "formatBlock", value: "pre", label: "Code Block" },
    { icon: Heading, command: "formatBlock", value: "h2", label: "Heading" },
    { icon: List, command: "insertUnorderedList", label: "Bullet List" },
    { icon: ListOrdered, command: "insertOrderedList", label: "Numbered List" },
  ];

  return (
    <div className="border border-[#00ff9c]/30 rounded bg-[#0b0f0e] focus-within:border-[#00ff9c] focus-within:ring-2 focus-within:ring-[#00ff9c]/20 transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-[#00ff9c]/20 bg-[#1a1f1e]/50">
        {formatButtons.map(({ icon: Icon, command, value, label }) => (
          <button
            key={command + (value || "")}
            type="button"
            onClick={() => applyFormat(command, value)}
            className="p-2 rounded hover:bg-[#00ff9c]/10 text-[#00ff9c]/60 hover:text-[#00ff9c] transition-colors"
            title={label}
            aria-label={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[300px] max-h-[500px] overflow-y-auto p-4 text-white font-mono text-sm focus:outline-none prose prose-invert max-w-none"
        data-placeholder={placeholder}
        style={{
          caretColor: "#00ff9c",
        }}
        suppressContentEditableWarning
      />

      <style>{`
        [contentEditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: rgb(75, 85, 99);
          pointer-events: none;
        }
        
        [contentEditable] h2 {
          font-size: 1.5em;
          font-weight: 600;
          color: #00ff9c;
          margin: 1em 0 0.5em 0;
        }
        
        [contentEditable] strong {
          font-weight: 700;
          color: #00ff9c;
        }
        
        [contentEditable] em {
          font-style: italic;
          color: #22d3ee;
        }
        
        [contentEditable] u {
          text-decoration: underline;
          text-decoration-color: #00ff9c;
        }
        
        [contentEditable] pre {
          background: #000000;
          border: 1px solid #00ff9c33;
          border-radius: 0.375rem;
          padding: 1rem;
          overflow-x: auto;
          margin: 1em 0;
          color: #22d3ee;
        }
        
        [contentEditable] ul, [contentEditable] ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        [contentEditable] li {
          margin: 0.5em 0;
        }
        
        [contentEditable] ul li::marker {
          color: #00ff9c;
        }
        
        [contentEditable] ol li::marker {
          color: #00ff9c;
        }
      `}</style>
    </div>
  );
}
