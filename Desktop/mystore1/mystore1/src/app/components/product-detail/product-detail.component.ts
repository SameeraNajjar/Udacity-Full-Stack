import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  qty = 1;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private location: Location,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.product = products.find(p => p.id === id);
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to load product details');
        this.loading = false;
      }
    });
  }

  addToCart() {
    if (!this.product) return;

    const quantity = Math.max(1, Math.floor(this.qty));
    this.cartService.addToCart(this.product, quantity);
    this.toastr.success(`${this.product.name} added to cart!`, 'Success');
  }

  goBack() {
    this.location.back();
  }
}
