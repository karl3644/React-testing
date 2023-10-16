import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import Counter from "./Counter.js";

afterEach(cleanup);

test("<Counter />", () => {
    // Renders component before destructure
    // const wrapper = render(<Counter />);

    // after destructure
    const { debug, getByTestId, getByText } = render(<Counter />);

    // debug(); // Outputs DOM as string

    const counterButton = getByTestId("counter-button");

    // Asserts text value 0 is found within a button
    // expect(wrapper.getByText("0").tagName).toBe("BUTTON");
    // Asserts counter button is a button
    expect(counterButton.tagName).toBe("BUTTON");
    // Asserts counter button starts at 0
    expect(counterButton.textContent).toBe("0");

    fireEvent.click(counterButton);
    expect(counterButton.textContent).toBe("1");

    fireEvent.click(counterButton);
    expect(counterButton.textContent).toBe("2");

    // debug(); // Outputs DOM as string
});
