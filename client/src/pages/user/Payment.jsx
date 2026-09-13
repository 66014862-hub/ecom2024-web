import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomStore from "../../store/ecom-store";
import CheckoutForm from "./CheckoutForm";

const stripeKey = import.meta.env.VITE_STRIPE_PK;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export default function Payment() {
  const token = useEcomStore((s) => s.token);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (token) {
      payment(token)
        .then((res) => {
          if (res.data?.clientSecret) {
            setClientSecret(res.data.clientSecret);
          }
        })
        .catch((err) => {
          console.log("Payment Error:", err.response?.data || err);
        });
    }
  }, [token]);

  const appearance = { theme: "stripe" };

  if (!clientSecret || !stripePromise) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400 text-sm">กำลังโหลดระบบชำระเงิน...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <Elements
        options={{ clientSecret, appearance }}
        stripe={stripePromise}
      >
        <CheckoutForm />
      </Elements>
    </div>
  );
}
