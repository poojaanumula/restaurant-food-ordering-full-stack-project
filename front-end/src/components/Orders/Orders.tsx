
import { useState, useEffect } from "react";            
import Classes from "./Orders.module.scss";
import { postOrder } from "../../services/restaurant-service";
import type { OrderStatus } from "../../services/restaurant-service";
import { useNavigate, Link } from "react-router-dom";   
import { toast } from "react-toastify";

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
  const navigate = useNavigate();


  useEffect(() => {
    if (items.length === 0) navigate("/");              
  }, [items, navigate]);

  const handleDelete = (name: string, price: string) => {
    deleteItem(name, price);
    setItems((prev) =>
      prev.filter((i) => !(i.itemName === name && i.itemPrice === price))
    );
  };

  const placeOrder = async () => {
    if (items.length === 0) {                           
      navigate("/");
      return;
    }
    try {
      const payload = {
        tableNumber: Number(tableNumber),
        items,
        status: "PLACED" as OrderStatus,
      };
      await postOrder(payload);
      onClose();
      toast.success("Your order has been placed!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to place order.");
    }
  };

  const total = items.reduce((acc, i) => acc + Number(i.itemPrice), 0);
  return (
    <>
      return (
  <>
    {items.length > 0 && (
      <div className={Classes.fullPage}>
        <button className={Classes.closeBtn} onClick={onClose}>
          X
        </button>
        <h3 className={Classes.title}>View Your Order</h3>
        {items.map((i) => (
          <div className={Classes.name} key={`${i.itemName}-${i.itemPrice}`}>
            {i.itemName} - {i.itemPrice}$
            <button
              className={Classes.delete}
              onClick={() => handleDelete(i.itemName, i.itemPrice)}
            >
              Delete
            </button>
          </div>
        ))}

        <h3 className={Classes.total}>Total: {total}$</h3>
        <button
          className={Classes.placeOrder}
          onClick={placeOrder}
          disabled={items.length === 0}
        >
          Place Order
        </button>
      </div>
    )}
  </>
);
    </>
  );
};

export default Orders;
