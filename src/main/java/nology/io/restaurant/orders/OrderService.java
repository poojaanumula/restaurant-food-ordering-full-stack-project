package nology.io.restaurant.orders;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import nology.io.restaurant.menu.Menu;

@Service
public class OrderService {

private OrderRepository orderRepository;

public OrderService(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
}

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
    
    public List<Order> getAllOrders() {
        return this.orderRepository.findAll();
    }
    
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Optional<Order> updateOrder = orderRepository.findById(id);
        if (updateOrder.isPresent()) {
            Order order = updateOrder.get();
            order.setStatus(status);
            return orderRepository.save(order);
        }
        throw new RuntimeException("Order not found");
    }

    
public void deleteOrderById(Long id) {
    orderRepository.deleteById(id);
}
}

