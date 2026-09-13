import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store"; 
import { saveOrder } from "../../api/user"; 

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  
  // 1. ดึงฟังก์ชัน clearCart ออกมาจาก store
  const clearCart = useEcomStore((state) => state.clearCart);
  const token = useEcomStore((state) => state.token);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        // ยิง API บันทึกออร์เดอร์ลงฐานข้อมูล
        await saveOrder(token, paymentIntent);

        // 2. สั่งเคลียร์สินค้าในตะกร้าตรงนี้ หลังจากชำระเงินและบันทึกออร์เดอร์สำเร็จ
        clearCart();

        toast.success("Payment Success!", {
          position: "top-right",
          autoClose: 2000,
        });

        // หน่วงเวลาเล็กน้อยแล้วพาไปหน้าประวัติการสั่งซื้อ
        setTimeout(() => {
          window.location.href = "/user/history";
        }, 1500);
      } catch (err) {
        console.log("Error saving order:", err);
        setMessage(
          "ชำระเงินสำเร็จ แต่เกิดข้อผิดพลาดในการบันทึกประวัติคำสั่งซื้อ",
        );
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" />

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50 cursor-pointer"
      >
        <span id="button-text">
          {isLoading ? "กำลังดำเนินการ..." : "Pay now"}
        </span>
      </button>

      {message && (
        <div id="payment-message" className="text-red-500 text-sm mt-2">
          {message}
        </div>
      )}
    </form>
  );
}