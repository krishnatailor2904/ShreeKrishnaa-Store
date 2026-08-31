import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, User, LogOut, Package } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ivory/95 backdrop-blur shadow-[0_2px_20px_rgba(14,91,84,0.08)]" : "bg-ivory"
      }`}
    >
      <div className="border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Shree Krishnaa"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-teal-200 group-hover:ring-brass transition-all"
            />
            <div className="leading-none">
              <span className="block font-display italic text-2xl text-teal-700 tracking-wide">
                Shree Krishnaa
              </span>
              <span className="block font-badge text-[10px] tracking-[0.25em] uppercase text-brass-dark">
                Police Accessories &amp; Name Plates
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-9 font-badge text-sm tracking-wide uppercase">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative py-2 transition-colors ${
                    isActive ? "text-teal-700" : "text-ink/70 hover:text-teal-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-brass"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 group">
              <ShoppingBag className="w-6 h-6 text-ink/80 group-hover:text-teal-700 transition-colors" strokeWidth={1.6} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-brass text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <div className="hidden sm:block relative">
              <button
                onClick={() => setOpen((o) => !o)}
                className="p-2 rounded-full hover:bg-teal-50 transition-colors"
              >
                <User className="w-6 h-6 text-ink/80" strokeWidth={1.6} />
              </button>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-sage overflow-hidden"
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-sage">
                          <p className="font-semibold text-sm text-ink truncate">{user.full_name}</p>
                          <p className="text-xs text-ink/50 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={() => { setOpen(false); navigate("/orders"); }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-teal-50 text-left"
                        >
                          <Package className="w-4 h-4" /> My Orders
                        </button>
                        <button
                          onClick={() => { logout(); setOpen(false); navigate("/"); }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-red-50 text-red-600 text-left"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </>
                    ) : (
                      <div className="p-3 flex flex-col gap-2">
                        <Link
                          to="/login"
                          onClick={() => setOpen(false)}
                          className="text-center py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setOpen(false)}
                          className="text-center py-2 rounded-lg border border-teal-600 text-teal-700 text-sm font-medium hover:bg-teal-50 transition-colors"
                        >
                          Create Account
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="md:hidden p-2" onClick={() => setMenuOpen((o) => !o)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-ivory border-b border-teal-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4 font-badge uppercase text-sm tracking-wide">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="text-ink/80">
                  {l.label}
                </NavLink>
              ))}
              <div className="h-px bg-sage my-1" />
              {user ? (
                <>
                  <Link to="/orders" onClick={() => setMenuOpen(false)}>My Orders</Link>
                  <button onClick={() => { logout(); setMenuOpen(false); navigate("/"); }} className="text-left text-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>Create Account</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
