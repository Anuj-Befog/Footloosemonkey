import connectToDB from "@/app/db/connectToDB";
import Admin from "@/app/models/Admin";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        await connectToDB();
        const extractData = await req.json();

        // Destructure required fields from the incoming data
        const { _id, selectedTalent, selectedPrice } = extractData; 

        // Log the selected price for debugging
        console.log("Selected Price:", selectedPrice);
        console.log("Selected Talent:", selectedTalent);

        // Check if the document with the given _id exists
        const existingEntry = await Admin.findOne({ _id });

        if (existingEntry) {
            // If it exists, update the existing entry
            existingEntry.talent = selectedTalent; // Update the talent
            existingEntry.price = selectedPrice; // Update the price

            const updatedEntry = await existingEntry.save(); // Save the updated entry

            return NextResponse.json({
                success: true,
                message: "Data Updated Successfully.",
                data: updatedEntry
            });
        } else {
            // If it does not exist, create a new entry
            const admin = new Admin({ _id, talent: selectedTalent, price: selectedPrice }); // Include _id in the new document

            // Create a new Admin document with the selectedValue
            const result = await admin.save();

            return NextResponse.json({
                success: true,
                message: "Data Saved Successfully.",
                data: result
            });
        }

    } catch (e) {
        console.error("Error in POST:", e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
}
