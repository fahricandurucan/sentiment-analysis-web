"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-transparent backdrop-blur-sm bg-gray-100/90 text-black py-4 px-6 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="GlobaLens Logo" width={80} height={80} className="w-10 h-10" />
          <span className="text-2xl font-bold text-black">GlobaLens</span>
        </Link>

        {/* Hamburger Menü Butonu - Mobil */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Desktop Menü */}
        <ul className="hidden md:flex gap-6">
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

        {/* Mobil Sidebar */}
        <div className={`
          fixed top-[72px] right-0 h-screen w-64 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          md:hidden
        `}>
          <ul className="flex flex-col gap-4 p-6">
            <li>
              <Link 
                href="/" 
                className="block py-2 px-4 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/pages/map-page" 
                className="block py-2 px-4 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                Country Analysis
              </Link>
            </li>
            <li>
              <Link 
                href="/pages/gender" 
                className="block py-2 px-4 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                Gender Analysis
              </Link>
            </li>
            <li>
              <Link 
                href="/pages/generations" 
                className="block py-2 px-4 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                Generations
              </Link>
            </li>
          </ul>
        </div>

        {/* Overlay for mobile menu */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 md:hidden"
            onClick={() => setIsOpen(false)}
            style={{ zIndex: -1 }}
          />
        )}
      </div>
    </nav>
  );
}
