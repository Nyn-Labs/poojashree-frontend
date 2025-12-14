"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export default function Home() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 2500);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffbf7] via-[#fff5f0] to-[#fdf2f8] overflow-hidden">
      <AnimatePresence>
        {!isAnimationComplete && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center pb-32 bg-gradient-to-b from-[#fffbf7] to-[#fdf2f8]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 1, y: 0 }}
              animate={{
                scale: 0.4,
                y: '-40vh',
                x: '-30vw',
              }}
              transition={{
                duration: 2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5,
              }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-[0.3em] text-pink-800 font-medium"
              >
                POOJA SHREE
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-[0.3em] text-pink-800 font-medium mt-2"
              >
                VEDA FASHIONS
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isAnimationComplete && <Navbar showLogo={true} />}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 2 }}
              className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.08 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400 rounded-full blur-3xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-10 max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span className="text-sm tracking-widest text-pink-700 uppercase">Elegance Redefined</span>
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl text-gray-800 leading-tight italic"
            >
              "Style is a way to say who you are
              <br />
              <span className="text-pink-700">without having to speak"</span>
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Discover exquisite traditional and contemporary fashion that celebrates the essence of Indian elegance
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/shop"
                className="group flex items-center gap-3 px-8 py-4 bg-pink-700 text-white tracking-widest uppercase text-sm hover:bg-pink-800 transition-all duration-300"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/shop"
                className="px-8 py-4 border-2 border-pink-700 text-pink-700 tracking-widest uppercase text-sm hover:bg-pink-700 hover:text-white transition-all duration-300"
              >
                View Catalog
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { label: 'Collections', value: '200+' },
              { label: 'Happy Customers', value: '10K+' },
              { label: 'Years of Trust', value: '7+' },
              { label: 'Unique Designs', value: '100+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="font-serif text-3xl md:text-4xl text-pink-700 font-semibold">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 tracking-wider uppercase mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="py-24 px-4 bg-white/50">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-center text-gray-800 mb-4">
              Our Categories
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Explore our curated collection of traditional and modern fashion
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Clothes',
                  description: 'Sarees, Lehengas, Kurtis & more',
                  image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
                },
                {
                  title: 'Jewelry',
                  description: 'Traditional & Contemporary Pieces',
                  image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
                },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group relative h-96 overflow-hidden cursor-pointer"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="font-serif text-3xl text-white mb-2">{category.title}</h3>
                    <p className="text-white/80 mb-4">{category.description}</p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 text-white text-sm tracking-widest uppercase hover:gap-4 transition-all"
                    >
                      Shop Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <footer className="py-12 px-4 bg-pink-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="font-serif text-2xl mb-4">POOJA SHREE VEDA FASHIONS</h3>
            <p className="text-pink-200 text-sm tracking-wider mb-6">
              Where Tradition Meets Elegance
            </p>
            <div className="flex justify-center gap-8 text-sm text-pink-300">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
              <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
            </div>
            <p className="mt-8 text-xs text-pink-400">
              © 2026 Pooja Shree Veda Fashions. All rights reserved.
            </p>
          </div>
        </footer>
      </motion.main>
    </div>
  );
}
