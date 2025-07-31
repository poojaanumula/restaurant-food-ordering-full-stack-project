import { postMenu } from "../../services/restaurant-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuItemSchema, type MenuItem } from "./SchemaFile";
import Classes from "./Dashboard.module.scss";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuItem>({
    resolver: zodResolver(menuItemSchema),
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.success("Enter username and password");
      return;
    }

    try {
      await axios.get("http://localhost:8080/menu", {
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
      });
      setLoggedIn(true);
    } catch (error) {
      toast.success("Invalid username or password");
      setLoggedIn(false);
    }
  };
  const onSubmit = (data: MenuItem) => {
    postMenu(data, username, password)
      .then(() => {
        toast.success("Menu item added");
        reset();
      })
      .catch((err) => {
        console.error("Add failed:", err);
        toast.success("Add failed: Check credentials or data");
      });
  };
  if (!loggedIn) {
    return (
      <div className={Classes.background}>
        <h2 className={Classes.title}>Login</h2>
        <form onSubmit={handleLoginSubmit} data-testid="login-form">
          <div className={Classes.section}>
            <label className={Classes.name}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={Classes.textBox}
              required
            />
          </div>
          <div className={Classes.section}>
            <label className={Classes.name}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={Classes.textBox}
              required
            />
          </div>
          <button type="submit" className={Classes.btn}>
            Login
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className={Classes.background} title="form">
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
