import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await register(form);
      toast.success("Account created! Welcome to Shree Krishnaa.");
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data || {});
      toast.error("Please fix the errors below.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-sage rounded-2xl p-8">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Shree Krishnaa" className="w-14 h-14 rounded-full mx-auto mb-4" />
          <h1 className="font-display text-3xl text-ink">Create Account</h1>
          <p className="text-ink/50 text-sm mt-1">Join Shree Krishnaa today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input required placeholder="Full Name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="input" />
            {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name[0]}</p>}
          </div>
          <div>
            <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email[0]}</p>}
          </div>
          <div>
            <input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
          </div>
          <div>
            <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password[0]}</p>}
          </div>
          <button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white py-3.5 rounded-full font-badge uppercase tracking-wide text-sm transition-colors flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-ink/50 mt-6">
          Already have an account? <Link to="/login" className="text-teal-600 font-medium hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
