import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
      <div className="text-center mb-14">
        <p className="font-badge uppercase tracking-[0.3em] text-brass text-xs mb-3">Get in Touch</p>
        <h1 className="font-display text-5xl text-ink">Contact Us</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-14">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-medium text-ink">Call Us</h3>
              <p className="text-ink/60 text-sm">+91 9033536071</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-medium text-ink">Email Us</h3>
              <p className="text-ink/60 text-sm">shreekrishnaa@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-medium text-ink">Visit Us</h3>
              <p className="text-ink/60 text-sm">O/S/15 KRISHNA TAILOR , NEAR ANDH KALYAN KENDRA RANIP AHMEDABAD GUJARAT</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white border border-sage rounded-2xl p-8 space-y-4"
        >
          <input required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
          <input required type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
          <textarea required rows={5} placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input resize-none" />
          <a href="https://wa.me/919033536071?utm_source=chatgpt.com"><button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-full font-badge uppercase tracking-wide text-sm transition-colors flex items-center justify-center gap-2">
            Send Message <Send className="w-4 h-4" />
          </button></a>
        </motion.form>
      </div>
    </div>
  );
}
