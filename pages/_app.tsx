import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FC } from "react";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);


function MyApp({ Component, pageProps }: AppProps) {
    const store: any = useStore();
    return process.browser ? (
        <PersistGate loading={null} persistor={store.__persistor}>
            <Elements stripe={stripePromise}>
                <Component {...pageProps} />
            </Elements>
        </PersistGate>
      ) : (
        <PersistGate persistor={store}>
            <Elements stripe={stripePromise}>
                <Component {...pageProps} />
            </Elements>
        </PersistGate>
      );
}

export default wrapper.withRedux(MyApp);
