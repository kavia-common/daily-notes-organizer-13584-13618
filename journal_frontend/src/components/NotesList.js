import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

/**
 * PUBLIC_INTERFACE
 * NotesList - Renders a list of notes with callbacks for edit and delete.
 * Props:
 * - notes: array of note objects
 * - onEdit(noteId)
 * - onDelete(noteId)
 */
function NotesList({ notes, onEdit, onDelete }) {
  if (!notes.length) {
    return (
      <div className="empty-state" role="note">
        <p>No notes match your search. Try adjusting your query or create a new note.</p>
      </div>
    );
  }

  return (
    <section className="notes-grid">
      {notes.map((n) => (
        <NoteItem key={n.id} note={n} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default NotesList;
