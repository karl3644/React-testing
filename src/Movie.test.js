import React from "react";
import { render, cleanup } from "react-testing-library";
import Movie from "./Movie.js";

// Clears dom after each test - otherwise tests can duplicate outputs and fail
afterEach(cleanup);

console.error = jest.fn()

test("<Movie />", () => {
  render(<Movie />)
  expect(console.error).toBeCalled()
})