import { getServerAuthSession } from "@/authconfig/auth";
import { NextRequest, NextResponse } from "next/server";
import { requestSchema } from "./requestValidation";

export async function POST(request: NextRequest) {
    try {
        const res = await request.json();
        const validation = requestSchema.safeParse(res);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.flatten().fieldErrors },{status: 400})
        }
        console.log(res, 'res')
        const session = await getServerAuthSession();
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized User' }, { status: 401 })
        }
        return Response.json({ message: 'api chal gi bai' })
    } catch (err) {
        console.log(err, 'Error*************')
        return NextResponse.json({error: err}, {status: 500})
    }
}