import { getServerAuthSession } from "@/authconfig/auth";
import { NextRequest, NextResponse } from "next/server";
import { requestSchema } from "./requestValidation";
import Requests from "@/models/requests.model";
import User from "@/models/user.model";
import db from "@/utils/connectDB";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = requestSchema.safeParse(body);
        if (!validation.success) {
            const errors: { [key: string]: string[] } = validation.error.flatten().fieldErrors;
            const errorMessage = Object.keys(errors).flatMap(key => errors[key])
            return NextResponse.json({ message: errorMessage[0] }, { status: 400 })
        }
        await db.connectDB();
        await Requests.create(body);
        return NextResponse.json({message: 'Request sent successfuly'}, {status: 200})
    } catch (err) {
        console.log(err, 'Errr****************')
        return NextResponse.json({ error: err }, { status: 500 })
    }
}