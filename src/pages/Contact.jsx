import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage = `Hello Shree Krishnaa,

Name: ${form.name}
Email: ${form.email}

Message:
${form.message}`;

    const whatsappUrl = `https://wa.me/919033536071?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    toast.success("Opening WhatsApp...");
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Shree Krishnaa",
    url: "https://shreekrishnaa.com/contact",
    description:
      "Contact Shree Krishnaa for custom name plates, police accessories, professional badges and personalized engravings.",
    mainEntity: {
      "@type": "Organization",
      name: "Shree Krishnaa",
      url: "https://shreekrishnaa.com/",
      telephone: "+91 9033536071",
      email: "shreekrishnaa@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "O/S/15 KRISHNA TAILOR, NEAR ANDH KALYAN KENDRA RANIP",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>
          Contact Shree Krishnaa | Name Plates & Police Accessories
        </title>

        <meta
          name="description"
          content="Contact Shree Krishnaa for custom acrylic and metal name plates, police accessories, professional badges and personalized engravings. Get in touch for orders and enquiries."
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://shreekrishnaa.com/contact"
        />

        <meta
          property="og:title"
          content="Contact Shree Krishnaa | Custom Name Plates"
        />

        <meta
          property="og:description"
          content="Get in touch with Shree Krishnaa for custom name plates, police accessories and professional engravings."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://shreekrishnaa.com/contact"
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
          {JSON.stringify(contactSchema)}
        </script>
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="font-badge uppercase tracking-[0.3em] text-brass text-xs mb-3">
            Get in Touch
          </p>

          <h1 className="font-display text-5xl text-ink">
            Contact Shree Krishnaa
          </h1>

          <p className="max-w-2xl mx-auto mt-4 text-sm md:text-base text-ink/60 leading-relaxed">
            Have a question about custom name plates, police accessories or
            personalized engraving? Get in touch with Shree Krishnaa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* CONTACT INFORMATION */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* PHONE */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-teal-600" />
              </div>

              <div>
                <h2 className="font-medium text-ink">
                  Call Us
                </h2>

                <a
                  href="tel:+919033536071"
                  className="text-ink/60 text-sm hover:text-teal-600 transition-colors"
                >
                  +91 9033536071
                </a>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-teal-600" />
              </div>

              <div>
                <h2 className="font-medium text-ink">
                  Email Us
                </h2>

                <a
                  href="mailto:shreekrishnaa@gmail.com"
                  className="text-ink/60 text-sm hover:text-teal-600 transition-colors"
                >
                  shreekrishnaa@gmail.com
                </a>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-teal-600" />
              </div>

              <div>
                <h2 className="font-medium text-ink">
                  Visit Us
                </h2>

                <address className="not-italic text-ink/60 text-sm leading-relaxed">
                  O/S/15 KRISHNA TAILOR, NEAR ANDH KALYAN KENDRA,
                  RANIP, AHMEDABAD, GUJARAT
                </address>
              </div>
            </div>

            {/* WHATSAPP */}
            <div className="pt-2">
              <a
                href="https://wa.me/919033536071"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-badge uppercase tracking-wide text-sm transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white border border-sage rounded-2xl p-8 space-y-4"
          >
            <input
              required
              type="text"
              placeholder="Your Name"
              aria-label="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="input"
            />

            <input
              required
              type="email"
              placeholder="Your Email"
              aria-label="Your Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="input"
            />

            <textarea
              required
              rows={5}
              placeholder="Your Message"
              aria-label="Your Message"
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              className="input resize-none"
            />

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-full font-badge uppercase tracking-wide text-sm transition-colors flex items-center justify-center gap-2"
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>

        {/* SEO / BUSINESS INFO */}
        <section className="border-t border-sage mt-20 pt-14 text-center">
          <p className="font-badge uppercase tracking-[0.3em] text-brass text-xs mb-3">
            Shree Krishnaa
          </p>

          <h2 className="font-display text-3xl text-ink mb-4">
            Custom Name Plates &amp; Police Accessories
          </h2>

          <p className="max-w-3xl mx-auto text-sm md:text-base text-ink/60 leading-7">
            Shree Krishnaa provides custom acrylic name plates, metal name
            plates, police name plates, desk name plates, hotel staff badges
            and doctor name plates. For product enquiries, customization
            requests and orders, contact us by phone, email or WhatsApp.
          </p>
        </section>
      </div>
    </>
  );
}