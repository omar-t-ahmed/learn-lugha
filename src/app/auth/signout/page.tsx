import { signOut } from 'next-auth/react';
import React from 'react';

export default function SignOutPage() {
  return (
    <div>
      <h1>Sign out</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
