import { useState } from "react";
import Classes from "./Orders.module.scss";
import { postOrder } from "../../services/restaurant-service";
import type { OrderStatus } from "../../services/restaurant-service";
import { useNavigate } from "react-router-dom";

interface OrdersProps {
  selectedItems: { itemName: string; itemPrice: string }[];
  deleteItem: (itemName: string, itemPrice: string) => void;
  tableNumber: string;
  onClose: () => void;
}

const Orders = ({
  selectedItems,
  deleteItem,
  tableNumber,
  onClose,
}: OrdersProps) => {
  const [items, setItems] = useState(selectedItems);

  const handleDelete = (name: string, price: string) => {
    deleteItem(name, price);
    setItems((prev) =>
      prev.filter((i) => !(i.itemName === name && i.itemPrice === price))
    );
  };

  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      const payload = {
        tableNumber: Number(tableNumber),
        items,
        status: "PLACED" as OrderStatus,
      };
      await postOrder(payload);
      onClose();
      alert("Your Order is Placed");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const total = items.reduce((acc, i) => acc + Number(i.itemPrice), 0);

  return (
    <div className={Classes.fullPage}>
      <button className={Classes.closeBtn} onClick={onClose}>
        X
      </button>

      <h3 className={Classes.title}>View Your Order</h3>

      {items.map((i) => (
        <div className={Classes.name} key={`${i.itemName}-${i.itemPrice}`}>
          {i.itemName} -{i.itemPrice}$
          <div>
            <button
              className={Classes.delete}
              onClick={() => handleDelete(i.itemName, i.itemPrice)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <h3 className={Classes.total}>Total: {total}$</h3>
      <button className={Classes.placeOrder} onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Orders;
