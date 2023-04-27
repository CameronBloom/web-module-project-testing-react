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

test('renders same number of options seasons are passed in', () => {
  render(<Show show={ exampleShowData } selectedSeason={ "none" } />);
  const lookup = screen.queryAllByTestId("season-option");
  expect(lookup).toHaveLength(5);
});

test('handleSelect is called when an season is selected', () => {
  const handleSelect = jest.fn();
  render(<Show show={ exampleShowData } selectedSeason={ "none" } handleSelect={ handleSelect } />);
  const lookup = screen.queryByLabelText(/Select A Season/i);
  expect(lookup).toHaveLength(6); // 5 seasons & null
  fireEvent.change(lookup, ["1"])
  expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  const { rerender } = render(<Show show={ exampleShowData } selectedSeason={ "none" } />);
  let lookup = screen.queryByTestId("episodes-container")
  expect(lookup).not.toBeInTheDocument();

  rerender(<Show show={ exampleShowData } selectedSeason={ 0 } />)
  lookup = screen.queryByTestId("episodes-container")
  expect(lookup).toBeInTheDocument();
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