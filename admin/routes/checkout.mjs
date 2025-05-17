import { Router } from "express";
import Stripe from "stripe";
import "dotenv/config";
const router = Router();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

router.post("/checkout", async (req, res) => {
  try {
    console.log('Creating Stripe instance with key:', stripeSecretKey.substring(0, 10) + '...');
    const stripe = new Stripe(stripeSecretKey);
    
    const { items, email } = await req.body;
    console.log('Received items:', items);

    const extractingItems = await items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.discountedPrice * 100,
        product_data: {
          name: item.name,
          description: item.description,
          images: item.images,
        },
      },
    }));

    console.log('Creating checkout session...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        email,
      },
    });

    console.log('Session created successfully:', session.id);
    res.json({
      message: "Server is connected",
      success: true,
      id: session.id,
    });
  } catch (error) {
    console.error("Stripe error details:", {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode
    });
    res.status(500).json({ error: error.message });
  }
});

export default router;