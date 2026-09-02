import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/api";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet-async";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get(`/products/${slug}/`).then((r) => setProduct(r.data));
  }, [slug]);

  if (!product) {
    return <div className="max-w-7xl mx-auto px-6 py-24 text-center text-ink/50">Loading...</div>;
  }

  const handleAdd = () => {
    addToCart(product, qty);
    toast.success(`Added ${qty} × ${product.name} to cart`);
  };

  return (
       <>
    <Helmet>
      <title>
        {product.name} | Shree Krishnaa
      </title>

      <meta
        name="description"
        content={`${product.name} by Shree Krishnaa. Shop premium ${product.category_name || "police accessories and custom name plates"} with delivery across India.`}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <link
        rel="canonical"
        href={`https://shreekrishnaa.com/product/${product.slug}`}
      />

      {/* Open Graph */}
      <meta
        property="og:title"
        content={`${product.name} | Shree Krishnaa`}
      />

      <meta
        property="og:description"
        content={product.description}
      />

      <meta
        property="og:type"
        content="product"
      />

      <meta
        property="og:url"
        content={`https://shreekrishnaa.com/product/${product.slug}`}
      />

      <meta
        property="og:image"
        content={product.image}
      />

      <meta
        property="og:site_name"
        content="Shree Krishnaa"
      />

      {/* Product Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: [product.image],
          brand: {
            "@type": "Brand",
            name: "Shree Krishnaa",
          },
          offers: {
            "@type": "Offer",
            url: `https://shreekrishnaa.com/product/${product.slug}`,
            priceCurrency: "INR",
            price: Math.round(product.price),
            availability:
              "https://schema.org/InStock",
            itemCondition:
              "https://schema.org/NewCondition",
          },
        })}
      </script>
    </Helmet>

    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
<div className="grid md:grid-cols-2 gap-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden bg-sage/30 aspect-square"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Link to={`/shop?category=${product.category_slug}`} className="text-xs font-badge uppercase tracking-wider text-teal-600">
            {product.category_name}
          </Link>
          <h1 className="font-display text-4xl text-ink mt-2 mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-display text-3xl font-semibold text-ink">₹{Math.round(product.price)}</span>
            {product.compare_at_price && (
              <>
                <span className="text-lg text-ink/40 line-through">₹{Math.round(product.compare_at_price)}</span>
                <span className="text-sm font-medium text-brass">{product.discount_percent}% off</span>
              </>
            )}
          </div>

          <p className="text-ink/60 leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-sage rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:text-teal-600">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:text-teal-600">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-full font-badge uppercase tracking-wide text-sm transition-colors"
            >
              Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-sage">
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span className="text-xs text-ink/60">Durable Build</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-5 h-5 text-teal-600" />
              <span className="text-xs text-ink/60">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw className="w-5 h-5 text-teal-600" />
              <span className="text-xs text-ink/60">Easy Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
