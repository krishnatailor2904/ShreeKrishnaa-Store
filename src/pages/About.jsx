import { motion } from "framer-motion";
import { ShieldCheck, Hammer, Heart } from "lucide-react";

export default function About() {
  return (
    <div>
      <section className="bg-teal-700 text-ivory py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-badge uppercase tracking-[0.3em] text-brass-light text-xs mb-4">Our Story</p>
          <h1 className="font-display text-5xl mb-5">Crafting Identity, One Plate at a Time</h1>
          <p className="text-ivory/70 leading-relaxed max-w-2xl mx-auto">
            Shree Krishnaa began with a simple belief — that a name deserves to be worn and displayed
            with pride. What started as a small nameplate workshop has grown into a trusted name for
            police accessories and custom engravings across Gujarat.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {[
          { icon: Hammer, title: "Handcrafted Quality", text: "Every plate is engraved with precision, using durable acrylic and metal built to last years of daily wear." },
          { icon: ShieldCheck, title: "Trusted by Officers", text: "From duty desks to hospital corridors, our nameplates are chosen for their sharp, professional finish." },
          { icon: Heart, title: "Made with Care", text: "We treat every order — big or small — as personal, because a name plate carries someone's identity." },
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
            <h3 className="font-display text-xl text-ink mb-2">{title}</h3>
            <p className="text-ink/60 text-sm leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
