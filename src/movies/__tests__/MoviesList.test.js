import React from "react";
import {
    render,
    cleanup,
    waitForElement,
    getByTestId,
} from "react-testing-library";
import MoviesList from "../MoviesList.js";
import { MemoryRouter } from "react-router-dom";
import { POSTER_PATH } from "../Movie.js";

global.fetch = require("jest-fetch-mock");

afterEach(() => {
    cleanup();
    console.error.mockClear();
});

console.error = jest.fn();

const movies = {
    success: true,
    results: [
        { id: 1, title: "Rambo", poster_path: `${POSTER_PATH}/ggg.jpg` },
        { id: 2, title: "Conan", poster_path: `${POSTER_PATH}/ggg.jpg` },
        { id: 3, title: "lord of", poster_path: `${POSTER_PATH}/ggg.jpg` },
        { id: 4, title: "the rings", poster_path: `${POSTER_PATH}/ggg.jpg` },
    ],
};

test("<MoviesList />", async () => {
    fetch.mockResponseOnce(JSON.stringify(movies));
    const { debug, queryByTestId, getByTestId, getAllByTestId } = render(
        <MemoryRouter>
            <MoviesList />
        </MemoryRouter>,
    );
    // getByTestId - strict
    expect(getByTestId("loading")).toBeTruthy();
    await waitForElement(() => getByTestId("movie-link"));
    // queryByTestId - not too strict so if element does not appear then should be ok
    expect(queryByTestId("loading")).toBeFalsy();
    expect(getByTestId("movie-link")).toBeTruthy();
    expect(getAllByTestId("movie-link").length).toBe(movies.results.length);
});

test("<MoviesList /> api fail to test app doesnt crash", async () => {
    movies.success = false;
    fetch.mockResponseOnce(JSON.stringify(movies));
    const { getByTestId } = render(
        <MemoryRouter>
            <MoviesList />
        </MemoryRouter>,
    );
    expect(getByTestId("loading")).toBeTruthy();
});
