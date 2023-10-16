import React from "react";
import {
    render,
    cleanup,
    waitForElement,
    getByTestId,
} from "react-testing-library";
import MovieDetail from "./MovieDetail.js";

global.fetch = require("jest-fetch-mock");

afterEach(() => {
    cleanup();
    console.error.mockClear();
});

const match = {
    params: {
        id: "abc",
    },
};

console.error = jest.fn();

const movie = {
    id: "testId",
    title: "testTitle",
};

test("<MovieDetail />", async () => {
    // mock fetch response
    fetch.mockResponseOnce(JSON.stringify(movie));

    const { getByTestId } = render(<MovieDetail match={match} />);
    await waitForElement(() => getByTestId("movie-title"));
    expect(getByTestId("movie-title").textContent).toBe(movie.title);
});
