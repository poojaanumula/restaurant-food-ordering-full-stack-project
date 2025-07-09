package nology.io.restaurant.orderItems;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import nology.io.restaurant.menu.Menu;
import nology.io.restaurant.orders.Order;
import nology.io.restaurant.orders.OrderService;

@RestController
@RequestMapping("/orderedItems")
public class OrderedItemsController {

private OrderService orderService;

    public OrderedItemsController(OrderService orderService) {
    this.orderService = orderService;
}

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order savedOrder = orderService.saveOrder(order);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }
   
}
