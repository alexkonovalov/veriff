import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Veriff form!", () => {
    render(<App />);
    const elem = screen.getByText(/Veriff form!/i);
    expect(elem).toBeInTheDocument();
});
