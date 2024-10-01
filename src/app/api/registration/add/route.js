import connectToDB from "@/app/db/connectToDB";
import Registration from "@/app/models/Registation";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        await connectToDB();
        const extractData = await req.json();

        // Destructure required fields from the incoming data
        const { _id, email, participantName, ageCriteria, participantAge, guardianNumber, address, talent, charges, termsAccepted } = extractData;
        console.log(charges, "Charges")

        // Check if the document with the given _id exists
        const existingEntry = await Registration.findOne({ _id });

        if (existingEntry) {
            // If it exists, update the existing entry
            existingEntry.email = email;
            existingEntry.participantName = participantName;
            existingEntry.ageCriteria = ageCriteria;
            existingEntry.participantAge = participantAge;
            existingEntry.guardianNumber = guardianNumber;
            existingEntry.address = address;
            existingEntry.talent = talent;
            existingEntry.charge = charges;
            existingEntry.termsAccepted = termsAccepted;

            const updatedEntry = await existingEntry.save(); // Save the updated entry

            return NextResponse.json({
                success: true,
                message: "Registration Data Updated Successfully.",
                data: updatedEntry
            });
        } else {
            // If it does not exist, create a new entry
            const newRegistration = new Registration({
                _id, // Include _id in the new document if necessary
                email,
                participantName,
                ageCriteria,
                participantAge,
                guardianNumber,
                address,
                talent,
                charges,
                termsAccepted
            });

            // Save the new Registration document
            const result = await newRegistration.save();

            return NextResponse.json({
                success: true,
                message: "Registration Data Saved Successfully.",
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
