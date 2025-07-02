import { useEffect, useState } from "react"
import { getMenu } from "../../services/restaurant-service";
import type { Menu } from "../../services/restaurant-service";
import Classes from  './Menuitems.module.scss';
import Orders from "../Orders/Orders";

const Menuitems = () => {
  const [menuItems,setMenuItems]= useState<Menu[]>([]);
  const [selectedItem, setSelectedItem] = useState<{itemName:string, itemPrice:string}[]>([]);
  const [clicked, setClicked] = useState(false)
  useEffect(
    ()=>{
       const fetchMenu = async ()=>{

        try{
           const response = await getMenu();
           setMenuItems(response)
        }
        catch(err){
            console.error("Failed to fetch menu:", err);
        }
         
       }
       fetchMenu()
    }, []
  );
  const addItem = (itemName:string,itemPrice:string)=>{
       setSelectedItem(prev =>[...prev, {itemName, itemPrice}]);
  }
   console.log(selectedItem)
   
  const deleteItem = (itemName:string, itemPrice:string) => {
     setSelectedItem(prev => prev.filter(item => !(item.itemName === itemName && item.itemPrice === itemPrice)))
  }
  const entrees =  menuItems.filter((item)=>item.category === 'ENTREES')
  const mains   = menuItems.filter((item)=>item.category === 'MAINS')
  const kids   = menuItems.filter((item)=>item.category === 'KIDS')
  const desserts   = menuItems.filter((item)=>item.category === 'DESSERTS')

  return (
    <>
      <div>
        {selectedItem.length>0 && <button className={Classes.orders} onClick={()=> setClicked(true)}>View Your Order{selectedItem.length}</button>}
       
        <h3>ENTREES</h3>
          {entrees.map((item, index)=>(
            <div key={index}>{item.itemName} - {item.itemPrice}$ - <button className={Classes.btn} onClick={()=>addItem(item.itemName, item.itemPrice)}>+</button></div>
            
          ))}
      </div>
      <hr />
        <div>
        <h3>MAINS</h3>
          {mains.map((item, index)=>(
            <div key={index}>{item.itemName} - {item.itemPrice}$ - <button className={Classes.btn} onClick={()=>addItem(item.itemName, item.itemPrice)}>+</button></div>
          ))}
      </div>
      <hr />
        <div>
        <h3>KIDS</h3>
          {kids.map((item, index)=>(
            <div key={index}>{item.itemName} - {item.itemPrice}$ - <button className={Classes.btn} onClick={()=>addItem(item.itemName, item.itemPrice)}>+</button></div>
          ))}
      </div>
      <hr />
        <div>
        <h3>DESSERTS</h3>
          {desserts.map((item, index)=>(
            <div key={index}>{item.itemName} - {item.itemPrice}$ - <button className={Classes.btn} onClick={()=>addItem(item.itemName,item.itemPrice)}>+</button></div>
          ))}
      </div>
      <hr />
      {clicked && selectedItem.length > 0 && <Orders selectedItems= {selectedItem} deleteItem = {deleteItem}/> }
    </>
  
  )
}

export default Menuitems
