import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json();
    const apiKey = process.env.STRIPE_SECRET_KEY;

    if (!apiKey) {
      return NextResponse.json({ url: "https://stripe.com/payments/checkout" });
    }

    const params = new URLSearchParams();
    params.append("payment_method_types[]", "card");
    params.append("mode", "payment");
    params.append("line_items[0][price_data][currency]", "usd");
    params.append("line_items[0][price_data][product_data][name]", "Emergency Blood Verification Fee");
    params.append("line_items[0][price_data][product_data][description]", "Verification Request ID: " + (requestId || "REQ-LIVE"));
    params.append("line_items[0][price_data][unit_amount]", "1500");
    params.append("line_items[0][quantity]", "1");
    params.append("success_url", "https://frontend-fullstack-project-assignme-seven.vercel.app/recipient/history");
    params.append("cancel_url", "https://frontend-fullstack-project-assignme-seven.vercel.app/recipient/payment");

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data && data.url) {
      return NextResponse.json({ url: data.url });
    }

    return NextResponse.json({ url: "https://stripe.com/payments/checkout" });
  } catch {
    return NextResponse.json({ url: "https://stripe.com/payments/checkout" });
  }
}
