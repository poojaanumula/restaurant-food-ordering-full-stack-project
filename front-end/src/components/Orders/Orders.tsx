import { useState } from 'react';
import Classes from './Orders.module.scss';
import { useNavigate } from 'react-router-dom';

interface selectedItemsByUser{ 
    selectedItems: { itemName: string; itemPrice: string }[];
    deleteItem : (itemName:string, itemPrice:string) => void;

}

const Orders = ({selectedItems, deleteItem}:selectedItemsByUser) => {
const [orderStatus, setOrderStatus] = useState('')
 const placeOrder=()=>{
      setOrderStatus('your order is placed..')
 }
  let total = selectedItems.reduce((acc,item)=> acc + Number(item.itemPrice),0);
  return (
    <div>
      <h3>View Your Order</h3>
       { selectedItems.length>0 && selectedItems.map((item)=>(
        <div>{item.itemName} - {item.itemPrice}$ -<button className={Classes.delete} onClick={()=>deleteItem(item.itemName, item.itemPrice)}>Delete</button></div>
       ))}
        <h3>Total : {total}$</h3>
        <button className={Classes.delete} onClick={()=> placeOrder() }>Place Order...</button>
        
    </div>
  )
}

export default Orders
