import connectToDB from "../../../db/connectToDB";
import Admin from "../../../models/Admin";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        await connectToDB();
        const extractData = await req.json();

        // Destructure required fields from the incoming data
        const { _id, selectedTalent, selectedACharges, selectedBCharges, selectedCCharges } = extractData; 

        // Check if the document with the given _id exists
        const existingEntry = await Admin.findOne({ _id });

        if (existingEntry) {
            // If it exists, update the existing entry
            existingEntry.talent = selectedTalent; // Update the talent
            existingEntry.groupACharge = selectedACharges; // Update the charges of Group A 
            existingEntry.groupBCharge = selectedBCharges; // Update the charges of Group B
            existingEntry.groupCCharge = selectedCCharges; // Update the charges of Group C

            const updatedEntry = await existingEntry.save(); // Save the updated entry

            return NextResponse.json({
                success: true,
                message: "Data Updated Successfully.",
                data: updatedEntry
            });
        } else {
            // If it does not exist, create a new entry
            const admin = new Admin({ _id, talent: selectedTalent, groupACharge: selectedACharges, groupBCharge: selectedBCharges, groupCCharge: selectedCCharges }); // Include _id in the new document

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
