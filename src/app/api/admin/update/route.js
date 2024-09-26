import connectToDB from "@/app/db/connectToDB";
import Admin from "@/app/models/Admin";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PUT(req) {
    try {
        await connectToDB();
        const extractData = await req.json();
        const { _id, talent } = extractData;

        // Check if the document with the given _id exists
        const updateData = await Admin.findOneAndUpdate(
            { _id },
            { talent },
            { new: true, upsert: true } // upsert option creates a new document if it does not exist
        );

        return NextResponse.json({
            success: true,
            message: updateData ? 'Updated successfully' : 'Created successfully',
            data: updateData
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        });
    }
}
