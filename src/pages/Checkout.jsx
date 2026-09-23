import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api, { API_BASE } from "../lib/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const STEPS = { FORM: 1, PAY: 2, DONE: 3 };

export default function Checkout() {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(STEPS.FORM);
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [form, setForm] = useState({
    full_name: user?.full_name || "",
    phone: user?.phone || "",
    address_line: user?.address_line || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        items: items.map((i) => ({
          product_id: i.id,
          quantity: i.qty,
          custom_name: i.customName || "",
          custom_subtitle: i.customSubtitle || "",
        })),
      };
      const res = await api.post("/orders/create/", payload);
      setOrder(res.data);
      setStep(STEPS.PAY);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Could not place order. Please check your details.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmPaid = async () => {
    setSubmitting(true);
    try {
      const fd = new FormData();
      if (screenshot) fd.append("payment_screenshot", screenshot);
      await api.post(`/orders/${order.id}/mark-paid/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      clearCart();
      setStep(STEPS.DONE);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const qrUrl = order
    ? `${API_BASE}/api/orders/upi-qr/?amount=${order.total_amount}&note=${encodeURIComponent(order.upi_ref_note)}`
    : "";

  const upiId = "chauhanmhimanshu2005@okicici";
  const payeeName = "Shree Krishnaa";
  const upiParams = order
    ? `pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${order.total_amount}&tn=${encodeURIComponent(order.upi_ref_note)}&cu=INR`
    : "";
  const gpayLink = `tez://upi/pay?${upiParams}`;
  const phonepeLink = `phonepe://upi/pay?${upiParams}`;
  const genericUpiLink = `upi://pay?${upiParams}`;

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-3 mb-10">
        {["Address", "Payment", "Done"].map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                step > i + 1 ? "bg-teal-600 text-white" : step === i + 1 ? "bg-brass text-white" : "bg-sage text-ink/40"
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-xs font-badge uppercase tracking-wide ${step === i + 1 ? "text-ink" : "text-ink/40"}`}>
              {label}
            </span>
            {i < 2 && <div className="w-8 h-px bg-sage" />}
          </div>
        ))}
      </div>

      {step === STEPS.FORM && (
        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handlePlaceOrder} className="bg-white border border-sage rounded-2xl p-8 space-y-4">
          <h2 className="font-display text-2xl text-ink mb-2">Delivery Address</h2>
          <input required name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name" className="input" />
          <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input" />
          <input required name="address_line" value={form.address_line} onChange={handleChange} placeholder="Address" className="input" />
          <div className="grid grid-cols-2 gap-4">
            <input required name="city" value={form.city} onChange={handleChange} placeholder="City" className="input" />
            <input required name="state" value={form.state} onChange={handleChange} placeholder="State" className="input" />
          </div>
          <input required name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="input" />

          <div className="flex justify-between items-center pt-4 border-t border-sage">
            <span className="text-ink/60">Total Payable</span>
            <span className="font-display text-2xl text-ink">₹{totalAmount.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white py-3.5 rounded-full font-badge uppercase tracking-wide text-sm transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Continue to Payment
          </button>
        </motion.form>
      )}

      {step === STEPS.PAY && order && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-sage rounded-2xl p-8 text-center">
          <h2 className="font-display text-2xl text-ink mb-1">Scan &amp; Pay</h2>
          <p className="text-ink/50 text-sm mb-6">Order #{order.id} · ₹{order.total_amount}</p>

          <div className="inline-block p-4 bg-white border-2 border-teal-100 rounded-2xl mb-4">
            <img src={qrUrl} alt="UPI QR Code" className="w-56 h-56" />
          </div>
          <p className="text-sm text-ink/60 mb-1">Scan with any UPI app (GPay, PhonePe, Paytm)</p>
          <p className="text-xs text-ink/40 mb-6">UPI ID: {upiId}</p>

          <div className="mb-6">
            <p className="text-xs text-ink/40 mb-3">— OR pay directly from your phone —</p>
            <div className="flex gap-3">
              <a
                href={gpayLink}
                onClick={() => { window.location.href = genericUpiLink; }}
                className="flex-1 bg-[#4285F4] hover:opacity-90 text-white py-3 rounded-full font-badge uppercase tracking-wide text-xs transition-opacity flex items-center justify-center"
              >
                Pay via GPay
              </a>
              <a
                href={phonepeLink}
                onClick={() => { window.location.href = genericUpiLink; }}
                className="flex-1 bg-[#5F259F] hover:opacity-90 text-white py-3 rounded-full font-badge uppercase tracking-wide text-xs transition-opacity flex items-center justify-center"
              >
                Pay via PhonePe
              </a>
            </div>
          </div>

          <div className="border-t border-sage pt-6">
            <label className="block text-sm font-medium text-ink mb-2">
              Upload payment screenshot <span className="text-ink/40 font-normal">(optional, helps faster approval)</span>
            </label>
            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-sage rounded-xl py-6 cursor-pointer hover:border-teal-300 transition-colors">
              <Upload className="w-5 h-5 text-teal-600" />
              <span className="text-sm text-ink/60">{screenshot ? screenshot.name : "Choose a screenshot"}</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setScreenshot(e.target.files[0])} />
            </label>
          </div>

          <button
            onClick={handleConfirmPaid}
            disabled={submitting}
            className="w-full mt-6 bg-brass hover:bg-brass-dark disabled:opacity-60 text-white py-3.5 rounded-full font-badge uppercase tracking-wide text-sm transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            I've Completed the Payment
          </button>
        </motion.div>
      )}

      {step === STEPS.DONE && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-sage rounded-2xl p-10 text-center">
          <CheckCircle2 className="w-16 h-16 text-teal-600 mx-auto mb-5" />
          <h2 className="font-display text-3xl text-ink mb-3">Payment Submitted!</h2>
          <p className="text-ink/60 mb-8 leading-relaxed">
            Order #{order.id} is awaiting verification. Once we confirm your payment,
            you'll get a confirmation email and your order will be shipped shortly.
          </p>
          <button
            onClick={() => navigate("/orders")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-7 py-3 rounded-full font-badge uppercase text-sm tracking-wide transition-colors"
          >
            View My Orders
          </button>
        </motion.div>
      )}
    </div>
  );
}