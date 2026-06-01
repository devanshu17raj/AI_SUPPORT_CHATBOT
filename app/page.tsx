

import { getSession } from "@/lib/getSession";
import HomeClient from "@/components/HomeClient";

// 1. FORCE NEXT.JS TO CHECK COOKIES ON EVERY SINGLE HIT (DISABLE CACHING)
export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getSession();

  // 2. Safely extract the email from either session shape
  const email = session?.email || session?.user?.email || "";

  return (
    <HomeClient email={email} />
  );
}