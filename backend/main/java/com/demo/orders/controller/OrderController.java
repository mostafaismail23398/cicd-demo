package com.demo.orders.controller;

import com.demo.orders.kafka.OrderEventProducer;
import com.demo.orders.model.Order;
import com.demo.orders.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderEventProducer orderEventProducer;

    public OrderController(OrderRepository orderRepository, OrderEventProducer orderEventProducer) {
        this.orderRepository = orderRepository;
        this.orderEventProducer = orderEventProducer;
    }

    @GetMapping
    public List<Order> listOrders() {
        return orderRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order saved = orderRepository.save(order);
        orderEventProducer.publishOrderCreated(saved);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
