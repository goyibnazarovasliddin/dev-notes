/**
 * src/app/components/NoteCard.tsx
 * Purpose: Displays a single note summary in the list view. Handles preview formatting.
 * Connected Files:
 * - src/app/App.tsx (Parent component)
 */
import { Pencil, Trash2 } from "lucide-react";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  date: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
}

export function NoteCard({ id, title, content, date, onEdit, onDelete, onClick }: NoteCardProps) {
  // Strip HTML tags for preview
  // Extract and render the first meaningful block of HTML
  const getFirstBlockHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const children = Array.from(tmp.children);
    // Find the first element that actually contains text
    const firstContentBlock = children.find(child => child.textContent?.trim());

    if (firstContentBlock) {
      // Return the block as HTML
      return firstContentBlock.outerHTML;
    }
    // Fallback for plain text or single line content
    return html;
  };

  return (
    <div
      onClick={() => onClick(id)}
      className="bg-[#1a1f1e] rounded-lg p-6 border border-[#00ff9c]/20 hover:border-[#00ff9c] hover:shadow-[0_0_20px_rgba(0,255,156,0.15)] transition-all duration-300 group cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[#00ff9c] font-mono truncate pr-2">{title}</h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
            className="text-[#00ff9c]/60 hover:text-[#00ff9c] transition-colors"
            aria-label="Edit note"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="text-red-400/60 hover:text-red-400 transition-colors"
            aria-label="Delete note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div
        className="prose prose-invert prose-sm max-w-none mb-4 text-sm line-clamp-1 [&>*]:m-0 [&>*]:inline"
        dangerouslySetInnerHTML={{ __html: getFirstBlockHtml(content) }}
      />
      <div className="text-[#00ff9c]/50 text-xs font-mono">{date}</div>
    </div>
  );
}