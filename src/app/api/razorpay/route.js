import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

export async function GET() {

    const payment_capture = 1;
    const amount = 799 * 100 // amount in paisa. In our case it's INR 1
    const currency = "INR";
    const options = {
        amount: (amount).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            // These notes will be added to your transaction. So you can search it within their dashboard.
            // Also, it's included in webhooks as well. So you can automate it.
            paymentFor: "",
            userId: "",
            productId: ""
        }
    };

    const order = await instance.orders.create(options);
    return NextResponse.json({ msg: "success", order });
}

export async function POST(req) {
    const body = await req.json();
    const { amount } = body; // Get the amount from the request body

    const payment_capture = 1;
    const currency = "INR";
    const options = {
        amount: amount.toString(), // Use the amount passed from the request
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            paymentFor: "",
            userId: "",
            productId: ""
        }
    };

    const order = await instance.orders.create(options);
    return NextResponse.json({ msg: "success", order });
}