import React, { useEffect, useState } from "react";
import { deleteOrder } from "../../services/restaurant-service";
import {
  getOrders,
  type orderDetails,
} from "../../services/restaurant-service";
import Classes from "./FoodStatus.module.scss";

const FoodStatus = () => {
  const [orders, setOrders] = useState<orderDetails[]>([]);

  useEffect(() => {
    const showOrder = async () => {
      try {
        const response = await getOrders();
        setOrders(response);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };
    showOrder();
  }, []);

  const handlePickUp = async (id: number) => {
    await deleteOrder(id);
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <div>
      {orders.length > 0 ? (
        <>
          <div className={Classes.background}>
            <div className={Classes.row}>
              <h2>Table Number</h2>
              <h2>Order Status</h2>
            </div>

            <hr className={Classes.border} />

            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.6rem 1rem",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span className={Classes.tableNumber}>
                  {" "}
                  {order.tableNumber}
                </span>
                <strong>
                  {order.status === "READY" ? (
                    <p className={Classes.status}>Your Food is Ready </p>
                  ) : (
                    <p className={Classes.para}>Order Placed</p>
                  )}
                </strong>

                <button
                  onClick={() => handlePickUp(order.id)}
                  className={`${Classes.btn} ${
                    order.status === "READY" ? Classes.ready : Classes.preparing
                  }`}
                  disabled={order.status !== "READY"}
                >
                  {order.status === "READY" ? "Pick Up" : "Preparing..."}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className={Classes.text}>No Orders Yet !!</p>
      )}
    </div>
  );
};

export default FoodStatus;
