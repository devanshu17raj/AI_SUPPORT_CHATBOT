import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req:NextResponse) {
    const cookiestore=await cookies()
    cookiestore.delete("access_token")
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`)

}