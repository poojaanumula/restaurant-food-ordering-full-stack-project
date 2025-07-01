import { useState } from "react"


const Dashboard = () => {
const[itemName, setItemName]= useState('');
const [price, setPrice] = useState('');
const [category,setCategory] = useState('');

const submitHandler=(e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
   console.log(itemName, price, category);
   setItemName('');
   setPrice('');
   setCategory('');
}

  return (
    <div>
       Add a new Item 
       <form onSubmit={submitHandler}>
        <div>
          <label>Item Name</label>
          <input type="text" value={itemName} onChange={(e)=> setItemName(e.target.value)} required/>
        </div>
        <div>
          <label>Price</label>
          <input type="number" value={price} onChange={(e)=> setPrice(e.target.value)} required/>
        </div>
        <div>
          <label>Category</label>
          <select value={category} onChange={(e)=>setCategory(e.target.value)} required >
            <option value="">Choose</option>
            <option value="entrees">Entrees</option>
            <option value="mains" >Mains</option>
            <option value="kids">Kids Special</option>
            <option value="desserts">Desserts</option>
          </select>
        </div>
        <div>
          <button type="submit">Add an item</button>
        </div>
       </form>
    </div>
  )
}

export default Dashboard
