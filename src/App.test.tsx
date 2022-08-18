import { jest } from "@jest/globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

import { fetchChecks, submitCheckResults } from "./api";
import { Check } from "./model";

jest.mock("./api");

describe("states", () => {
    test("renders loader state", async () => {
        (fetchChecks as jest.Mock<Promise<Check[]>>).mockImplementation(() => {
            return new Promise((resolve) => resolve([]));
        });
        render(<App />);

        const loader = await screen.findByTestId(/loader/);
        expect(loader).toBeInTheDocument();
    });
    test("renders error state", async () => {
        (fetchChecks as jest.Mock<Promise<Check[]>>).mockImplementation(() => {
            return new Promise((_, reject) => reject());
        });
        render(<App />);

        const error = await screen.findByTestId(/error/);
        expect(error).toBeInTheDocument();
    });
});

describe("interactive form", () => {
    const getSubmit_button = () => screen.getByTestId(/button_submit/);

    beforeEach(() => {
        (fetchChecks as jest.Mock<Promise<Check[]>>).mockImplementation(() => {
            return new Promise((resolve) =>
                resolve([
                    {
                        id: "pass",
                        priority: 10,
                        description: "Check One's Passport",
                    },
                    {
                        id: "card",
                        priority: 5,
                        description: "Check One's ID Card",
                    },
                ])
            );
        });
        (submitCheckResults as jest.Mock<Promise<{}>>).mockImplementation(
            () => {
                return new Promise((resolve) => resolve({}));
            }
        );
    });

    test("renders checks", async () => {
        render(<App />);

        await waitFor(() => {
            expect(getSubmit_button()).toBeInTheDocument();
            expect(screen.getByTestId(/check_pass/)).toBeInTheDocument();
            expect(screen.getByTestId(/check_card/)).toBeInTheDocument();
            expect(getSubmit_button()).toBeInTheDocument();
        });
    });

    test("enables submit button on click", async () => {
        render(<App />);

        const button_no = await screen.findByTestId(/button_no_card/);

        fireEvent.click(button_no);

        await waitFor(() => {
            expect(getSubmit_button()).not.toHaveAttribute("disabled");
        });

        expect(button_no).toBeInTheDocument();
    });

    test("handles checked form submit", async () => {
        render(<App />);
        const button_no = await screen.findByTestId(/button_no_card/);
        fireEvent.click(button_no);

        await waitFor(() => {
            expect(getSubmit_button()).not.toHaveAttribute("disabled");
        });

        fireEvent.click(getSubmit_button());

        await waitFor(() => {
            expect(screen.getByTestId(/success_screen/)).toBeInTheDocument();
        });
    });
});
