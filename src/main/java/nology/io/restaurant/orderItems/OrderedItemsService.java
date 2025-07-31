package nology.io.restaurant.orderItems;

import org.springframework.stereotype.Service;

@Service 
public class OrderedItemsService {

  private OrderedItemsRepository orderedItemsRepository;
  public OrderedItemsService(OrderedItemsRepository orderedItemsRepository) {
        this.orderedItemsRepository = orderedItemsRepository;
    }
  public OrderedItems createOrderItem(OrderedItems orderItem) {
        return orderedItemsRepository.save(orderItem);
    }



}
