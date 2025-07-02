package nology.io.restaurant.menu;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "menu")
public class Menu {

public enum CategoryList{
    ENTREES,
    MAINS,
    KIDS,
    DESSERTS
}

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(nullable = false)
private String itemName;

@Column(nullable = false)
private  double itemPrice;

@Column(nullable = false)
@Enumerated(EnumType.STRING)
private CategoryList category;

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
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

public CategoryList getCategory() {
    return category;
}

public void setCategory(CategoryList category) {
    this.category = category;
}

public Menu() {
}

public Menu(Long id, String itemName, double itemPrice, CategoryList category) {
    this.id = id;
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.category = category;
}

}
