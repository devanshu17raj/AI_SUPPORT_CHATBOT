import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession() {
  const session = await cookies();
  const token = session.get("access_token")?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    // Validate the token to make sure it's real and not expired
    const result: any = await scalekit.validateToken(token);
    // Fetch the actual user's profile data from Scalekit
    const user = await scalekit.user.getUser(result.sub);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}