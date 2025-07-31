package nology.io.restaurant.orderItems;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

public class OrderItemsServiceTest {
    
    @Mock
    private OrderedItemsRepository orderedItemsRepository;

    @Spy
    @InjectMocks
    private OrderedItemsService orderedItemsService;

    @BeforeEach
    public void setUp()
    {
       MockitoAnnotations.openMocks(this);
    }

    @Test
    public void CreateOrderITems_Calling_Save()
    {
        OrderedItems orderedItems= new OrderedItems();
         orderedItems.setItemName("Pani Puri");
         orderedItems.setItemPrice(15.0);
         when(orderedItemsRepository.save(orderedItems)).thenReturn(orderedItems);
         OrderedItems result = orderedItemsService.createOrderItem(orderedItems);
         verify(orderedItemsRepository).save(orderedItems);
         assertEquals(orderedItems, result);
    }

}
