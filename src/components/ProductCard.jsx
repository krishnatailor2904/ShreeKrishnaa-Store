import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1400);
  };

  const productUrl = `/product/${product.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.4,
        delay: (index % 8) * 0.04,
      }}
    >
      <div className="group block bg-white rounded-2xl overflow-hidden border border-sage hover:border-teal-300 hover:shadow-plate transition-all duration-300">

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-sage/40">

          <Link
            to={productUrl}
            title={`${product.name} | Shree Krishnaa`}
            aria-label={`View ${product.name}`}
          >
            <img
              src={product.image}
              alt={`${product.name} - Shree Krishnaa`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading={index < 6 ? "eager" : "lazy"}
            />
          </Link>

          {/* Discount */}
          {product.discount_percent > 0 && (
            <span className="absolute top-3 left-3 bg-brass text-white text-xs font-badge font-semibold px-2.5 py-1 rounded-full">
              {product.discount_percent}% OFF
            </span>
          )}

          {/* Add To Cart */}
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            title={`Add ${product.name} to cart`}
            className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
              added
                ? "bg-teal-600"
                : "bg-white text-teal-700 hover:bg-teal-600 hover:text-white"
            }`}
          >
            {added ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Product Information */}
        <Link
          to={productUrl}
          title={`${product.name} | Shree Krishnaa`}
          className="block p-3.5"
        >
          {/* Category */}
          <p className="text-[11px] font-badge uppercase tracking-wider text-teal-600 mb-1">
            {product.category_name}
          </p>

          {/* Product Name */}
          <h3 className="text-sm font-medium text-ink leading-snug line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-display text-xl font-semibold text-ink">
              ₹{Math.round(product.price)}
            </span>

            {product.compare_at_price && (
              <span className="text-xs text-ink/40 line-through">
                ₹{Math.round(product.compare_at_price)}
              </span>
            )}
          </div>
        </Link>
      </div>
    </motion.div>
  );
}