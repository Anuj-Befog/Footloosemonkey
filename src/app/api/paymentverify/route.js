import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

export async function POST(req) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({
                message: "Missing required parameters",
            }, { status: 400 });
        }

        // Create the body string for signature verification
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        console.log("Signature validation body:", body);

        // Create the expected HMAC signature
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET) // Check if the secret is correctly loaded
            .update(body)
            .digest("hex");

        console.log("Expected Signature:", expectedSignature);
        console.log("Received Signature:", razorpay_signature);

        // Check if the signature is authentic
        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            console.log("Payment is authentic");

            // Return a success message
            return NextResponse.json({
                message: "Payment verification successful",
            }, {
                status: 200,
            });

        } else {
            // Log a descriptive error message
            console.log("Signature mismatch. Payment verification failed.");

            return NextResponse.json({
                message: "Payment verification failed",
            }, {
                status: 400,
            });
        }

    } catch (error) {
        console.error("Error occurred in payment verification:", error.message);

        return NextResponse.json({
            message: "Error parsing request body or processing verification",
            error: error.message,
        }, { status: 400 });
    }
}
