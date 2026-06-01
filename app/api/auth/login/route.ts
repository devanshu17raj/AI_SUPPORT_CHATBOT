import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  // Make sure to use backticks ( ` ) for this string!
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
  
  const url = scalekit.getAuthorizationUrl(redirectUri);
  console.log(url);
  
  return NextResponse.redirect(url);
}