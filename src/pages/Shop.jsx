import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import api from "../lib/api";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState("");

  useEffect(() => {
    api.get("/products/categories/").then((r) => setCategories(r.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory) params.category = activeCategory;
    if (ordering) params.ordering = ordering;
    api
      .get("/products/", { params })
      .then((r) => setProducts(r.data))
      .finally(() => setLoading(false));
  }, [activeCategory, ordering]);

  const setCategory = (slug) => {
    if (slug) setSearchParams({ category: slug });
    else setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
      <div className="text-center mb-12">
        <p className="font-badge uppercase tracking-[0.3em] text-brass text-xs mb-3">The Full Collection</p>
        <h1 className="font-display text-5xl text-ink">Shop All Products</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="md:w-56 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="font-badge uppercase text-xs tracking-widest text-ink/50 mb-3">Categories</h3>
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto scrollbar-none pb-2 md:pb-0">
              <button
                onClick={() => setCategory("")}
                className={`text-left px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  !activeCategory ? "bg-teal-600 text-white" : "hover:bg-teal-50 text-ink/70"
                }`}
              >
                All Products
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.slug)}
                  className={`text-left px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    activeCategory === c.slug ? "bg-teal-600 text-white" : "hover:bg-teal-50 text-ink/70"
                  }`}
                >
                  {c.name} <span className="opacity-50">({c.product_count})</span>
                </button>
              ))}
            </div>

            <h3 className="font-badge uppercase text-xs tracking-widest text-ink/50 mb-3 mt-8">Sort By</h3>
            <select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-sage text-sm bg-white"
            >
              <option value="">Newest</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 md:hidden">
            <span className="flex items-center gap-2 text-sm text-ink/60">
              <SlidersHorizontal className="w-4 h-4" /> {products.length} products
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl bg-sage/40 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 text-ink/50">No products found in this category.</div>
          ) : (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
