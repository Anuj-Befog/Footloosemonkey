import connectToDB from "@/app/db/connectToDB";
import Admin from "@/app/models/Admin";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        await connectToDB();
        const extractData = await req.json();

        const { _id, selectedValue } = extractData; // Include _id in the incoming data
        console.log(_id);

        // Check if the document with the given _id exists
        const existingEntry = await Admin.findOne({ _id });

        if (existingEntry) {
            // If it exists, update the existing entry
            existingEntry.talent = selectedValue; // Update the talent
            const updatedEntry = await existingEntry.save(); // Save the updated entry

            return NextResponse.json({
                success: true,
                message: "Data Updated Successfully.",
                data: updatedEntry
            });
        } else {
            // If it does not exist, create a new entry
            const admin = new Admin({ _id, talent: selectedValue }); // Include _id in the new document

            // Create a new Admin document with the selectedValue
            const result = await admin.save();

            return NextResponse.json({
                success: true,
                message: "Data Saved Successfully.",
                data: result
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
