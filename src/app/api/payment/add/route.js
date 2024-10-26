import connectToDB from "../../../db/connectToDB";
import Payment from "../../../models/Payment";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        await connectToDB();

        // Extract data from the request body
        const { email, participantName, ageCriteria, participantAge, guardianNumber, address, talent, charge, paymentId, status } = await req.json();

        // Create a new Contact document
        const payment = new Payment({ email, participantName, ageCriteria, participantAge, guardianNumber, address, talent, charge, paymentId, status });

        // Save the document to the database
        const result = await payment.save();

        // Check if the data was saved successfully
        if (result) {
            return NextResponse.json({
                success: true,
                message: "Data Saved Successfully.",
                data: result
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again."
            });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
}