import Classes from "./Customer.module.scss";
import { useState } from "react";
import Menuitems from "../../components/Menu/Menuitems";

const Customer = () => {
  const [tableSelected, setTableSelected] = useState(false);
  const [tableNumber, setTableNumber] = useState<string>("");
  const [hideForm, setHideForm] = useState(true);

  const handleChange = (e: any) => {
    const val = e.target.value;
    setTableNumber(val);
  };
  
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTableSelected(true);
    setHideForm(false);
  };
  return (
    <div className={Classes.background}>
      {hideForm && (
        <form onSubmit={submitHandler} className={Classes.form}>
          <div className={Classes.center}>
            <p className={Classes.title}>Welcome to Spice Corner!</p>
            <div className={Classes.label}>
              <label>Enter Your Table Number</label>
            </div>
            <div>
              <input
                type="number"
                value={tableNumber}
                onChange={handleChange}
                max={12}
                min={1}
                defaultValue={""}
                className={Classes.input}
                placeholder="Enter number from 1 to 12"
                required
              />
            </div>
            <button type="submit" className={Classes.btn}>
              Enter
            </button>
          </div>
        </form>
      )}

      {tableSelected && <Menuitems tableNumber={tableNumber} />}
    </div>
  );
};

export default Customer;
