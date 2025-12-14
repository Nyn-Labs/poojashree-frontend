"use client";

import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const originalPrice = Math.round(product.price * 1.4);
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white overflow-hidden"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
        {product.imageUrls && product.imageUrls.length > 0 ? (
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
            <span className="text-pink-300 font-serif text-lg">No Image</span>
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-pink-800 text-sm tracking-widest uppercase font-medium hover:bg-pink-700 hover:text-white transition-colors">
            <Eye size={16} />
            View Details
          </button>
        </motion.div>

        {discount > 0 && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-pink-700 text-white text-xs tracking-wider">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs tracking-widest text-pink-600 uppercase mb-1">
          {product.category} • {product.targetAudience}
        </p>
        <h3 className="font-serif text-lg text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-pink-800">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{originalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
