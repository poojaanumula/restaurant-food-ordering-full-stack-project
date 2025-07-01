
import Classes from './Customer.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Customer = () => {
const[tableSelected, setTableSelected]= useState(false);
const [tableNumber, setTableNumber]= useState<number| ''>();
const handleChange = (e: any) => {
  const val = e.target.value;
  setTableNumber(val === '' ? undefined : Number(val));
};
const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault();
       console.log('Table number submitted:', tableNumber);
       setTableNumber('');
       setTableSelected(true)
           
}
  return (
    <div>
      <p>Welcome to Spice Corner!!!</p>
      <form onSubmit={submitHandler}>
        <div>
            <label>Enter Your Table Number</label>
            <input type='number' value={tableNumber} onChange={handleChange} max={12} min={1}/>
            <button type='submit'>Enter</button>
        </div>
      </form>
       {tableSelected && <h2>Select Menu...</h2>}
    </div>
  );
};

export default Customer;
