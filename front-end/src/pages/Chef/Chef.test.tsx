import { describe, it, expect, vi, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { orderDetails } from "../../services/restaurant-service";
import * as restaurantService from "../../services/restaurant-service";
import Chef from "./Chef";
import axios from "axios";

vi.mock("../../services/restaurant-service", () => ({
  getOrders: vi.fn(),
}));

vi.mock("axios");

const fakeOrder: orderDetails[] = [
  {
    id: 86,
    tableNumber: 5,
    items: [
      {
        id: 172,
        itemName: "icecream",
        itemPrice: "60.0",
      },
    ],
    status: "PLACED",
  },
];

describe("Test whether the form is being rendered by default", () => {
  it("Render the form", () => {
    render(<Chef />);
    const form = screen.getByTitle("form");
    expect(form).toBeInTheDocument();
  });
  it("IT should not render the form after submit"),
    async () => {
      render(<Chef />);
      const form = screen.queryByTitle("form");
      const user = userEvent.setup();
      const username = screen.getByPlaceholderText("Enter Your UserName");
      await user.type(username, "someusername");
      const password = screen.getByPlaceholderText("Enter Your Password");
      await user.type(password, "somepassword");
      const btn = screen.getByTitle("btn");
      await user.click(btn);
      expect(form).not.toBeInTheDocument();
    };
  it("it should render the orders when there is atlease one", async () => {
    (axios.get as any).mockResolvedValueOnce({ data: [] });
    vi.spyOn(restaurantService, "getOrders").mockResolvedValueOnce(fakeOrder);
    render(<Chef />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Enter Your UserName"), "user");
    await user.type(screen.getByPlaceholderText("Enter Your Password"), "pass");
    await user.click(screen.getByTitle("btn"));
    await waitFor(() => {
      expect(screen.getByTitle("showOrders")).toBeInTheDocument();
    });
    expect(screen.getByText(/Table Number: 5/)).toBeInTheDocument();
    expect(screen.getByText("icecream")).toBeInTheDocument();
  });
});
