import Head from 'next/head'
import { Inter } from 'next/font/google'
import UserList from '@/components/UserList';

import React from "react";

const inter = Inter({ subsets: ['latin'] })


export default function App() {
  return (
    <>
      <Head>
        <title>Github Info Web</title>
        <meta name="description" content="Github proxy API Consumer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
          <UserList/>
      </main>
    </>
  )
}
