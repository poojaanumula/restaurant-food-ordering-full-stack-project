import { z } from "zod";

export const menuItemSchema = z.object({
  itemName: z.string().trim().min(1, "Item name is required"),
  itemPrice: z.string().refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      { message: "Price must be a positive number" }
    ),

  category: z.enum(["ENTREES", "MAINS", "KIDS", "DESSERTS"], {
    required_error: "Category is required",
  }),
});

export type MenuItem = z.infer<typeof menuItemSchema>; 
