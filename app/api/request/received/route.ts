import { getServerAuthSession } from "@/authconfig/auth";
import Requests from "@/models/requests.model";
import db from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET () {
    try{
        await db.connectDB();
        const loggedInUser = await getServerAuthSession();
        const requests = await Requests.find({receiverId: loggedInUser?._id, status: 'requested'});
        return NextResponse.json({status: 200, message: 'Recieved requests fetched successfuly', data: requests})
    }catch(err) {
        console.log(err, 'err***********');
        NextResponse.json(err, {status: 500})
    }
}