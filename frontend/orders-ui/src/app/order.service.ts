import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id?: number;
  customerName: string;
  product: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly apiUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  listOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
}
