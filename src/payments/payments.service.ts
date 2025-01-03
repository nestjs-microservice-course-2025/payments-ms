import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto/payment-session.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.stripeSecret);

  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { currency, items } = paymentSessionDto;
    const lineItems = items.map((item) => ({
      price_data: {
        currency,
        unit_amount: Math.ceil(item.price * 100),
        product_data: {
          name: item.name,
        },
      },
      quantity: item.quantity,
    }));
    // return lineItems;
    const session = await this.stripe.checkout.sessions.create({
      metadata: {
        order_id: 'ord_1I5x0o2eZvKYlo2C',
      },
      currency: currency,
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3003/payments/success',
      cancel_url: 'http://localhost:3003/payments/cancelled',
    });
    return session;
  }
}
