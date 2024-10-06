import connectToDB from "@/app/db/connectToDB";
import Payment from "@/app/models/Payment";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        await connectToDB();
        const extractData = await Payment.find();
        if (extractData) {
            return NextResponse.json({
                success: true,
                data: extractData
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: "Something goes wrong! Please try again."
            })
        }
    } catch (e) {
        console.log(e)

        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again.'
        })
    }
}