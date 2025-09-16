import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app brand and new note button', () => {
  render(<App />);
  expect(screen.getByText(/Daily Journal/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /new note/i })).toBeInTheDocument();
});
