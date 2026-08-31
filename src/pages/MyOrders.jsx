import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
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

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/my/").then((r) => setOrders(r.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-ink mb-10">My Orders</h1>

      {loading ? (
        <div className="text-center py-20 text-ink/40">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-12 h-12 text-sage mx-auto mb-4" strokeWidth={1.2} />
          <p className="text-ink/50">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-sage rounded-2xl p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <p className="font-display text-xl text-ink">Order </p>
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
          ))}
        </div>
      )}
    </div>
  );
}
