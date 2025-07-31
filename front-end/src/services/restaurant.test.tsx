import { describe, it, expect, vi, test } from "vitest";
import axios from "axios";
import { deleteOrder, type NewOrder } from "./restaurant-service";
import { getMenu } from "./restaurant-service";
import { getOrders } from "./restaurant-service";
import { postMenu } from "./restaurant-service";
import { postOrder } from "./restaurant-service";
import "@testing-library/jest-dom";
import type { Mock } from "vitest";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("getMenu", () => {
  test("Fetch menu from back end successfully", async () => {
    const mockData = [
      { id: 1, itemName: "papad", itemPrice: "43", itemCategory: "ENTREES" },
    ];

    (axios.get as Mock).mockResolvedValue({ data: mockData });
    const users = await getMenu();
    expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/menu");
    expect(users).toEqual(mockData);
  });

  test("should throw a network error when API is unreachable", async () => {
    const networkError = Object.assign(new Error("Network Error"), {
      code: "ERR_NETWORK",
      name: "AxiosError",
      request: {},
    });
    (axios.get as Mock).mockRejectedValue(new Error("some error"));
    await expect(getOrders()).rejects.toThrow("Network Error");
  });
});

describe("get Orders", () => {
  test("Fetch menu from back end successfully", async () => {
    const mockData = [
      {
        id: 86,
        tableNumber: 5,
        items: [
          {
            id: 172,
            itemName: "icecream",
            itemPrice: 60.0,
          },
        ],
        status: "PLACED",
      },
    ];
    (axios.get as Mock).mockResolvedValue({ data: mockData });
    const users = await getMenu();
    expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/orders");
    expect(users).toEqual(mockData);
  });

  test("should throw a network error when API is unreachable", async () => {
    const networkError = Object.assign(new Error("Network Error"), {
      code: "ERR_NETWORK",
      name: "AxiosError",
      request: {},
    });
    (axios.get as Mock).mockRejectedValue(networkError);
    await expect(getOrders()).rejects.toThrow("Network Error");
  });
});
describe("post Data", () => {
  test("It Should post data with data, user name password encoded", async () => {
    const username = "someuser";
    const password = "somepassword";
    const data = {
      itemName: "Pizza",
      itemPrice: "15",
      itemCategory: "ENTREES",
    };
    const expectedAuthHeader = "Basic " + btoa(`${username}:${password}`);
    const mockResponse = { data: { success: true } };
    (axios.post as Mock).mockResolvedValue(mockResponse);
    const result = await postMenu(data, username, password);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/menu",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: expectedAuthHeader,
        },
      }
    );
    expect(result).toEqual(mockResponse.data);
  });
});
describe("Post ORder", () => {
  test("IT should post the order", async () => {
    const fakePostOrder: NewOrder = {
      tableNumber: 5,
      items: [
        {
          itemName: "papad",
          itemPrice: "60.0",
        },
      ],
      status: "PLACED",
    };
    const fakeOrderDetails = {
      id: 1,
      tableNumber: 5,
      items: [
        {
          id: 101,
          itemName: "papad",
          itemPrice: "60.0",
        },
      ],
      status: "PLACED",
    };

    const mockResponse = { data: { success: true } };
    (axios.post as Mock).mockResolvedValue({ data: fakeOrderDetails });
    const result = await postOrder(fakePostOrder);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/orders",
      fakePostOrder,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(fakeOrderDetails);
  });

  describe("Delete Method", () => {
    test("Testing delete function", async () => {
      const someId = 5;
      await deleteOrder(someId);
      expect(axios.delete).toHaveBeenCalledWith(
        `http://localhost:8080/orders/${someId}`
      );
    });
  });
});
