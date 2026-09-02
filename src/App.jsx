import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import MyOrders from "./pages/MyOrders";
import About from "./pages/About";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const siteName = "Shree Krishnaa";
    const baseUrl = "https://shreekrishnaa.com";

    let title = `${siteName} | Police Accessories & Custom Name Plates`;
    let description =
      "Shree Krishnaa offers premium police accessories and custom name plates in acrylic, metal, gold and silver finishes. Shop personalized name plates with delivery across India.";

    let noIndex = false;
    let canonicalUrl = `${baseUrl}${pathname}`;

    if (pathname === "/") {
      title = "Shree Krishnaa | Police Accessories & Custom Name Plates";
      description =
        "Shree Krishnaa offers premium police accessories and custom name plates in acrylic, metal, gold and silver finishes. Shop personalized name plates with delivery across India.";
    }

    else if (pathname === "/shop") {
      title = "Police Accessories & Custom Name Plates | Shree Krishnaa";
      description =
        "Shop police accessories and custom name plates at Shree Krishnaa. Explore personalized acrylic, metal, gold and silver name plates with delivery across India.";
    }

    else if (pathname === "/about") {
      title = "About Shree Krishnaa | Police Accessories & Name Plates";
      description =
        "Learn about Shree Krishnaa, your destination for premium police accessories and personalized custom name plates.";
    }

    else if (pathname === "/contact") {
      title = "Contact Shree Krishnaa | Police Accessories & Name Plates";
      description =
        "Contact Shree Krishnaa for custom name plates, police accessories, orders and product enquiries.";
    }

    else if (
      pathname === "/cart" ||
      pathname === "/checkout" ||
      pathname === "/orders" ||
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/forgot-password"
    ) {
      noIndex = true;
    }

    document.title = title;

    // Robots
    let robotsTag = document.querySelector('meta[name="robots"]');

    if (!robotsTag) {
      robotsTag = document.createElement("meta");
      robotsTag.setAttribute("name", "robots");
      document.head.appendChild(robotsTag);
    }

    robotsTag.setAttribute(
      "content",
      noIndex ? "noindex, nofollow" : "index, follow"
    );

    // Meta description
    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute("content", description);

    // Canonical
    let canonicalTag = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute("href", canonicalUrl);

  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" toastOptions={{ style: { fontFamily: "Work Sans, sans-serif", fontSize: "14px" } }} />
      <ScrollToTop />
      <SEO />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
