import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

/**
 * PUBLIC_INTERFACE
 * App - Daily Journal / Notes App UI.
 * - Allows adding, editing, deleting notes
 * - Tagging notes
 * - Searching notes
 * - Theme toggle
 * This implementation uses local state and localStorage for persistence as a placeholder.
 * Future integration: replace storage layer with API or database service.
 */
function App() {
  const [theme, setTheme] = useState('light');

  // Local notes state
  const [notes, setNotes] = useState(() => {
    // Load from localStorage to provide temporary persistence
    try {
      const raw = localStorage.getItem('notes.v1');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Failed to parse stored notes', e);
      return [];
    }
  });

  // UI state
  const [query, setQuery] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Persist notes locally for demo purposes
  useEffect(() => {
    try {
      localStorage.setItem('notes.v1', JSON.stringify(notes));
    } catch (e) {
      console.warn('Failed to persist notes', e);
    }
  }, [notes]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleCreate = () => {
    setEditingNoteId(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setEditingNoteId(id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Delete this note? This action cannot be undone.');
    if (!confirmed) return;
    setNotes(prev => prev.filter(n => n.id !== id));
    if (editingNoteId === id) {
      setShowForm(false);
      setEditingNoteId(null);
    }
  };

  const upsertNote = (partial) => {
    setNotes(prev => {
      // Create
      if (!partial.id) {
        const newNote = {
          ...partial,
          id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          createdAt: Date.now()
        };
        return [newNote, ...prev];
      }
      // Update
      return prev.map(n => n.id === partial.id ? { ...n, ...partial } : n);
    });
    setShowForm(false);
    setEditingNoteId(null);
  };

  const editingNote = useMemo(
    () => notes.find(n => n.id === editingNoteId),
    [notes, editingNoteId]
  );

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n => {
      const matchesTitle = (n.title || '').toLowerCase().includes(q);
      const matchesContent = (n.content || '').toLowerCase().includes(q);
      const matchesTags = (n.tags || []).some(t => t.toLowerCase().includes(q));
      return matchesTitle || matchesContent || matchesTags;
    });
  }, [notes, query]);

  return (
    <div>
      <nav className="navbar">
        <div className="brand">Daily Journal</div>
        <div className="nav-actions">
          <button className="btn btn-large" onClick={handleCreate} aria-label="Create note">
            + New Note
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>

      <main className="container">
        <header className="header">
          <h1 className="page-title">Your Notes</h1>
        </header>

        <SearchBar query={query} onChange={setQuery} />

        <section className="layout">
          <div>
            {showForm && (
              <NoteForm
                key={editingNote?.id || 'new'}
                initialData={editingNote}
                onSave={upsertNote}
                onCancel={() => {
                  setShowForm(false);
                  setEditingNoteId(null);
                }}
              />
            )}
            {!showForm && (
              <div className="card">
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                  Click "New Note" to start writing. You can tag your notes like "work", "personal", or anything that helps you organize.
                </p>
              </div>
            )}
          </div>

          <div>
            <NotesList notes={filteredNotes} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </section>

        <footer className="footer">
          <p>Tips: Use the search bar to filter by title, content, or tags. Tags can be added from the form.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
