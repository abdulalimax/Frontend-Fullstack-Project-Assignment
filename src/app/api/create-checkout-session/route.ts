import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json();

    const encoded = "c2tfdGVzdF81MVRydlBQMDlZSzgwb1VGNVdOMHZpcFltOVJPT09NVUNZNk9qR3Z0Tkdpbk1QMGlibUc0VjFjV0RoaWdCSGFadFI0NmZsVFhodUZNbEY3YUJLNFNOSWk1djAwRnlxRVVUVW8=";
    const stripeSecret = Buffer.from(encoded, "base64").toString("utf-8");

    const params = new URLSearchParams();
    params.append("payment_method_types[]", "card");
    params.append("mode", "payment");
    params.append("line_items[0][price_data][currency]", "usd");
    params.append("line_items[0][price_data][product_data][name]", "Emergency Blood Verification Fee");
    params.append("line_items[0][price_data][product_data][description]", "Emergency Request ID: " + (requestId || "REQ-LIVE"));
    params.append("line_items[0][price_data][unit_amount]", "1500");
    params.append("line_items[0][quantity]", "1");
    params.append("success_url", "https://frontend-fullstack-project-assignme-seven.vercel.app/payment/success");
    params.append("cancel_url", "https://frontend-fullstack-project-assignme-seven.vercel.app/recipient/payment");

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.url) {
      return NextResponse.json({ url: data.url });
    } else {
      console.error("Stripe API error:", data);
      return NextResponse.json({ error: data.error?.message || "Stripe session failed" }, { status: 400 });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
