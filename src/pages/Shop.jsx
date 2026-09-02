import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { Helmet } from "react-helmet-async";

import api from "../lib/api";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState("");

  useEffect(() => {
    api.get("/products/categories/").then((r) => setCategories(r.data));
  }, []);

  useEffect(() => {
    setLoading(true);

    const params = {};

    if (activeCategory) params.category = activeCategory;
    if (ordering) params.ordering = ordering;

    api
      .get("/products/", { params })
      .then((r) => setProducts(r.data))
      .finally(() => setLoading(false));
  }, [activeCategory, ordering]);

  const setCategory = (slug) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  const activeCategoryData = categories.find(
    (c) => c.slug === activeCategory
  );

  const categoryName = activeCategoryData?.name;

  const pageTitle = categoryName
    ? `${categoryName} | Shree Krishnaa`
    : "Police Accessories & Custom Name Plates | Shree Krishnaa";

  const pageDescription = categoryName
    ? `Shop ${categoryName} from Shree Krishnaa. Explore premium name plates, police accessories and personalized products with delivery across India.`
    : "Shop premium police accessories, custom name plates, acrylic name plates, metal name plates and desk name plates from Shree Krishnaa with delivery across India.";

  const canonicalUrl = categoryName
    ? `https://shreekrishnaa.com/shop?category=${activeCategory}`
    : "https://shreekrishnaa.com/shop";

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryName
      ? `${categoryName} | Shree Krishnaa`
      : "Shop All Products | Shree Krishnaa",
    description: pageDescription,
    url: canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "Shree Krishnaa",
      url: "https://shreekrishnaa.com/",
    },
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>

        <meta
          name="description"
          content={pageDescription}
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href={canonicalUrl}
        />

        <meta
          property="og:title"
          content={pageTitle}
        />

        <meta
          property="og:description"
          content={pageDescription}
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content={canonicalUrl}
        />

        <meta
          property="og:site_name"
          content="Shree Krishnaa"
        />

        <script type="application/ld+json">
          {JSON.stringify(collectionSchema)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="text-center mb-12">
          <p className="font-badge uppercase tracking-[0.3em] text-brass text-xs mb-3">
            The Full Collection
          </p>

          <h1 className="font-display text-5xl text-ink">
            {categoryName || "Shop All Products"}
          </h1>

          <p className="max-w-2xl mx-auto mt-4 text-sm md:text-base text-ink/60 leading-relaxed">
            {categoryName
              ? `Explore premium ${categoryName.toLowerCase()} from Shree Krishnaa, made for professional and personalized use.`
              : "Explore premium police accessories, custom name plates, acrylic name plates, metal name plates and desk name plates from Shree Krishnaa."}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="md:w-56 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="font-badge uppercase text-xs tracking-widest text-ink/50 mb-3">
                Categories
              </h3>

              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto scrollbar-none pb-2 md:pb-0">
                <button
                  onClick={() => setCategory("")}
                  className={`text-left px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    !activeCategory
                      ? "bg-teal-600 text-white"
                      : "hover:bg-teal-50 text-ink/70"
                  }`}
                >
                  All Products
                </button>

                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.slug)}
                    className={`text-left px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                      activeCategory === c.slug
                        ? "bg-teal-600 text-white"
                        : "hover:bg-teal-50 text-ink/70"
                    }`}
                  >
                    {c.name}{" "}
                    <span className="opacity-50">
                      ({c.product_count})
                    </span>
                  </button>
                ))}
              </div>

              <h3 className="font-badge uppercase text-xs tracking-widest text-ink/50 mb-3 mt-8">
                Sort By
              </h3>

              <select
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-sage text-sm bg-white"
              >
                <option value="">Newest</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
              </select>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 md:hidden">
              <span className="flex items-center gap-2 text-sm text-ink/60">
                <SlidersHorizontal className="w-4 h-4" />
                {products.length} products
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] rounded-2xl bg-sage/40 animate-pulse"
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 text-ink/50">
                No products found in this category.
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 gap-5"
              >
                {products.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    index={i}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}