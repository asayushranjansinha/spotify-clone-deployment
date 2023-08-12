// Import the loadStripe and Stripe types from the '@stripe/stripe-js' module
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Declare a variable called stripePromise as a Promise that resolves to either a Stripe instance or null
let stripePromise: Promise<Stripe | null>;

// Define a function called getStripe that returns the stripePromise
export const getStripe = () => {
  if (!stripePromise) {
    // If stripePromise is not defined, assign it the result of calling loadStripe with the value of the NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
    );
  }

  return stripePromise;
};
