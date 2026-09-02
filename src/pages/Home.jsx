import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

import api from "../lib/api";
import ProductCard from "../components/ProductCard";

function EngraveDemo() {
  const [name, setName] = useState("H.J. Zala");
  const [rank, setRank] = useState("P.S.I");
  const [finish, setFinish] = useState("silver");

  return (
    <div className="w-full max-w-md">
      <div
        className={`relative rounded-xl p-6 shadow-2xl transition-colors duration-500 ${
          finish === "gold"
            ? "bg-gradient-to-br from-[#3a2a10] to-[#1c1400]"
            : "bg-gradient-to-br from-[#1a1a1a] to-[#050505]"
        }`}
      >
        <div
          className={`rounded-md p-5 border ${
            finish === "gold"
              ? "border-brass-light/40 bg-brass/10"
              : "border-white/10 bg-white/5"
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
          aria-label="Enter your name"
          className="w-full px-4 py-3 rounded-lg border border-sage bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <input
          value={rank}
          maxLength={22}
          onChange={(e) => setRank(e.target.value)}
          placeholder="Designation (e.g. P.S.I, Constable)"
          aria-label="Enter your designation"
          className="w-full px-4 py-3 rounded-lg border border-sage bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <div className="flex items-center gap-3">
          <span className="text-xs font-badge uppercase tracking-wider text-ink/50">
            Finish:
          </span>

          <button
            type="button"
            onClick={() => setFinish("silver")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              finish === "silver"
                ? "bg-ink text-white border-ink"
                : "border-sage text-ink/60"
            }`}
          >
            Silver
          </button>

          <button
            type="button"
            onClick={() => setFinish("gold")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              finish === "gold"
                ? "bg-brass text-white border-brass"
                : "border-sage text-ink/60"
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
  "acrylic-name-plates": {
    blurb: "Sleek, lightweight, laser-engraved.",
    img: "/products/Acrlic.jpg",
  },
  "metal-name-plates": {
    blurb: "Solid brass & steel, built to last.",
    img: "/products/Metal.jpg",
  },
  "hotel-staff-badges": {
    blurb: "Sharp, professional, pin-ready.",
    img: "/products/Hotel_Staff.jpg",
  },
  "doctor-name-plates": {
    blurb: "Clinic-ready, elegant finishes.",
    img: "/products/Doctor.jpg",
  },
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api
      .get("/products/categories/")
      .then((r) => setCategories(r.data));

    api
      .get("/products/?featured=true")
      .then((r) => setFeatured(r.data));
  }, []);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Shree Krishnaa",
        url: "https://shreekrishnaa.com/",
        logo: "https://shreekrishnaa.com/logo.png",
      },
      {
        "@type": "WebSite",
        name: "Shree Krishnaa",
        url: "https://shreekrishnaa.com/",
        description:
          "Shree Krishnaa offers premium police accessories, custom name plates, acrylic name plates, metal name plates and professional badges with delivery across India.",
        publisher: {
          "@type": "Organization",
          name: "Shree Krishnaa",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>
          Shree Krishnaa | Police Accessories & Custom Name Plates
        </title>

        <meta
          name="description"
          content="Shree Krishnaa offers premium police accessories, custom name plates, acrylic name plates, metal name plates, desk name plates and professional badges with delivery across India."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://shreekrishnaa.com/"
        />

        <meta
          property="og:title"
          content="Shree Krishnaa | Police Accessories & Custom Name Plates"
        />

        <meta
          property="og:description"
          content="Shop custom name plates, police accessories, acrylic name plates, metal name plates and professional badges from Shree Krishnaa."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://shreekrishnaa.com/"
        />

        <meta
          property="og:site_name"
          content="Shree Krishnaa"
        />

        <meta
          property="og:image"
          content="https://shreekrishnaa.com/logo.png"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Shree Krishnaa | Police Accessories & Custom Name Plates"
        />

        <meta
          name="twitter:description"
          content="Shop custom name plates, police accessories, acrylic and metal name plates from Shree Krishnaa."
        />

        <meta
          name="twitter:image"
          content="https://shreekrishnaa.com/logo.png"
        />

        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>

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
                Custom Name Plates
                <br />
                <span className="italic text-brass-light">
                  engraved with pride.
                </span>
              </h1>

              <p className="text-ivory/70 text-lg max-w-md mb-8 leading-relaxed">
                Shree Krishnaa creates custom acrylic and metal name plates,
                police name plates, professional badges and duty accessories
                in English or Gujarati, with gold and silver finishes.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-brass hover:bg-brass-dark transition-colors text-white px-7 py-3.5 rounded-full font-badge uppercase text-sm tracking-wide"
                >
                  Shop Name Plates
                  <ArrowRight className="w-4 h-4" />
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
              {
                icon: ShieldCheck,
                label: "Durable Build",
              },
              {
                icon: Sparkles,
                label: "Sharp Engraving",
              },
              {
                icon: Truck,
                label: "Pan-India Delivery",
              },
              {
                icon: BadgeCheck,
                label: "Trusted by Officers",
              },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2"
              >
                <Icon
                  className="w-6 h-6 text-teal-600"
                  strokeWidth={1.5}
                />

                <span className="text-xs font-badge uppercase tracking-wide text-ink/60">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section
          className="max-w-7xl mx-auto px-6 lg:px-10 py-20"
          aria-labelledby="categories-heading"
        >
          <div className="text-center mb-12">
            <p className="font-badge uppercase tracking-[0.3em] text-brass text-xs mb-3">
              Browse by category
            </p>

            <h2
              id="categories-heading"
              className="font-display text-4xl text-ink"
            >
              Name Plates &amp; Professional Accessories
            </h2>

            <p className="max-w-2xl mx-auto mt-4 text-sm md:text-base text-ink/60 leading-relaxed">
              Explore acrylic name plates, metal name plates, hotel staff
              badges and doctor name plates designed for professional use.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.map((cat, i) => {
              const copy =
                categoryCopy[cat.slug] || {
                  blurb: "Custom made for you.",
                  img: "/products/Acrlic.png",
                };

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
                    title={`Shop ${cat.name} | Shree Krishnaa`}
                    className="group block rounded-2xl overflow-hidden bg-white border border-sage hover:shadow-plate transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-sage/40">
                      <img
                        src={copy.img}
                        alt={`${cat.name} - Shree Krishnaa`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading={i < 2 ? "eager" : "lazy"}
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-display text-lg text-ink">
                        {cat.name}
                      </h3>

                      <p className="text-xs text-ink/50 mt-1">
                        {copy.blurb}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section
          className="max-w-7xl mx-auto px-6 lg:px-10 pb-24"
          aria-labelledby="featured-heading"
        >
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-badge uppercase tracking-[0.3em] text-brass text-xs mb-3">
                Featured Collection
              </p>

              <h2
                id="featured-heading"
                className="font-display text-4xl text-ink"
              >
                Featured Name Plates
              </h2>

              <p className="max-w-xl mt-3 text-sm text-ink/60 leading-relaxed">
                Discover our featured custom name plates and professional
                accessories from Shree Krishnaa.
              </p>
            </div>

            <Link
              to="/shop"
              title="View all products | Shree Krishnaa"
              className="hidden sm:flex items-center gap-1 text-teal-700 font-badge uppercase text-sm tracking-wide hover:gap-2 transition-all"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
              />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/shop"
              title="Shop all Shree Krishnaa products"
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-full font-badge uppercase text-sm tracking-wide"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* SEO / BRAND INTRODUCTION */}
        <section className="border-t border-sage bg-sage/20">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 text-center">
            <p className="font-badge uppercase tracking-[0.3em] text-brass text-xs mb-3">
              Shree Krishnaa
            </p>

            <h2 className="font-display text-3xl md:text-4xl text-ink mb-5">
              Custom Name Plates &amp; Police Accessories
            </h2>

            <p className="text-sm md:text-base text-ink/60 leading-7">
              Shree Krishnaa offers personalized name plates and professional
              accessories for officers, workplaces, clinics, hotels and
              businesses. Choose from acrylic name plates, metal name plates,
              desk name plates, hotel staff badges and doctor name plates,
              available in different finishes and languages.
            </p>

            <div className="mt-7">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-teal-700 font-badge uppercase text-sm tracking-wide hover:gap-2"
              >
                Explore the collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}