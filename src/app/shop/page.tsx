"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { productApi, Product } from '@/lib/api';

const CATEGORIES = ['All', 'Clothes', 'Jewelry'];
const AUDIENCES = ['All', 'Women', 'Kids 1-10yrs'];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAudience, setSelectedAudience] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, selectedAudience]);

  const fetchProducts = async () => {
    try {
      const response = await productApi.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    if (selectedAudience !== 'All') {
      filtered = filtered.filter(p => p.targetAudience.toLowerCase() === selectedAudience.toLowerCase());
    }
    
    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedAudience('All');
  };

  return (
    <div className="min-h-screen bg-[#fffbf7]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">Our Collection</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Discover our exquisite range of traditional and contemporary fashion pieces
            </p>
          </div>

          <div className="flex gap-8">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-6 py-3 bg-pink-700 text-white rounded-full shadow-lg"
            >
              <Filter size={20} />
              Filters
            </button>

            <aside
              className={`fixed lg:relative inset-y-0 left-0 z-50 lg:z-0 w-72 bg-white lg:bg-transparent p-6 lg:p-0 transform transition-transform duration-300 lg:transform-none ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
              }`}
            >
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center justify-between mb-6 lg:mb-8">
                  <h2 className="font-serif text-2xl text-gray-900">Filters</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden p-2 text-gray-500 hover:text-gray-900"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm tracking-widest text-gray-500 uppercase mb-4">Category</h3>
                    <div className="space-y-2">
                      {CATEGORIES.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                            selectedCategory === category
                              ? 'bg-pink-700 text-white'
                              : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm tracking-widest text-gray-500 uppercase mb-4">Audience</h3>
                    <div className="space-y-2">
                      {AUDIENCES.map((audience) => (
                        <button
                          key={audience}
                          onClick={() => setSelectedAudience(audience)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                            selectedAudience === audience
                              ? 'bg-pink-700 text-white'
                              : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                          }`}
                        >
                          {audience}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(selectedCategory !== 'All' || selectedAudience !== 'All') && (
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-3 border-2 border-pink-700 text-pink-700 rounded-lg hover:bg-pink-700 hover:text-white transition-all"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[3/4] bg-gray-200 rounded-lg" />
                      <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
                      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No products found matching your filters</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 bg-pink-700 text-white rounded-lg hover:bg-pink-800 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Silk Banarasi Saree',
    description: 'Elegant hand-woven Banarasi silk saree with intricate gold zari work',
    price: 12999,
    category: 'Clothes',
    subCategory: 'Sarees',
    targetAudience: 'Women',
    imageUrls: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'],
  },
  {
    id: 2,
    name: 'Designer Lehenga',
    description: 'Beautiful bridal lehenga with heavy embroidery and sequin work',
    price: 25999,
    category: 'Clothes',
    subCategory: 'Lehengas',
    targetAudience: 'Women',
    imageUrls: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'],
  },
  {
    id: 3,
    name: 'Temple Necklace Set',
    description: 'Traditional temple jewelry necklace with matching earrings',
    price: 8999,
    category: 'Jewelry',
    subCategory: 'Necklaces',
    targetAudience: 'Women',
    imageUrls: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600'],
  },
  {
    id: 4,
    name: 'Kids Pattu Pavadai',
    description: 'Traditional South Indian silk dress for kids',
    price: 3999,
    category: 'Clothes',
    subCategory: 'Kids Wear',
    targetAudience: 'Kids 1-10yrs',
    imageUrls: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600'],
  },
  {
    id: 5,
    name: 'Kundan Bangles Set',
    description: 'Elegant kundan work bangles set of 4',
    price: 4999,
    category: 'Jewelry',
    subCategory: 'Bangles',
    targetAudience: 'Women',
    imageUrls: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600'],
  },
  {
    id: 6,
    name: 'Kids Anarkali Dress',
    description: 'Beautiful embroidered Anarkali dress for kids',
    price: 2999,
    category: 'Clothes',
    subCategory: 'Kids Wear',
    targetAudience: 'Kids 1-10yrs',
    imageUrls: ['https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600'],
  },
];
