import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, PenLine } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { items, updateQty, removeFromCart, updateCustomization, totalAmount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const missing = items.find((i) => !i.customName || !i.customName.trim());
    if (missing) {
      toast.error(`Please enter the name to engrave for "${missing.name}"`);
      return;
    }
    if (!user) {
      navigate("/login?next=/checkout");
    } else {
      navigate("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <ShoppingBag className="w-14 h-14 text-sage mx-auto mb-6" strokeWidth={1.2} />
        <h2 className="font-display text-3xl text-ink mb-3">Your cart is empty</h2>
        <p className="text-ink/50 mb-8">Looks like you haven't added any name plates yet.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-7 py-3 rounded-full font-badge uppercase text-sm tracking-wide transition-colors">
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-14">
      <h1 className="font-display text-4xl text-ink mb-10">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-4 bg-white border border-sage rounded-2xl p-4"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover bg-sage/40 flex-shrink-0" />
                <div className="flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-ink">{item.name}</h3>
                    <p className="text-teal-700 font-semibold mt-1">₹{item.price}</p>
                  </div>

                  <div className="bg-teal-50/60 border border-teal-100 rounded-xl p-3 space-y-2">
                    <p className="flex items-center gap-1.5 text-[11px] font-badge uppercase tracking-wide text-teal-700">
                      <PenLine className="w-3.5 h-3.5" /> What should we engrave?
                    </p>
                    <input
                      value={item.customName || ""}
                      onChange={(e) => updateCustomization(item.id, "customName", e.target.value)}
                      placeholder="Name (required) — e.g. H.J. Zala"
                      maxLength={100}
                      className="w-full px-3 py-2 rounded-lg border border-sage bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <input
                      value={item.customSubtitle || ""}
                      onChange={(e) => updateCustomization(item.id, "customSubtitle", e.target.value)}
                      placeholder="Designation / Department (optional) — e.g. P.S.I"
                      maxLength={100}
                      className="w-full px-3 py-2 rounded-lg border border-sage bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-sage rounded-full">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-2 hover:text-teal-600">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-2 hover:text-teal-600">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="bg-white border border-sage rounded-2xl p-6 h-fit sticky top-24">
          <h3 className="font-display text-xl text-ink mb-5">Order Summary</h3>
          <div className="flex justify-between text-sm text-ink/60 mb-2">
            <span>Subtotal</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-ink/60 mb-4">
            <span>Delivery</span>
            <span className="text-teal-600">Free</span>
          </div>
          <div className="h-px bg-sage my-4" />
          <div className="flex justify-between font-display text-xl text-ink mb-6">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-full font-badge uppercase tracking-wide text-sm transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
