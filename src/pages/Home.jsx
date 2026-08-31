import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Sparkles, BadgeCheck, ArrowRight } from "lucide-react";
import api from "../lib/api";
import ProductCard from "../components/ProductCard";

function EngraveDemo() {
  const [name, setName] = useState("H.J. Zala");
  const [rank, setRank] = useState("P.S.I");
  const [finish, setFinish] = useState("silver"); // silver | gold

  return (
    <div className="w-full max-w-md">
      <div
        className={`relative rounded-xl p-6 shadow-2xl transition-colors duration-500 ${
          finish === "gold" ? "bg-gradient-to-br from-[#3a2a10] to-[#1c1400]" : "bg-gradient-to-br from-[#1a1a1a] to-[#050505]"
        }`}
      >
        <div
          className={`rounded-md p-5 border ${
            finish === "gold" ? "border-brass-light/40 bg-brass/10" : "border-white/10 bg-white/5"
          }`}
        >
          <p
            className={`font-display font-semibold text-2xl sm:text-3xl tracking-wide truncate ${
              finish === "gold" ? "gold-engraved" : "engraved"
            }`}
          >
            {name || "Your Name"}
          </p>
          <p
            className={`font-badge uppercase text-sm tracking-[0.2em] mt-1 ${
              finish === "gold" ? "gold-engraved" : "engraved"
            }`}
          >
            {rank || "Designation"}
          </p>
        </div>
        <div className="absolute -bottom-3 left-6 right-6 h-3 bg-black/40 blur-md rounded-full" />
      </div>

      <div className="mt-6 space-y-3">
        <input
          value={name}
          maxLength={22}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name"
          className="w-full px-4 py-3 rounded-lg border border-sage bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <input
          value={rank}
          maxLength={22}
          onChange={(e) => setRank(e.target.value)}
          placeholder="Designation (e.g. P.S.I, Constable)"
          className="w-full px-4 py-3 rounded-lg border border-sage bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <div className="flex items-center gap-3">
          <span className="text-xs font-badge uppercase tracking-wider text-ink/50">Finish:</span>
          <button
            onClick={() => setFinish("silver")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              finish === "silver" ? "bg-ink text-white border-ink" : "border-sage text-ink/60"
            }`}
          >
            Silver
          </button>
          <button
            onClick={() => setFinish("gold")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              finish === "gold" ? "bg-brass text-white border-brass" : "border-sage text-ink/60"
            }`}
          >
            Gold
          </button>
        </div>
      </div>
    </div>
  );
}

const categoryCopy = {
  "acrylic-name-plates": { blurb: "Sleek, lightweight, laser-engraved.", img: "/products/Acrlic.jpg" },
  "metal-name-plates": { blurb: "Solid brass & steel, built to last.", img: "/products/Metal.jpg" },
  "hotel-staff-badges": { blurb: "Sharp, professional, pin-ready.", img: "/products/Hotel_Staff.jpg" },
  "doctor-name-plates": { blurb: "Clinic-ready, elegant finishes.", img: "/products/Doctor.jpg" },
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get("/products/categories/").then((r) => setCategories(r.data));
    api.get("/products/?featured=true").then((r) => setFeatured(r.data));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-teal-700">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%)]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-ivory"
          >
            <p className="font-badge uppercase tracking-[0.3em] text-brass-light text-xs mb-5">
              — Police Accessories &amp; Name Plates —
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
              Every name,
              <br />
              <span className="italic text-brass-light">engraved with pride.</span>
            </h1>
            <p className="text-ivory/70 text-lg max-w-md mb-8 leading-relaxed">
              Custom acrylic &amp; metal name plates, badges and duty accessories —
              English or Gujarati, gold or silver. Type your name on the right and watch it come to life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-brass hover:bg-brass-dark transition-colors text-white px-7 py-3.5 rounded-full font-badge uppercase text-sm tracking-wide"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-ivory/30 hover:border-ivory text-ivory px-7 py-3.5 rounded-full font-badge uppercase text-sm tracking-wide transition-colors"
              >
                Our Story
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <EngraveDemo />
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-sage bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: ShieldCheck, label: "Durable Build" },
            { icon: Sparkles, label: "Sharp Engraving" },
            { icon: Truck, label: "Pan-India Delivery" },
            { icon: BadgeCheck, label: "Trusted by Officers" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon className="w-6 h-6 text-teal-600" strokeWidth={1.5} />
              <span className="text-xs font-badge uppercase tracking-wide text-ink/60">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="text-center mb-12">
          <p className="font-badge uppercase tracking-[0.3em] text-brass text-xs mb-3">Browse by category</p>
          <h2 className="font-display text-4xl text-ink">Find your perfect plate</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat, i) => {
            const copy = categoryCopy[cat.slug] || { blurb: "Custom made for you.", img: "/products/Acrlic.png" };
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-white border border-sage hover:shadow-plate transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-sage/40">
                    <img
                      src={copy.img}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg text-ink">{cat.name}</h3>
                    <p className="text-xs text-ink/50 mt-1">{copy.blurb}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-badge uppercase tracking-[0.3em] text-brass text-xs mb-3">Bestsellers</p>
            <h2 className="font-display text-4xl text-ink">Featured Name Plates</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-1 text-teal-700 font-badge uppercase text-sm tracking-wide hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
