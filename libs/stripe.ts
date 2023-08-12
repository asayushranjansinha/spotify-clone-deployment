// Import the Stripe library
import Stripe from 'stripe';

// Create a new instance of the Stripe class with the following options:
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ?? '', // Use the value of the STRIPE_SECRET_KEY environment variable as the secret key
  {
    apiVersion: '2022-11-15', // Set the API version to '2022-11-15'
    appInfo: {
      name: 'Spotify Clone', // Set the name of the app to 'Spotify Clone'
      version: '0.1.0' // Set the version of the app to '0.1.0'
    }
  }
);
