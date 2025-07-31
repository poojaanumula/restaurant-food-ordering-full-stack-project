import axios from "axios";
export interface Menu {
  itemName: string;
  itemPrice: string;
  category: "ENTREES" | "MAINS" | "KIDS" | "DESSERTS";
}
export interface placedOrder {
  id: number;
  itemName: string;
  itemPrice: string;
}

export type OrderStatus = "PLACED" | "READY";

export interface orderDetails {
  id: number;
  tableNumber: number;
  items: placedOrder[];
  status: OrderStatus;
}

export interface NewOrder {
  tableNumber: number;
  items: {
    itemName: string;
    itemPrice: string;
  }[];
  status: OrderStatus;
}

export const postMenu = async (data: any, username: string, password: string) => {
  const basicAuth = btoa(`${username}:${password}`); 
  try {
    const response = await axios.post("http://localhost:8080/menu", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`, 
      },
    });
    console.log(response.data, "RESP")
    return response.data;
    
  } catch (err) {
    console.error("Add failed:", err);
    throw new Error("Something went wrong!");
  }
};

export const getMenu = async () => {
  try {
    const response = await axios.get("http://localhost:8080/menu");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch menu:", err);
    throw err;
  }
};

export const postOrder = async (data: NewOrder) => {
  try {
    const response = await axios.post("http://localhost:8080/orders", data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data as orderDetails;
  } catch (err) {
    throw err;
  }
};

export const getOrders = async (): Promise<orderDetails[]> => {
  try {
    const response = await axios.get("http://localhost:8080/orders");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    throw err;
  }
};

export const postOrderStatus = async (
  orderId: number,
  status: OrderStatus,
  username: string,
  password: string
) => {
  const basicAuth = btoa(`${username}:${password}`);

  try {
    const response = await axios.patch(
      `http://localhost:8080/orders/${orderId}/status`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Failed to update order status", err);
    throw err;
  }
};

export const deleteOrder = async (id: number) => {
  await axios.delete(`http://localhost:8080/orders/${id}`);
};