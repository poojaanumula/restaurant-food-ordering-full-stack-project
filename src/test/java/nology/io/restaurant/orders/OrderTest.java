package nology.io.restaurant.orders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

import nology.io.restaurant.orderItems.OrderedItems;
import nology.io.restaurant.orders.Order.OrderStatus;

public class OrderTest {
    
    @Mock
    private OrderRepository orderRepository;

    @Spy
    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    public void setUp()
    {
       MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getAllOrders_Calling_FindAll()
    {
        orderService.getAllOrders();
        verify(orderRepository).findAll();
    }

    @Test
    public void getOrderById_Calling_FindByID()
    {
        orderService.getOrderById(1L);
        verify(orderRepository).findById(1L);
    }

    @Test
    public void getDeleteById_Calling_DeleteByID()
    {
        orderService.deleteOrderById(1L);
        verify(orderRepository).deleteById(1L);
    }

   @Test
   public void saveOrder_Calling_SaveMethod()
   { 

    OrderedItems item1 = new OrderedItems();
    item1.setItemName("Papads");
    item1.setItemPrice(20.0);

    OrderedItems item2 = new OrderedItems();
    item2.setItemName("Rasam");
    item2.setItemPrice(20.0);

    List<OrderedItems> itemsList = new ArrayList<>();
    itemsList.add(item1);
    itemsList.add(item2);

     Order order =  new Order();
     order.setTableNumber(3);
     order.setStatus(OrderStatus.PLACED);
     order.setItems(null);
     when(orderRepository.save(order)).thenReturn(order);
      Order result = orderService.saveOrder(order);
      verify(orderRepository).save(order);
      assertEquals(order, result);
   }

@Test
public void updateOrderStatus_shouldUpdateStatusAndSaveOrder() {
    Long orderId = 1L;
    Order existingOrder = new Order();
    existingOrder.setId(orderId);
    existingOrder.setStatus(OrderStatus.PLACED);
    when(orderRepository.findById(orderId)).thenReturn(Optional.of(existingOrder));
    when(orderRepository.save(existingOrder)).thenReturn(existingOrder);
    Order updatedOrder = orderService.updateOrderStatus(orderId, OrderStatus.READY);
    assertEquals(OrderStatus.READY, updatedOrder.getStatus()); 
    verify(orderRepository).findById(orderId);                 
    verify(orderRepository).save(existingOrder);               
}

}