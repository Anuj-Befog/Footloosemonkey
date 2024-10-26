import connectToDB from "../../../db/connectToDB";
import Payment from "../../../models/Payment";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        await connectToDB();

        // Get the email from the query parameters
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        // If email is provided, find records by email
        let extractData;
        if (email) {
            extractData = await Payment.find({ email: email });
        } else {
            extractData = await Payment.find(); // If no email is provided, return all records
        }

        if (extractData && extractData.length > 0) {
            return NextResponse.json({
                success: true,
                data: extractData
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "No records found for the provided email."
            });
        }
    } catch (e) {
        console.log(e);

        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again.'
        });
    }
}
