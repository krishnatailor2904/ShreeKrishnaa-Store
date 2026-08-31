import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block bg-white rounded-2xl overflow-hidden border border-sage hover:border-teal-300 hover:shadow-plate transition-all duration-300"
      >
        <div className="relative aspect-square overflow-hidden bg-sage/40">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.discount_percent > 0 && (
            <span className="absolute top-3 left-3 bg-brass text-white text-xs font-badge font-semibold px-2.5 py-1 rounded-full">
              {product.discount_percent}% OFF
            </span>
          )}
          <button
            onClick={handleAdd}
            className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
              added ? "bg-teal-600" : "bg-white text-teal-700 hover:bg-teal-600 hover:text-white"
            }`}
          >
            {added ? <Check className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
        <div className="p-3.5">
          <p className="text-[11px] font-badge uppercase tracking-wider text-teal-600 mb-1">
            {product.category_name}
          </p>
          <h3 className="text-sm font-medium text-ink leading-snug line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-display text-xl font-semibold text-ink">₹{Math.round(product.price)}</span>
            {product.compare_at_price && (
              <span className="text-xs text-ink/40 line-through">₹{Math.round(product.compare_at_price)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
