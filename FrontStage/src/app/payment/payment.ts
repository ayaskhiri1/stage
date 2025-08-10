import { Component } from '@angular/core';
import { PaymentService } from '../_services/payment.service';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {

   constructor(private paymentService: PaymentService) {}

  startPayment() {
    const priceId = 'price_123456789'; // 🔹 Ton Price ID Stripe
    const successUrl = 'http://localhost:4200/payment-success';
    const cancelUrl = 'http://localhost:4200/payment-cancel';
    const certificationTitle = 'Formation Spring Boot'; // 🔹 Ce qui sera stocké dans Stripe

    this.paymentService.createCheckoutSession(priceId, successUrl, cancelUrl, certificationTitle)
      .subscribe(response => {
        if (response.checkoutUrl) {
          window.location.href = response.checkoutUrl; // 🔹 Redirection vers Stripe
        }
      });
  }

}
