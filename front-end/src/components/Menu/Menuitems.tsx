import { useEffect, useState } from "react";
import { getMenu } from "../../services/restaurant-service";
import type { Menu } from "../../services/restaurant-service";
import Classes from "./Menuitems.module.scss";
import Orders from "../Orders/Orders";

interface TableNumber {
  tableNumber: string;
}
const Menuitems = ({ tableNumber }: TableNumber) => {
  const [menuItems, setMenuItems] = useState<Menu[]>([]);

  const [selectedItem, setSelectedItem] = useState<
    { itemName: string; itemPrice: string }[]
  >([]);

  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await getMenu();
        setMenuItems(response);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      }
    };
    fetchMenu();
  }, []);

  const addItem = (itemName: string, itemPrice: string) => {
    setSelectedItem((prev) => [...prev, { itemName, itemPrice }]);
  };

  const deleteItem = (itemName: string, itemPrice: string) => {
    setSelectedItem((prev) =>
      prev.filter(
        (item) => !(item.itemName === itemName && item.itemPrice === itemPrice)
      )
    );
  };

  const itemSelected = (dishName: string, dishPrice: string) => {
    return !!selectedItem.find(
      (item) => item.itemName === dishName && item.itemPrice === dishPrice
    );
  };

  if (showOrders) {
    return (
      <Orders
        selectedItems={selectedItem}
        deleteItem={deleteItem}
        tableNumber={tableNumber}
        onClose={() => setShowOrders(false)}
      />
    );
  }
  const entrees = menuItems.filter((item) => item.category === "ENTREES");
  const mains = menuItems.filter((item) => item.category === "MAINS");
  const kids = menuItems.filter((item) => item.category === "KIDS");
  const desserts = menuItems.filter((item) => item.category === "DESSERTS");

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={Classes.display}>
          {selectedItem.length > 0 && (
            <button
              className={Classes.orders}
              onClick={() => setShowOrders(true)}
            >
              View Order - {selectedItem.length} Items
            </button>
          )}
          <h3 className={Classes.heading}>ENTREES</h3>
          <hr />

          {entrees.map((item, index) => (
            <div key={index} className={Classes.itemRow}>
              <span className={Classes.span}>{item.itemName} -</span>
              <span style={{ marginLeft: 6 }} className={Classes.span}>
                {item.itemPrice}$
              </span>
              <button
                className={`${Classes.btn} 
                ${
                  itemSelected(item.itemName, item.itemPrice)
                    ? Classes.orderPlaced
                    : ""
                } ${Classes.actionBtn}`}
                onClick={() => addItem(item.itemName, item.itemPrice)}
              >
                +
              </button>
            </div>
          ))}
        </div>

        <div>
          <h3 className={Classes.heading}>MAINS</h3>
          <hr />
          {mains.map((item, index) => (
            <div key={index} className={Classes.itemRow}>
              <span className={Classes.span}>{item.itemName} - </span>
              <span style={{ marginLeft: 6 }} className={Classes.span}>
                {item.itemPrice}$
              </span>
              <button
                className={`${Classes.btn} ${
                  itemSelected(item.itemName, item.itemPrice)
                    ? Classes.orderPlaced
                    : ""
                } ${Classes.actionBtn}`}
                onClick={() => addItem(item.itemName, item.itemPrice)}
              >
                +
              </button>
            </div>
          ))}
        </div>

        <div>
          <h3 className={Classes.heading}>KIDS</h3>
          <hr />
          {kids.map((item, index) => (
            <div key={index} className={Classes.itemRow}>
              <span className={Classes.span}>{item.itemName} -</span>
              <span style={{ marginLeft: 6 }} className={Classes.span}>
                {item.itemPrice}$
              </span>
              <button
                className={`${Classes.btn} ${
                  itemSelected(item.itemName, item.itemPrice)
                    ? Classes.orderPlaced
                    : ""
                } ${Classes.actionBtn}`}
                onClick={() => addItem(item.itemName, item.itemPrice)}
              >
                +
              </button>
            </div>
          ))}
        </div>

        <div>
          <h3 className={Classes.heading}>DESSERTS</h3>
          <hr />
          {desserts.map((item, index) => (
            <div key={index} className={Classes.itemRow}>
              <span className={Classes.span}>{item.itemName} - </span>
              <span style={{ marginLeft: 6 }} className={Classes.span}>
                {item.itemPrice}$
              </span>
              <button
                className={`${Classes.btn} ${
                  itemSelected(item.itemName, item.itemPrice)
                    ? Classes.orderPlaced
                    : ""
                } ${Classes.actionBtn}`}
                onClick={() => addItem(item.itemName, item.itemPrice)}
              >
                +
              </button>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </>
  );
};

export default Menuitems;
