import { motion } from "framer-motion";
import { ShieldCheck, Hammer, Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function About() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shree Krishnaa",
    url: "https://shreekrishnaa.com/",
    logo: "https://shreekrishnaa.com/logo.png",
    description:
      "Shree Krishnaa creates custom name plates, police accessories, professional badges and personalized engravings.",
  };

  return (
    <>
      <Helmet>
        <title>
          About Shree Krishnaa | Police Accessories & Custom Name Plates
        </title>

        <meta
          name="description"
          content="Learn about Shree Krishnaa, a trusted name for custom acrylic and metal name plates, police accessories, professional badges and personalized engravings across Gujarat and India."
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://shreekrishnaa.com/about"
        />

        <meta
          property="og:title"
          content="About Shree Krishnaa | Custom Name Plates & Police Accessories"
        />

        <meta
          property="og:description"
          content="Discover the story behind Shree Krishnaa and our custom name plates, police accessories and professional engravings."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://shreekrishnaa.com/about"
        />

        <meta
          property="og:site_name"
          content="Shree Krishnaa"
        />

        <meta
          property="og:image"
          content="https://shreekrishnaa.com/logo.png"
        />

        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <div>
        {/* HERO */}
        <section className="bg-teal-700 text-ivory py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="font-badge uppercase tracking-[0.3em] text-brass-light text-xs mb-4">
              Our Story
            </p>

            <h1 className="font-display text-5xl mb-5">
              Crafting Identity, One Plate at a Time
            </h1>

            <p className="text-ivory/70 leading-relaxed max-w-2xl mx-auto">
              Shree Krishnaa began with a simple belief — that a name deserves
              to be worn and displayed with pride. What started as a small
              nameplate workshop has grown into a trusted name for police
              accessories, custom name plates and personalized engravings
              across Gujarat.
            </p>
          </div>
        </section>

        {/* VALUES */}
        <section
          className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10"
          aria-labelledby="our-values-heading"
        >
          <h2 id="our-values-heading" className="sr-only">
            Why Choose Shree Krishnaa
          </h2>

          {[
            {
              icon: Hammer,
              title: "Handcrafted Quality",
              text: "Every plate is engraved with precision, using durable acrylic and metal built to last through years of daily use.",
            },
            {
              icon: ShieldCheck,
              title: "Trusted by Officers",
              text: "From duty desks to professional workplaces and hospital corridors, our nameplates are chosen for their sharp, professional finish.",
            },
            {
              icon: Heart,
              title: "Made with Care",
              text: "We treat every order — big or small — as personal, because a name plate carries someone's identity.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-teal-600" />
              </div>

              <h3 className="font-display text-xl text-ink mb-2">
                {title}
              </h3>

              <p className="text-ink/60 text-sm leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </section>

        {/* ABOUT CONTENT */}
        <section className="border-t border-sage bg-sage/20">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <p className="font-badge uppercase tracking-[0.3em] text-brass text-xs mb-3">
              What We Make
            </p>

            <h2 className="font-display text-3xl md:text-4xl text-ink mb-5">
              Custom Name Plates & Professional Accessories
            </h2>

            <p className="text-ink/60 text-sm md:text-base leading-7">
              At Shree Krishnaa, we create custom acrylic name plates, metal
              name plates, desk name plates, police name plates, hotel staff
              badges and doctor name plates. Our personalized products can be
              made in English or Gujarati with different finishes including
              gold and silver.
            </p>

            <div className="mt-8">
              <Link
                to="/shop"
                title="Shop custom name plates and police accessories"
                className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white px-7 py-3 rounded-full font-badge uppercase text-sm tracking-wide transition-colors"
              >
                Explore Our Products
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}