import React from 'react'
import Link from 'next/link'
export default function page() {
  return (
    <div>

        Hello

<Link href="/about">About</Link>
<Link href="/login">Login</Link>
<Link href="/signup">Signup</Link>
<Link href="/dashboard">Dashboard</Link>


    </div>
  )
}
