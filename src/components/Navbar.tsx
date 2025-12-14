"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  showLogo?: boolean;
}

export function Navbar({ showLogo = true }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {showLogo && (
            <Link href="/" className="flex items-center">
              <span className="font-serif text-lg md:text-xl tracking-wider text-pink-800 font-medium">
                POOJA SHREE VEDA
              </span>
            </Link>
          )}
          {!showLogo && <div />}

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm tracking-widest text-gray-700 hover:text-pink-700 transition-colors uppercase"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-sm tracking-widest text-gray-700 hover:text-pink-700 transition-colors uppercase"
            >
              Shop
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center gap-2 px-5 py-2.5 bg-pink-700 text-white text-sm tracking-widest uppercase hover:bg-pink-800 transition-colors"
            >
              <User size={16} />
              Admin
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-pink-100"
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm tracking-widest text-gray-700 hover:text-pink-700 transition-colors uppercase"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm tracking-widest text-gray-700 hover:text-pink-700 transition-colors uppercase"
              >
                Shop
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-5 py-2.5 bg-pink-700 text-white text-sm tracking-widest uppercase hover:bg-pink-800 transition-colors w-fit"
              >
                <User size={16} />
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
