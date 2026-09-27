import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Loader2, PackageSearch } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/api";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  awaiting_verification: "bg-blue-100 text-blue-700",
  verified: "bg-teal-100 text-teal-700",
  rejected: "bg-red-100 text-red-700",
  confirmed: "bg-teal-100 text-teal-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("order_id") || "");
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOrder(null);
    try {
      const res = await api.post("/orders/track/", { order_id: orderId, phone });
      setOrder(res.data);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Order not found. Check your Order ID and phone number.");
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-ink mb-2">Track Your Order</h1>
      <p className="text-ink/50 mb-8">Enter your Order ID and the phone number you used while ordering.</p>

      <form onSubmit={handleSubmit} className="bg-white border border-sage rounded-2xl p-6 flex flex-col sm:flex-row gap-3 mb-8">
        <input
          required
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Order ID (e.g. 42)"
          className="input flex-1"
        />
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="input flex-1"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white px-6 py-3 rounded-full font-badge uppercase tracking-wide text-sm transition-colors flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Track
        </button>
      </form>

      {order && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-sage rounded-2xl p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <p className="font-display text-xl text-ink">Order #{order.id}</p>
              <p className="text-xs text-ink/40">{new Date(order.created_at).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[order.payment_status]}`}>
                {order.payment_status.replace(/_/g, " ")}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[order.order_status]}`}>
                {order.order_status}
              </span>
            </div>
          </div>

          <div className="text-sm text-ink/60 mb-4">
            Deliver to: {order.address_line}, {order.city}, {order.state} - {order.pincode}
          </div>

          <div className="space-y-2 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-ink/70">
                <div>
                  <span>{item.product_name} × {item.quantity}</span>
                  {item.custom_name && (
                    <p className="text-xs text-teal-600 mt-0.5">
                      Engraved: "{item.custom_name}"{item.custom_subtitle ? ` / "${item.custom_subtitle}"` : ""}
                    </p>
                  )}
                </div>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-semibold text-ink pt-3 border-t border-sage">
            <span>Total</span>
            <span>₹{order.total_amount}</span>
          </div>
        </motion.div>
      )}

      {!order && searched && !loading && (
        <div className="text-center py-16">
          <PackageSearch className="w-12 h-12 text-sage mx-auto mb-4" strokeWidth={1.2} />
          <p className="text-ink/50">No order found. Double-check the Order ID and phone number.</p>
        </div>
      )}
    </div>
  );
}