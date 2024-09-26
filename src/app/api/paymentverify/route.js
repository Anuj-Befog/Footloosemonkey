import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req, res) {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    const body = razorpay_order_id + " | " + razorpay_payment_id;
    console.log("id == ", body)

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        return NextResponse.json({
            message: "success"
        }, {
            status: 200,
        })
    }
    else {
        return NextResponse.json({
            message: "fail"
        }, {
            status: 400,
        })
    }
}