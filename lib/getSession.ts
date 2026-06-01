

import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession() {
  const session = await cookies();
  const token = session.get("access_token")?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const result: any = await scalekit.validateToken(token);
    const user: any = await scalekit.user.getUser(result.sub);
    
    // Extract the email safely depending on how ScaleKit structured it,
    // fallback gracefully to an empty string if missing.
    const userEmail = user?.email || user?.profile?.email || "";

    // Return a unified structure that TypeScript can easily read on any page!
    return {
      user: {
        email: userEmail
      }
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}