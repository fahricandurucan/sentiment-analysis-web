"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-transparent backdrop-blur-sm bg-gray-100 text-black py-6 px-6 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="GlobaLens Logo" width={80} height={80} className="w-10 h-10" />
          <span className="text-2xl font-bold text-black">GlobaLens</span>
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="hover:underline transition">Home</Link>
          </li>
          <li>
            <Link href="/pages/map-page" className="hover:underline transition">Country Analysis</Link>
          </li>
          <li>
            <Link href="/pages/gender" className="hover:underline transition">Gender Analysis</Link>
          </li>
          <li>
            <Link href="/pages/generations" className="hover:underline transition">Generations</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
