package nology.io.restaurant.menu;

import jakarta.validation.constraints.*;

public class MenuDTO {

    @NotBlank(message = "Item name is required")
    private String itemName;

    @Positive(message = "Price must be greater than zero")
    private double itemPrice;

    @NotNull(message = "Category is required")
    private Menu.CategoryList category;

    public MenuDTO() {                
    }

    public MenuDTO(String itemName, double itemPrice, Menu.CategoryList category) {
        this.itemName  = itemName;
        this.itemPrice = itemPrice;
        this.category  = category;
    }

    public String getItemName() {
        return itemName;
    }
    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public double getItemPrice() {
        return itemPrice;
    }
    public void setItemPrice(double itemPrice) {
        this.itemPrice = itemPrice;
    }

    public Menu.CategoryList getCategory() {
        return category;
    }
    public void setCategory(Menu.CategoryList category) {
        this.category = category;
    }
}
