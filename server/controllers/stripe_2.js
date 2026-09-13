const prisma = require("../config/prisma");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.payment = async (req, res) => {
  try {
    const userId = Number(req.user.id);

    // 1. ค้นหาตะกร้าสินค้าของผู้ใช้จริง
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: userId,
      },
      select: {
        cartTotal: true,
      },
    });

    // 2. ถ้าไม่มีตะกร้า หรือยอดรวมเป็น 0 ให้แจ้งเตือนกลับไป
    if (!cart || cart.cartTotal <= 0) {
      return res.status(400).json({ message: "Cart is empty or invalid total" });
    }

    // 3. แปลงยอดรวมจากบาทเป็นสตางค์ตามราคาสินค้าจริงในตะกร้า
    const amountTHB = Math.round(cart.cartTotal * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTHB,
      currency: "thb",
      payment_method_types: ["card", "promptpay"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log("Stripe Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};