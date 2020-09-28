import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('Start Button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('Start!');
  expect(linkElement).toBeInTheDocument();
  userEvent.click(linkElement)
  setTimeout(() => {
    getByText('started')
  }, 300);
});
