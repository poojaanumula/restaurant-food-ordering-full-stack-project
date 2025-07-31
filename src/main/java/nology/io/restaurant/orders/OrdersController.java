package nology.io.restaurant.orders;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrdersController {

private OrderService orderService;

public OrdersController(OrderService orderService) {
    this.orderService = orderService;
}

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order savedOrder = orderService.saveOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping
     public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> ordersList = orderService.getAllOrders();
        return  new ResponseEntity<>(ordersList, HttpStatus.OK);
    }

    @PatchMapping("/{id}/status")
    public void updateOrderStatus(@PathVariable Long id, @RequestBody Order incomingOrder) {
        Optional<Order> existingOrderOpt = orderService.getOrderById(id);
        if (existingOrderOpt.isEmpty()) {
            return;  
        }
        Order existingOrder = existingOrderOpt.get();
        existingOrder.setStatus(Order.OrderStatus.READY);
        orderService.saveOrder(existingOrder);
    }
    @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
            orderService.deleteOrderById(id);    
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
}


