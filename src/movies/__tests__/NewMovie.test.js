import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import NewMovie from "../NewMovie.js";

// Clears dom after each test - otherwise tests can duplicate outputs and fail
afterEach(cleanup);

test("<NewMovie />", () => {
    const { debug, getByTestId, queryByTestId, container, getByText } = render(
        <NewMovie />,
    );
    // Strict find - (getByTestId)
    expect(getByTestId("page-title").textContent).toBe("New movie");
    // Loose find - (queryByTestId)
    expect(queryByTestId("movie-form")).toBeTruthy();
    // snapshot test
    expect(container.firstChild).toMatchSnapshot();

    // debug();
});
