import EmbedClient from '@/components/EmbedClient';
import { getSession } from '@/lib/getSession';
import React from 'react';

async function page() {
  const session = await getSession();

  // 1. Cast the session to 'any' to bypass strict type checking on this page
  const safeSession = session as any;

  return (
    <>
      {/* 2. Update session to safeSession here */}
      {/* Pass the dynamic user ID as a prop to the Client Component */}
      <EmbedClient ownerId={safeSession?.user?.id} />
    </>
  );
}

export default page;