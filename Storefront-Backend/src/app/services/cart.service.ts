import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  qty: number;
}

const STORAGE_KEY = 'mystore_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  items$ = this.itemsSubject.asObservable();

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private persist(items: CartItem[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  addToCart(product: Product, qty: number = 1) {
    const items = [...this.itemsSubject.value];
    const existingItem = items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      items.push({ product, qty });
    }

    this.itemsSubject.next(items);
    this.persist(items);
  }

  updateQty(productId: number, qty: number) {
    const items = this.itemsSubject.value.map(item =>
      item.product.id === productId ? { ...item, qty } : item
    ).filter(item => item.qty > 0);

    this.itemsSubject.next(items);
    this.persist(items);
  }

  remove(productId: number) {
    const items = this.itemsSubject.value.filter(item => item.product.id !== productId);
    this.itemsSubject.next(items);
    this.persist(items);
  }

  clear() {
    this.itemsSubject.next([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  getTotal(): number {
    return this.itemsSubject.value.reduce(
      (total, item) => total + (item.product.price * item.qty), 0
    );
  }

  getTotalItems(): number {
    return this.itemsSubject.value.reduce(
      (total, item) => total + item.qty, 0
    );
  }

  getItems(): CartItem[] {
    return this.itemsSubject.value;
  }
}
