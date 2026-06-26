import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order, OrderService } from './order.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Create order</h2>
    <form (ngSubmit)="submitOrder()">
      <input [(ngModel)]="newOrder.customerName" name="customerName" placeholder="Customer name" required />
      <input [(ngModel)]="newOrder.product" name="product" placeholder="Product" required />
      <input [(ngModel)]="newOrder.quantity" name="quantity" type="number" placeholder="Quantity" required />
      <button type="submit">Submit order</button>
    </form>

    <h2>Orders</h2>
    <ul>
      <li *ngFor="let order of orders">
        {{ order.customerName }} - {{ order.product }} x{{ order.quantity }}
      </li>
    </ul>
  `
})
export class OrderFormComponent implements OnInit {
  orders: Order[] = [];
  newOrder: Order = { customerName: '', product: '', quantity: 1 };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.listOrders().subscribe(orders => (this.orders = orders));
  }

  submitOrder(): void {
    this.orderService.createOrder(this.newOrder).subscribe(() => {
      this.newOrder = { customerName: '', product: '', quantity: 1 };
      this.loadOrders();
    });
  }
}
