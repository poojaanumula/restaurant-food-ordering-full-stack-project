import { useEffect, useState } from "react";
import Classes from "./Chef.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { postOrderStatus } from "../../services/restaurant-service";
import {
  getOrders,
  type orderDetails,
} from "../../services/restaurant-service";

const Chef = () => {
  const [orders, setOrders] = useState<orderDetails[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Enter username and password");
      return;
    }

    try {
      await axios.get("http://localhost:8080/orders", {
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
      });
      console.log(orders);
      setLoggedIn(true);
    } catch (error) {
      toast.error("Invalid username or password");
      setLoggedIn(false);
    }
  };
  useEffect(() => {
    if (!loggedIn) return;

    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.filter((o) => o.status !== "READY"));
      } catch (err) {
        console.log("Failed to load", err);
      }
    };

    fetchOrders();
  }, [loggedIn, username, password]);

  const updateStatus = async (orderId: number) => {
    try {
      await postOrderStatus(orderId, "READY", username, password);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      console.log("Failed to update status", err);
    }
  };
  if (!loggedIn) {
    return (
      <div className={Classes.loginbackground} title="form">
        <div className={Classes.logintitleDisplay}>
          <h2 className={Classes.logintitle}>Welcome Chef!!</h2>
          <img src="/images/chef.png" className={Classes.photo} />
        </div>
        <hr className={Classes.loginborder} />

        <form onSubmit={handleLoginSubmit}>
          <div className={Classes.loginsection}>
            <label className={Classes.loginname}>UserName</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your UserName"
              className={Classes.logintextBox}
            />
          </div>
          <div className={Classes.loginsection}>
            <label className={Classes.loginname}>Password</label>
            <input
              className={Classes.logintextBox}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
            />
          </div>
          <div>
            <button type="submit" className={Classes.btn} title="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <>
      {orders.length > 0 ? (
        orders.map((order) => (
          <>
            <div className={Classes.background} title="showOrders">
              <table className={Classes.table}>
                <tr>
                  <td className={Classes.tableNumber}>
                    <b>Table Number: {order.tableNumber}</b>{" "}
                  </td>
                  <td className={Classes.items}>
                    {order.items.map((item) => (
                      <div className={Classes.dishes}>
                        <li className={Classes.list}>
                          <b>
                            {item.itemName
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </b>
                        </li>
                      </div>
                    ))}
                  </td>
                  <td className={Classes.changeStatus}>
                    {order.status !== "READY" && (
                      <button
                        onClick={() => updateStatus(order.id)}
                        className={Classes.btn}
                      >
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
        <div className={Classes.text} title="noOrders">
          No orders so far...
        </div>
      )}
    </>
  );
};

export default Chef;
