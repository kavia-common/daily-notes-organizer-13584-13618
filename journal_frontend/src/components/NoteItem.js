import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * NoteItem - Displays a single note with title, content excerpt, tags, and action buttons.
 * Props:
 * - note: { id, title, content, tags[], createdAt }
 * - onEdit(noteId)
 * - onDelete(noteId)
 */
function NoteItem({ note, onEdit, onDelete }) {
  const { id, title, content, tags, createdAt } = note;

  const excerpt = content.length > 180 ? content.slice(0, 180) + '…' : content;

  return (
    <article className="card note-item" aria-label={`Note ${title || 'untitled'}`}>
      <header className="note-header">
        <h3 className="note-title">{title || 'Untitled'}</h3>
        <div className="note-meta">
          <time dateTime={new Date(createdAt).toISOString()}>
            {new Date(createdAt).toLocaleDateString()}
          </time>
        </div>
      </header>
      <p className="note-content">{excerpt}</p>
      <div className="note-footer">
        <div className="tags">
          {tags.map((t) => <span key={t} className="tag small">{t}</span>)}
        </div>
        <div className="note-actions">
          <button className="btn btn-ghost" onClick={() => onEdit(id)} aria-label="Edit note">Edit</button>
          <button className="btn btn-danger" onClick={() => onDelete(id)} aria-label="Delete note">Delete</button>
        </div>
      </div>
    </article>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.number.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default NoteItem;
