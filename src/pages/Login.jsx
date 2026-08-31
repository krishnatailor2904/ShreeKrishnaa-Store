import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate(params.get("next") || "/");
    } catch (err) {
      toast.error(err.response?.data?.non_field_errors?.[0] || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-sage rounded-2xl p-8">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Shree Krishnaa" className="w-14 h-14 rounded-full mx-auto mb-4" />
          <h1 className="font-display text-3xl text-ink">Welcome Back</h1>
          <p className="text-ink/50 text-sm mt-1">Login to continue shopping</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
          <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" />
          <div className="text-right">
            <Link to="/forgot-password" className="text-xs text-teal-600 hover:underline">Forgot password?</Link>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white py-3.5 rounded-full font-badge uppercase tracking-wide text-sm transition-colors flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Login
          </button>
        </form>
        <p className="text-center text-sm text-ink/50 mt-6">
          New here? <Link to="/register" className="text-teal-600 font-medium hover:underline">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
