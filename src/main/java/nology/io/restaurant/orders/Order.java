package nology.io.restaurant.orders;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import nology.io.restaurant.orderItems.OrderedItems;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer tableNumber;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="order_id", nullable = false)
    private List<OrderedItems> items = new ArrayList<>();
    
    public enum OrderStatus {
        PLACED, READY
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.PLACED;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTableNumber() {
        return tableNumber;
    }

    
    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public void setTableNumber(Integer tableNumber) {
        this.tableNumber = tableNumber;
    }

    public List<OrderedItems> getItems() {
        return items;
    }

    public void setItems(List<OrderedItems> items) {
        this.items = items;
    }

    public Order(Long id, Integer tableNumber, List<OrderedItems> items,OrderStatus status) {
        this.id = id;
        this.tableNumber = tableNumber;
        this.items = items;
         this.status = status;
    }

    public Order() {
    }
    
}
