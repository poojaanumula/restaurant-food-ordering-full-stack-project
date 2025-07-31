import { describe, it, expect, vi, test } from "vitest";
import Customer from "./Customer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

vi.mock("../../components/Menu/Menuitems", () => ({
  default: () => <div>Mocked Menu Component</div>,
}));

describe("Show the form by default", () => {
  it("Should render the form by default"),
    () => {
      render(<Customer />);
      const form = screen.getByTitle("form");
      expect(form).toBeInTheDocument();
    };

  it("should hide the form when button is submitted", async () => {
    render(<Customer />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Enter number from 1 to 12");
    await user.type(input, "5");
    const btn = screen.getByTitle("btn");
    await user.click(btn);
    const form = screen.queryByTitle("form");
    expect(form).not.toBeInTheDocument();
  });
  it("should show the mocked Menu component after form is submitted", async () => {
    render(<Customer />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Enter number from 1 to 12");
    await user.type(input, "5");
    const btn = screen.getByTitle("btn");
    await user.click(btn);
    const menu = screen.getByText("Mocked Menu Component");
    expect(menu).toBeInTheDocument();
  });
});
