import Stripe from "stripe";
import {
  manageUserPointsChange,
  manageUserOrderChange,
} from "@/utils/supabase/admin";
import { headers } from "next/headers";

export const runtime = "edge";

const relevantEvents = new Set([
  "checkout.session.completed",
  "payment_intent.canceled",
  "payment_intent.payment_failed",
  "payment_intent.processing",
  "payment_intent.created",
]);

export async function POST(req: Request) {
  const { stripe } = require("@/utils/stripe/config");
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    if (!sig || !webhookSecret)
      return new Response("Webhook secret not found.", { status: 400 });
    const event = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      webhookSecret
    );
    console.log(`🔔  Webhook received: ${event.type}`);

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case "payment_intent.canceled":
          case "payment_intent.payment_failed":
          case "payment_intent.processing":
          case "payment_intent.created":
            const payment = event.data.object as Stripe.PaymentIntent;
            console.log("payment账单信息", payment);
            await manageUserOrderChange(payment);
            break;
          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;
            console.log("checkoutSession", checkoutSession);
            if ((checkoutSession.mode = "payment")) {
              await manageUserPointsChange(checkoutSession);
            }
            break;
          default:
            throw new Error("Unhandled relevant event!");
        }
      } catch (error) {
        console.log(error);
        return new Response(
          "Webhook handler failed. View your Next.js function logs.",
          {
            status: 400,
          }
        );
      }
    } else {
      return new Response(`Unsupported event type: ${event.type}`, {
        status: 400,
      });
    }
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
  return new Response(JSON.stringify({ received: true }));
}
