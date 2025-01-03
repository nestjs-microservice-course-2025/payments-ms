import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.stripeSecret);

  async createPaymentSession() {
    const session = await this.stripe.checkout.sessions.create({
      metadata: {
        order_id: 'ord_1I5x0o2eZvKYlo2C',
      },
      currency: 'usd',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: 1000,
            product_data: {
              name: 'T-Shirt',
            },
          },
          quantity: 2,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3003/payments/success',
      cancel_url: 'http://localhost:3003/payments/cancelled',
    });
    return session;
  }
}
