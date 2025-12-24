/**
 * src/app/App.tsx
 * Purpose: Main application component. Manages global state (notes, search, pagination) and routing views (list, detail, modals).
 * Connected Files:
 * - src/services/api.ts (API interactions)
 * - src/app/components/* (Renders all UI components)
 */
import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { NoteCard } from "./components/NoteCard";
import { NoteModal } from "./components/NoteModal";
import { DeleteModal } from "./components/DeleteModal";
import { Pagination } from "./components/Pagination";
import { NoteDetailView } from "./components/NoteDetailView";
import * as Api from "../services/api";

// Use Note interface from API service
import { Note } from "../services/api";

const NOTES_PER_PAGE = 9;

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNotes, setTotalNotes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [detailViewNote, setDetailViewNote] = useState<Note | null>(null);

  // Fetch notes from API
  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const { notes, total } = await Api.getNotes(searchQuery, currentPage, NOTES_PER_PAGE);
      setNotes(notes);
      setTotalNotes(total);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [searchQuery, currentPage]);

  const totalPages = Math.ceil(totalNotes / NOTES_PER_PAGE);

  // Debounce search
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCreateNote = () => {
    setModalMode("create");
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setModalMode("edit");
      setEditingNote(note);
      setIsModalOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingNoteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingNoteId) {
      try {
        await Api.deleteNote(deletingNoteId);
        await fetchNotes(); // Refresh list
        setIsDeleteModalOpen(false);
        setDeletingNoteId(null);
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    }
  };

  const handleSaveNote = async (title: string, content: string) => {
    try {
      if (modalMode === "create") {
        await Api.createNote(title, content);
      } else if (editingNote) {
        await Api.updateNote(editingNote.id, title, content);
      }
      await fetchNotes(); // Refresh list (and sorting)
      setIsModalOpen(false);
      setEditingNote(null);
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("Failed to save note. Please check your input.");
    }
  };

  const deletingNote = notes.find(n => n.id === deletingNoteId);

  const handleViewNote = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setDetailViewNote(note);
      setIsDetailViewOpen(true);
    }
  };

  // If detail view is open, show it instead of the dashboard
  if (isDetailViewOpen && detailViewNote) {
    return (
      <NoteDetailView
        id={detailViewNote.id}
        title={detailViewNote.title}
        content={detailViewNote.content}
        date={detailViewNote.createdAt.split("T")[0]}
        onBack={() => {
          setIsDetailViewOpen(false);
          setDetailViewNote(null);
        }}
        onEdit={(id) => {
          setIsDetailViewOpen(false);
          handleEditNote(id);
        }}
        onDelete={(id) => {
          setIsDetailViewOpen(false);
          handleDeleteClick(id);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f0e] text-white">
      {/* Header */}
      <header className="border-b border-[#00ff9c]/20 bg-[#0b0f0e]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-mono text-[#00ff9c] tracking-wider">
                &lt;/&gt; NOTES.DEV
              </h1>
              <p className="text-gray-500 text-sm font-mono mt-1">// Developer Notes System</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateNote}
                className="flex items-center gap-2 px-6 py-2 bg-[#00ff9c] text-black rounded hover:bg-[#00ff9c]/90 hover:shadow-[0_0_20px_rgba(0,255,156,0.3)] transition-all font-mono"
              >
                <Plus className="w-5 h-5" />
                NEW NOTE
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00ff9c]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search notes..."
              className="w-full bg-[#1a1f1e] border border-[#00ff9c]/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#00ff9c] focus:outline-none focus:ring-2 focus:ring-[#00ff9c]/20 font-mono"
            />
          </div>
        </div>

        {/* Notes Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-gray-500 font-mono">// Loading data...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 font-mono">
              {searchQuery ? "// No notes found matching your search" : "// No notes yet. Create your first note!"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map(note => (
                <NoteCard
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  date={note.createdAt.split("T")[0]}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteClick}
                  onClick={handleViewNote}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        initialTitle={editingNote?.title || ""}
        initialContent={editingNote?.content || ""}
        mode={modalMode}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingNoteId(null);
        }}
        onConfirm={handleDeleteConfirm}
        noteTitle={deletingNote?.title || ""}
      />
    </div>
  );
}