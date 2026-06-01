import DashboardClient from '@/components/DashboardClient';
import { getSession } from '@/lib/getSession';
import React from 'react';

async function page() {
  const session = await getSession();

  // Cast to 'any' to bypass the strict layout check for 'id'
  const safeSession = session as any;

  return (
    <>
      {/* TypeScript will now safely let 'id' pass through without crashing the build */}
      <DashboardClient ownerId={safeSession?.user?.id} />
    </>
  );
}

export default page;