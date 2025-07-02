import { postMenu } from "../../services/restaurant-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuItemSchema, type MenuItem } from "./SchemaFile";
import Navbar from "../../components/Navbar/Navbar";

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuItem>({
    resolver: zodResolver(menuItemSchema),
  });

  const onSubmit = (data: MenuItem) => {
    postMenu(data)
      .then(() => console.log("Menu item added"))
      .catch((err) => console.error("Add failed:", err))
      .finally(() => reset());
  };

  return (
    <div>
      <Navbar />
      <h2>Add a new Item</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Item Name</label>
          <input type="text" {...register("itemName")} />
          {errors.itemName && <p>{errors.itemName.message}</p>}
        </div>
        <div>
          <label>Price</label>
          <input type="number" step="0.01" {...register("itemPrice")} />
          {errors.itemPrice && <p>{errors.itemPrice.message}</p>}
        </div>
        <div>
          <label>Category</label>
          <select {...register("category")}>
            <option value="">Choose</option>
            <option value="ENTREES">Entrees</option>
            <option value="MAINS">Mains</option>
            <option value="KIDS">Kids Special</option>
            <option value="DESSERTS">Desserts</option>
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <button type="submit">Add an item</button>
      </form>
    </div>
  );
};

export default Dashboard;
