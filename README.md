## Stripe Docs

- Stripe API keys setup: https://dashboard.stripe.com/apikeys
- Stripe API documentation: https://docs.stripe.com/api/checkout/sessions/create

## To run the microservice in DEV:

- Create a new Stripe account
- Create a new API key and copy the secret key
- Set the secret keys in the `.env` file according to the `.env.template` file
- Run the microservice
- If it's not set, create a new connection on https://dashboard.hookdeck.com/connections, name it 'stripe-to-localhost'
  - Point it to the `/payments/webhook` endpoint
- Execute the following command in the console to call to the hookdeck CLI and proxy the requests from Stripe: `hookdeck listen 3003 stripe-to-localhost`
  - 3003 is the port of the microservice
- When hookdeck is running it will print the URL to call to the webhooks, something in this form: https://hkdk.events/0xuwfisfr8ri1x
  - Copy the URL and paste it in the webhooks URL field in Stripe
  - Save the webhooks
- Run the payments-ms microservice with `npm run start:dev`

## To test the payments-ms microservice:

- Create a new payment session on the endpoint `/payments/create-payment-session`
- Pay it in Stripe
- You should see the webhooks being called
