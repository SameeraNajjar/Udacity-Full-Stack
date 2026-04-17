import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product;
  @Output() productAdded = new EventEmitter<void>();

  qty = 1;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  addToCart() {
    const quantity = Math.max(1, Math.floor(this.qty));
    this.cartService.addToCart(this.product, quantity);
    this.toastr.success(`${this.product.name} added to cart!`, 'Success');
    this.productAdded.emit(); // إعلام المكون الأب
  }
}
