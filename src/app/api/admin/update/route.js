import connectToDB from "@/app/db/connectToDB";
import Admin from "@/app/models/Admin";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PUT(req) {
    try {
        await connectToDB();
        const extractData = await req.json();
        const { _id, talent, amount } = extractData;

        // Check if the document with the given _id exists
        let updateData = await Admin.findOne({ _id });

        if (updateData) {
            // If the document exists, update it
            updateData = await Admin.findOneAndUpdate(
                { _id },
                { talent, amount },
                { new: true }
            );
            return NextResponse.json({
                success: true,
                message: 'Updated successfully',
                data: updateData
            });
        } else {
            // If the document does not exist, create a new one
            const newData = new Admin({
                _id, // Ensure that _id is unique and provided correctly
                talent,
                amount
            });
            const createdData = await newData.save();
            return NextResponse.json({
                success: true,
                message: 'Created successfully',
                data: createdData
            });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        });
    }
}