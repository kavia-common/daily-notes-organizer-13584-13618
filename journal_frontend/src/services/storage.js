//
// PUBLIC_INTERFACE
// storage.js - Thin abstraction layer for future backend integration.
// Currently uses localStorage for demo purposes. Replace implementations with API calls later.
//

const STORAGE_KEY = 'notes.v1';

/**
 * PUBLIC_INTERFACE
 * loadNotes - Load notes array from the client storage.
 * Replace with fetch('/api/notes') integration in the future.
 */
export function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * saveNotes - Persist notes to client storage.
 * Replace with POST/PUT calls in the future.
 */
export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // ignore
  }
}
