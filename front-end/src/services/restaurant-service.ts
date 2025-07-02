
import axios from "axios";
export interface Menu{
    itemName:string,
    itemPrice:string,
    category:"ENTREES" | "MAINS" |"KIDS"| "DESSERTS";
}

export const postMenu = async(data:Menu)=>
{
   try{
    const response = await axios.post("http://localhost:8080/menu", data, {
        headers:{
            "Content-Type":"application/json",
        },
    });
    return response.data as Menu;
   }
   catch(error:any)
   {
     if (error.response) {
      throw new Error(error.response.data || "Something went wrong!");
    }
    throw new Error("Something went wrong!");
   }
}

export const getMenu = async ()=>{
   try{
      const response=  await axios.get("http://localhost:8080/menu");
      return response.data;
   }
   catch(err){
         console.error("Failed to fetch menu:", err);
         throw err;
   }
}

