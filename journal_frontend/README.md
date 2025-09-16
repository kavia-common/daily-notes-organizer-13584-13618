# Daily Journal / Notes App (Frontend)

This is the initial React frontend for a lightweight daily journal / notes application.

## Features (v0)
- Add, edit, and delete notes
- Tag notes (e.g., work, personal)
- Quick search (title, content, or tag)
- Light/Dark theme toggle
- Clean, modern UI with pure CSS
- Modular components and ready for future backend integration

## Getting Started

From the project directory:

### `npm start`
Start the app in development mode at http://localhost:3000

### `npm test`
Run the unit tests (includes a basic smoke test for the UI)

### `npm run build`
Build the app for production

## Project Structure

- `src/components/`
  - `NoteForm.js` - Create/edit note form
  - `NotesList.js` - Notes list view
  - `NoteItem.js` - Single note card
  - `SearchBar.js` - Search input
- `src/services/storage.js` - Temporary local storage utility (replace with API integration later)
- `src/App.js` - App shell and state management
- `src/App.css` - Styles and theme variables

## Future Integration Notes

- Replace the localStorage logic (in `App.js` and `services/storage.js`) with a persistence layer (REST or GraphQL).
- Introduce a notes API client with methods:
  - `listNotes()`, `createNote()`, `updateNote(id)`, `deleteNote(id)`
- Consider adding routing and authentication when backend is available.
