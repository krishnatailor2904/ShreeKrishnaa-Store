import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/api";

const STEPS = { EMAIL: 1, OTP: 2, DONE: 3 };

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.EMAIL);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/otp/request/", { email });
      toast.success("If that email exists, an OTP has been sent.");
      setStep(STEPS.OTP);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/otp/verify-reset/", { email, code, new_password: newPassword });
      setStep(STEPS.DONE);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-sage rounded-2xl p-8">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Shree Krishnaa" className="w-14 h-14 rounded-full mx-auto mb-4" />
          <h1 className="font-display text-3xl text-ink">Reset Password</h1>
          <p className="text-ink/50 text-sm mt-1">
            {step === STEPS.EMAIL && "Enter your email to receive an OTP"}
            {step === STEPS.OTP && "Enter the OTP sent to your email"}
            {step === STEPS.DONE && "All set!"}
          </p>
        </div>

        {step === STEPS.EMAIL && (
          <form onSubmit={requestOtp} className="space-y-4">
            <input required type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
            <button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white py-3.5 rounded-full font-badge uppercase tracking-wide text-sm transition-colors flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Send OTP
            </button>
          </form>
        )}

        {step === STEPS.OTP && (
          <form onSubmit={verifyOtp} className="space-y-4">
            <input required maxLength={6} placeholder="6-digit OTP" value={code} onChange={(e) => setCode(e.target.value)} className="input text-center tracking-[0.5em] font-semibold" />
            <input required type="password" minLength={6} placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input" />
            <button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white py-3.5 rounded-full font-badge uppercase tracking-wide text-sm transition-colors flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Reset Password
            </button>
          </form>
        )}

        {step === STEPS.DONE && (
          <div className="text-center">
            <CheckCircle2 className="w-14 h-14 text-teal-600 mx-auto mb-4" />
            <p className="text-ink/60 mb-6">Your password has been reset successfully.</p>
            <button onClick={() => navigate("/login")} className="bg-teal-600 hover:bg-teal-700 text-white px-7 py-3 rounded-full font-badge uppercase text-sm tracking-wide transition-colors">
              Login Now
            </button>
          </div>
        )}

        {step !== STEPS.DONE && (
          <p className="text-center text-sm text-ink/50 mt-6">
            <Link to="/login" className="text-teal-600 font-medium hover:underline">Back to Login</Link>
          </p>
        )}
      </motion.div>
    </div>
  );
}
