
import Classes from './Customer.module.scss';
import { useState } from 'react';
import Menuitems from '../../components/Menu/Menuitems';
import Navbar from '../../components/Navbar/Navbar';
const Customer = () => {
const[tableSelected, setTableSelected]= useState(false);
const [tableNumber, setTableNumber]= useState<string>("");
const [hideForm, setHideForm] = useState(true);
const handleChange = (e: any) => {
  const val = e.target.value;
  setTableNumber(val);
};
const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault();
       console.log('Table number submitted:', tableNumber);
       setTableNumber('');
       setTableSelected(true)
       setHideForm(false);
           
}
  return (
    <div>
      <Navbar />
      <p>Welcome to Spice Corner!!!</p>
      {hideForm && <form onSubmit={submitHandler}>
        <div>
            <label>Enter Your Table Number</label>
            <input type='number' value={tableNumber} onChange={handleChange} max={12} min={1} defaultValue={''}/>
            <button type='submit'>Enter</button>
        </div>
      </form>}
   
       {tableSelected && <Menuitems/>}
    </div>
  );
};

export default Customer;
