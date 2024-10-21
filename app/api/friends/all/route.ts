import db from "@/utils/connectDB";
import { NextResponse } from "next/server";
import Friends from "@/models/friends.model";
import { getServerAuthSession } from "@/authconfig/auth";

export async function GET(req: any) {
    try {
        await db.connectDB();
        const loggedInUser = await getServerAuthSession();
        const userId = loggedInUser?._id;
        const allFriends = await Friends.find({ userId });
        return NextResponse.json({ data: allFriends }, { status: 200 })
    } catch (err) {
        console.log('Err', err);
        return NextResponse.json({ err }, { status: 500 })
    }
}