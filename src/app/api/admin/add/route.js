import connectToDB from "@/app/db/connectToDB";
import Admin from "@/app/models/Admin";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        await connectToDB();
        const extractData = await req.json();

        // Extract only selectedValue from the incoming data
        const { selectedValue } = extractData;
        
        let admin = new Admin({
            talent: selectedValue
        })

        // Create a new Admin document with just the selectedValue
        const result = await admin.save();

        if (result) {
            return NextResponse.json({
                result: result,
                success: true,
                message: "Data Saved Successfully."
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again."
            });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
}
