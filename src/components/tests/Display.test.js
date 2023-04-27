import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import { waitFor } from '@testing-library/react';

// ----- TEST 2 SPY -----
import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow')

// ----- TEST 1 -----
test('renders without errors with no props', async () => {
  render(<Display />)
});

// ----- TEST 2 -----
test('renders Show component when the button is clicked ', async () => {
  mockFetchShow.mockResolvedValueOnce(exampleShowData);
  render(<Display />);
  const lookup = screen.getByRole("button");
  fireEvent.click(lookup);
  const check = await screen.findByTestId("show-container");
  expect(check).toBeInTheDocument();
});

// ----- TEST 3 -----
test('renders show season options matching your data when the button is clicked', async () => {
  mockFetchShow.mockResolvedValueOnce(exampleShowData);
  render(<Display />);
  const lookup = screen.getByRole("button");
  fireEvent.click(lookup);

  await waitFor(() => {
    const options = screen.queryAllByTestId("season-option");
    expect(options).toHaveLength(5);
  })
});

// ----- EXAMPLE SHOW TEST OBJECT -----
const exampleShowData = {
  name: "Stranger Things",
  summary: "A show about kids and monsters.",
  seasons: [
    { id: 0, name: "Season 1", episodes: [] },
    { id: 1, name: "Season 2", episodes: [] },
    { id: 2, name: "Season 3", episodes: [] },
    { id: 3, name: "Season 4", episodes: [] },
    { id: 4, name: "Season 5", episodes: [] },
  ]
};