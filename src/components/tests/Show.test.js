import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';



test('renders without errors', () => { 
  render(<Show show={ exampleShowData } selectedSeason={ 0 } />)
  const lookup = screen.queryByText(/Season 1/i);
  expect(lookup).toBeInTheDocument();
  expect(lookup).toBeTruthy();
  expect(lookup).toHaveTextContent("Season 1");
});

test('renders Loading component when prop show is null', () => { 
  render(<Show show={ null }  />)
  const lookup = screen.queryByTestId("loading-container");
  expect(lookup).toBeInTheDocument();
  expect(lookup).toBeTruthy();
  expect(lookup).toHaveTextContent("Fetching data...");
});

test('renders same number of options seasons are passed in', () => { });

test('handleSelect is called when an season is selected', () => { });

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { });

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