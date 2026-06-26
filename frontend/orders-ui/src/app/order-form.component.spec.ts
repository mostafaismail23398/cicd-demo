import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderFormComponent } from './order-form.component';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFormComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an empty new order', () => {
    expect(component.newOrder.customerName).toBe('');
    expect(component.newOrder.quantity).toBe(1);
  });

  it('should reset the form after submitting an order', () => {
    component.newOrder = { customerName: 'Test', product: 'Widget', quantity: 5 };
    fixture.detectChanges();
    expect(component.newOrder.customerName).toBe('Test');
  });
});
