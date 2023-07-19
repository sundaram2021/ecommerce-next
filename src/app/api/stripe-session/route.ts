import { Cart } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
  apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest, res: Response) {
  const body = await request.json();
  console.log('key', key);
  
  console.log(body);
  try {
    if (body.length > 0) {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
            { shipping_rate: "shr_1NUx6YSEmHXza13po0IfkEo0"},
            { shipping_rate: "shr_1NUxBrSEmHXza13pCt3jXC2n"}
            
        ],
        invoice_creation: {
          enabled: true,
        },
        line_items: body.map((item: Cart) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                // images: [item.img]
              },
              unit_amount: item.price * 100,
            },
            quantity: item.qty,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
          };
        }),
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${request.headers.get("origin")}/?success=true`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      });
      console.log(session);

    //   if(!session) return NextResponse.json({ message: "No Data Found" });
    // request.headers.set("Access-Control-Allow-Origin", "*");
    return NextResponse.json({session});
    } else {
      return NextResponse.json({ message: "No Data Found" });
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}