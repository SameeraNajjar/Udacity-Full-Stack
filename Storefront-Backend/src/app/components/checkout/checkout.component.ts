import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      cardNumber: ['', [
        Validators.required,
        Validators.pattern("^[0-9]{16}$")
      ]],
      expiryDate: ['', [
        Validators.required,
        Validators.pattern("^(0[1-9]|1[0-2])\\/[0-9]{2}$")
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern("^[0-9]{3,4}$")
      ]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.checkoutForm.valid) {
      this.cartService.clear();

      this.router.navigate(['/order-success']);
    }
  }

  get f() {
    return this.checkoutForm.controls;
  }
}
