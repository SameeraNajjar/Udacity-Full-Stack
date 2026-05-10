import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.cartService.items$.subscribe(items => {
      this.items = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) =>
      sum + (item.product.price * item.qty), 0
    );
  }

  updateQty(item: CartItem, newQty: number) {
    if (newQty < 1) {
      this.removeItem(item.product.id);
      return;
    }
    this.cartService.updateQty(item.product.id, newQty);
    this.calculateTotal();
  }

  removeItem(productId: number) {
    this.cartService.remove(productId);
    this.toastr.info('ℹ️ Product removed from cart!', 'Cart Updated');
  }

  getSubtotal(item: CartItem): number {
    return item.product.price * item.qty;
  }
}
