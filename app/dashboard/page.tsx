import EmbedClient from '@/components/EmbedClient';
import { getSession } from '@/lib/getSession';
import React from 'react';

async function page() {
  const session = await getSession();

  // 1. Cast the session to 'any' to bypass strict type checking
  const safeSession = session as any;

  return (
    <>
      {/* 2. MAKE SURE THIS SAYS 'safeSession' AND NOT 'session' */}
      <EmbedClient ownerId={safeSession?.user?.id} />
    </>
  );
}

export default page;