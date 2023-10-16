import React from "react";
import { render, cleanup } from "react-testing-library";
import Movie, { POSTER_PATH } from "./Movie.js";
import { MemoryRouter } from "react-router-dom";

// Clears dom after each test - otherwise tests can duplicate outputs and fail
// afterEach(cleanup);

// Mock err fn
console.error = jest.fn();

// ["Warning: Failed prop type: The prop `movie` is marked as required in `Movie`, but its value is `undefined`.
// in Movie (at Movie.test.js:13)"]
// above err can happen when running two tests, first is toHaveBeenCalled with err undefinen
// then a 2nd test run not.toHaveBeenCalled. error is picked up from first test

// to fix
afterEach(() => {
    cleanup();
    console.error.mockClear();
});

test("<Movie />", () => {
    render(<Movie />);

    // Use when you want an error to be expected. Removes error from test result
    expect(console.error).toHaveBeenCalled();
});

const movie = {
    id: "hi",
    title: "Level Up Big Day Out",
    poster_path: `${POSTER_PATH}/ggg.jpg`,
};

test("<Movie /> with movie", () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <Movie movie={movie} />
        </MemoryRouter>,
    );

    // Use when you want an error to be expected. Removes error from test result
    // negative assertion
    expect(console.error).not.toHaveBeenCalled();
    expect(getByTestId("movie-link").getAttribute("href")).toBe(`/${movie.id}`);
    expect(getByTestId("movie-img").src).toBe(
        `${POSTER_PATH}${movie.poster_path}`,
    );
});
