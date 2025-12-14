"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, PlusCircle, LogOut, Package } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const links = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/add-product', label: 'Add Product', icon: PlusCircle },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-pink-900 to-pink-800 text-white flex flex-col"
    >
      <div className="p-6 border-b border-pink-700/50">
        <div className="flex items-center gap-3">
          <Package className="w-8 h-8" />
          <div>
            <h2 className="font-serif text-lg tracking-wide">Admin Panel</h2>
            <p className="text-xs text-pink-300 tracking-wider">POOJA SHREE VEDA</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-pink-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm tracking-wide">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-pink-700/50">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-pink-200 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="text-sm tracking-wide">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}
