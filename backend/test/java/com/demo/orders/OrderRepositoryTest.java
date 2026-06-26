package com.demo.orders;

import com.demo.orders.model.Order;
import com.demo.orders.repository.OrderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ActiveProfiles("test")
class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void savesAndRetrievesOrder() {
        Order order = new Order("Mostafa", "Laptop", 2);
        Order saved = orderRepository.save(order);

        assertNotNull(saved.getId());
        assertEquals("Mostafa", saved.getCustomerName());
        assertEquals(2, saved.getQuantity());
    }
}
