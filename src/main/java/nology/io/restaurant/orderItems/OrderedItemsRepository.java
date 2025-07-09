package nology.io.restaurant.orderItems;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderedItemsRepository extends JpaRepository<OrderedItems,Long> {

}
