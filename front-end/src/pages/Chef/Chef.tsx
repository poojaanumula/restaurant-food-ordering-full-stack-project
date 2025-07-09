import { useEffect, useState } from "react";
import Classes from "./Chef.module.scss";
import { postOrderStatus } from "../../services/restaurant-service";
import {
  getOrders,
  type orderDetails,
} from "../../services/restaurant-service";

const Chef = () => {
  const [orders, setOrders] = useState<orderDetails[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.filter((o) => o.status !== "READY"));
      } catch (err) {
        console.log("Failed to load", err);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: number) => {
    try {
      await postOrderStatus(orderId, "READY");
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      console.log("Failed to update status", err);
    }
  };

  return (
    <>
       
      {orders.length > 0 ? 
      
          (
        orders.map((order) => (
          <>
            <div className={Classes.background}>
              <table className={Classes.table}>
                <tr>
                  <td className={Classes.tableNumber}>Table Number: {order.tableNumber}</td>
                  <td className={Classes.items}>
                    
                    {order.items.map((item) => (
                      <div className={Classes.dishes}>
                          <li className={Classes.list}>{item.itemName}</li>
                      </div>
                    ))}
                  </td>
                  <td className={Classes.status}>{order.status}</td>
                  <td className={Classes.changeStatus}>
                    {order.status !== "READY" && (
                      <button onClick={() => updateStatus(order.id)} className={Classes.btn}>
                        Ready to Pick up
                      </button>
                    )}
                  </td>
                </tr>
              </table>
            </div>
          </>
        ))
      ) : (
        <div className={Classes.text}>No orders so far...</div>
      )}
    </>
  );
};

export default Chef;
