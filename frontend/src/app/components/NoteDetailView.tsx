/**
 * src/app/components/NoteDetailView.tsx
 * Purpose: Displays full note content with rich text formatting.
 * Connected Files:
 * - src/app/App.tsx (Parent component)
 */
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

interface NoteDetailViewProps {
  id: string;
  title: string;
  content: string;
  date: string;
  onBack: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteDetailView({
  id,
  title,
  content,
  date,
  onBack,
  onEdit,
  onDelete
}: NoteDetailViewProps) {
  return (
    <div className="min-h-screen bg-[#0b0f0e]">
      {/* Header */}
      <div className="border-b border-[#00ff9c]/20 bg-[#0b0f0e]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#00ff9c] hover:text-[#00ff9c]/80 transition-colors font-mono"
            >
              <ArrowLeft className="w-5 h-5" />
              BACK
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => onEdit(id)}
                className="flex items-center gap-2 px-4 py-2 border border-[#00ff9c]/30 text-[#00ff9c] rounded hover:bg-[#00ff9c]/10 transition-all font-mono"
              >
                <Pencil className="w-4 h-4" />
                EDIT
              </button>
              <button
                onClick={() => onDelete(id)}
                className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 rounded hover:bg-red-500/10 transition-all font-mono"
              >
                <Trash2 className="w-4 h-4" />
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#1a1f1e] rounded-lg border border-[#00ff9c]/20 p-8 shadow-[0_0_30px_rgba(0,255,156,0.1)]">
          {/* Title */}
          <div className="mb-6 pb-6 border-b border-[#00ff9c]/10">
            <h1 className="text-[#00ff9c] font-mono mb-3">{title}</h1>
            <div className="text-[#00ff9c]/50 text-sm font-mono">
              Created: {date}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div
              className="text-gray-300 leading-relaxed font-mono text-sm rich-text-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm font-mono">
            // Press EDIT to modify or DELETE to remove this note
          </p>
        </div>
      </main>

      <style>{`
        .rich-text-content h2 {
          font-size: 1.5em;
          font-weight: 600;
          color: #00ff9c;
          margin: 1em 0 0.5em 0;
        }
        
        .rich-text-content strong {
          font-weight: 700;
          color: #00ff9c;
        }
        
        .rich-text-content em {
          font-style: italic;
          color: #22d3ee;
        }
        
        .rich-text-content u {
          text-decoration: underline;
          text-decoration-color: #00ff9c;
        }
        
        .rich-text-content pre {
          background: #000000;
          border: 1px solid #00ff9c33;
          border-radius: 0.375rem;
          padding: 1rem;
          overflow-x: auto;
          margin: 1em 0;
          color: #22d3ee;
        }
        
        .rich-text-content ul, .rich-text-content ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        .rich-text-content li {
          margin: 0.5em 0;
        }
        
        .rich-text-content ul li::marker {
          color: #00ff9c;
        }
        
        .rich-text-content ol li::marker {
          color: #00ff9c;
        }
      `}</style>
    </div>
  );
}