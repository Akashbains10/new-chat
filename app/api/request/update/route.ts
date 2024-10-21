import { NextRequest, NextResponse } from "next/server";
import { updateRequestSchema } from "./updateRequestValidation";
import db from "@/utils/connectDB";
import Requests from "@/models/requests.model";
import Friends from "@/models/friends.model";
import { createFriends } from "@/services/request.service";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { requestId, status } = body;
        const validation = updateRequestSchema.safeParse(body);
        if (!validation.success) {
            const errors: { [key: string]: string[] } = validation.error.flatten().fieldErrors;
            const errorMessage = Object.keys(errors).flatMap(key => errors[key])
            return NextResponse.json({ message: errorMessage[0] }, { status: 400 })
        }
        await db.connectDB();
        const requests = await Requests.findById(requestId);
        if (!requests) {
            return NextResponse.json({ message: 'No request found' }, { status: 400 })
        }
        if (requests.status === 'accepted') {
            return NextResponse.json({ message: 'Request status cannnot be changed once its accepted' }, { status: 400 })
        }

        requests.status = status;
        await requests.save();
        if (status === 'accepted') {
            await createFriends(requests.senderId, requests.receiverId);
            await createFriends(requests.receiverId, requests.senderId);
        }
        return NextResponse.json({ status: 200, message: `Request ${status} successfuly` })
    } catch (err) {
        console.log('Err:', err);
        return NextResponse.json({ err }, { status: 500 })
    }
}