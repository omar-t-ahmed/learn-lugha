"use client"
import { getProviders, signIn } from 'next-auth/react';
import React from 'react';

export default async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className='text-black'>
      <h1>Sign in</h1>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}
