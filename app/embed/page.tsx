import EmbedClient from '@/components/EmbedClient'
import { getSession } from '@/lib/getSession' // Adjust path if your auth logic is elsewhere
import React from 'react'

export default async function page() {
  // Fetch the current authenticated user session
  const session = await getSession();

  return (
    <>
      {/* Pass the dynamic user ID as a prop to the Client Component */}
      <EmbedClient ownerId={session?.user?.id} />
    </>
  )
}