import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * NoteForm - Controlled form for creating and editing a note.
 * Props:
 * - onSave(note): function called with note data { id?, title, content, tags[] }
 * - onCancel(): function to cancel editing/creation
 * - initialData: optional initial note data for editing
 */
function NoteForm({ onSave, onCancel, initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(initialData?.tags || []);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(initialData?.title || '');
    setContent(initialData?.content || '');
    setTags(initialData?.tags || []);
  }, [initialData]);

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (tags.includes(t)) {
      setTagInput('');
      return;
    }
    setTags([...tags, t]);
    setTagInput('');
  };

  const removeTag = (t) => {
    setTags(tags.filter(tag => tag !== t));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) {
      setError('Please enter a title or content for your note.');
      return;
    }
    setError('');
    onSave({
      id: initialData?.id,
      title: title.trim(),
      content: content.trim(),
      tags
    });
  };

  const handleKeyDownTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
    if (e.key === 'Backspace' && !tagInput && tags.length) {
      // quick remove last tag when input is empty
      setTags(tags.slice(0, -1));
    }
  };

  return (
    <form className="card note-form" onSubmit={handleSubmit} aria-label="Note form">
      <div className="field">
        <label className="label" htmlFor="note-title">Title</label>
        <input
          id="note-title"
          className="input"
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="field">
        <label className="label" htmlFor="note-content">Content</label>
        <textarea
          id="note-content"
          className="textarea"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />
      </div>

      <div className="field">
        <label className="label" htmlFor="note-tags">Tags</label>
        <div className="tag-input-row">
          <input
            id="note-tags"
            className="input"
            type="text"
            placeholder="Type a tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDownTag}
          />
          <button
            type="button"
            className="btn"
            onClick={addTag}
            aria-label="Add tag"
          >
            Add
          </button>
        </div>
        <div className="tags">
          {tags.map((t) => (
            <span className="tag" key={t}>
              {t}
              <button
                type="button"
                className="tag-remove"
                aria-label={`Remove tag ${t}`}
                onClick={() => removeTag(t)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {error && <div className="error" role="alert">{error}</div>}

      <div className="actions">
        <button type="submit" className="btn btn-primary">{initialData ? 'Update Note' : 'Add Note'}</button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

NoteForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  })
};

export default NoteForm;
