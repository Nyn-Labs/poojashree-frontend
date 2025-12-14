"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trash2, Package, DollarSign, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import { AdminSidebar } from '@/components/AdminSidebar';
import { productApi, Product } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const router = useRouter();
  const { checkAuth } = useAuth();

  useEffect(() => {
    if (!checkAuth()) {
      router.push('/admin/login');
      return;
    }
    fetchProducts();
  }, []);

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

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setDeleteLoading(id);
    try {
      await productApi.delete(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-pink-500' },
    { label: 'Total Value', value: `₹${products.reduce((sum, p) => sum + p.price, 0).toLocaleString()}`, icon: DollarSign, color: 'bg-emerald-500' },
    { label: 'Categories', value: new Set(products.map(p => p.category)).size, icon: TrendingUp, color: 'bg-violet-500' },
    { label: 'Audiences', value: new Set(products.map(p => p.targetAudience)).size, icon: Users, color: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="font-serif text-3xl text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-500">Manage your product inventory</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-serif text-xl text-gray-900">Inventory</h2>
            </div>

            {loading ? (
              <div className="p-8">
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-6 py-4 text-xs tracking-wider text-gray-500 uppercase">Product</th>
                      <th className="text-left px-6 py-4 text-xs tracking-wider text-gray-500 uppercase">Category</th>
                      <th className="text-left px-6 py-4 text-xs tracking-wider text-gray-500 uppercase">Audience</th>
                      <th className="text-left px-6 py-4 text-xs tracking-wider text-gray-500 uppercase">Price</th>
                      <th className="text-right px-6 py-4 text-xs tracking-wider text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product, index) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              {product.imageUrls && product.imageUrls.length > 0 ? (
                                <Image
                                  src={product.imageUrls[0]}
                                  alt={product.name}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <Package size={20} />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500 truncate max-w-xs">{product.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-600 text-sm">{product.targetAudience}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">₹{product.price.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deleteLoading === product.id}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {deleteLoading === product.id ? (
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            ) : (
                              <Trash2 size={20} />
                            )}
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No products found</p>
              </div>
            )}
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
];
