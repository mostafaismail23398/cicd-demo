package com.demo.orders.kafka;

import com.demo.orders.model.Order;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderEventProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    @Value("${app.kafka.topic.order-events}")
    private String topic;

    public OrderEventProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishOrderCreated(Order order) {
        String message = String.format(
                "{\"orderId\":%d,\"customerName\":\"%s\",\"product\":\"%s\",\"quantity\":%d}",
                order.getId(), order.getCustomerName(), order.getProduct(), order.getQuantity()
        );
        kafkaTemplate.send(topic, order.getId().toString(), message);
    }
}
