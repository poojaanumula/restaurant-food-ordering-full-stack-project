import { postMenu } from "../../services/restaurant-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuItemSchema, type MenuItem } from "./SchemaFile";
import Classes from "./Dashboard.module.scss";

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
      .then(() => alert("Menu item added"))
      .catch((err) => console.error("Add failed:", err))
      .finally(() => reset());
  };

  return (
    <div className={Classes.background}>
      <h2 className={Classes.title}>Add a new Item</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={Classes.section}>
            <label className={Classes.name}>Item Name</label>
            <input
              type="text"
              {...register("itemName")}
              className={Classes.textBox}
            />
          </div>
          {errors.itemName && (
            <p className={Classes.errorMsg}>{errors.itemName.message}</p>
          )}
        </div>
        <div>
          <div className={Classes.section}>
            <label className={Classes.name}>Price</label>
            <input
              type="number"
              step="0.01"
              {...register("itemPrice")}
              className={Classes.textBox}
            />
          </div>
          {errors.itemPrice && (
            <p className={Classes.errorMsg}>{errors.itemPrice.message}</p>
          )}
        </div>
        <div>
          <div className={Classes.section}>
            <label className={Classes.name}>Category</label>
            <select
              {...register("category")}
              className={Classes.selectOption}
              defaultValue=""
            >
              <option value="">Choose</option>
              <option value="ENTREES">Entrees</option>
              <option value="MAINS">Mains</option>
              <option value="KIDS">Kids Special</option>
              <option value="DESSERTS">Desserts</option>
            </select>
          </div>

          {errors.category && (
            <p className={Classes.errorMsg}>{errors.category.message}</p>
          )}
        </div>

        <button type="submit" className={Classes.btn}>
          Add an item
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
