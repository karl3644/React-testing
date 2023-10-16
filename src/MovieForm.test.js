import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import MovieForm from "./MovieForm.js";

// Clears dom after each test - otherwise tests can duplicate outputs and fail
afterEach(cleanup);

const onSubmit = jest.fn(() => console.log("onSubmit was called"));

test("<MovieForm />", () => {
    const { queryByTestId, getByText, getByLabelText } = render(
        <MovieForm submitForm={onSubmit} />,
    );
    // Loose find (queryByTestId)
    expect(queryByTestId("movie-form")).toBeTruthy();

    // Note might not work?
    // getByLabelText("Text").value = "hi";
    // fireEvent.change(getByLabelText("Text"));

    // More readable
    // Updates the state before submitting the form
    fireEvent.change(getByLabelText("Text"), {
        target: { value: "new" },
    });

    fireEvent.click(getByText("Submit"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
        text: "new",
    });

    // debug();
});
