import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Inicio", path: "/" },
  { name: "El Club", path: "/el-club" },
  { name: "Rugby", path: "/rugby" },
  { name: "Noticias", path: "/noticias" },
  { name: "¡Sumate!", path: "/sumate", isSpecial: true },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add subtle shadow when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-1"
          : "bg-white/80 backdrop-blur-sm border-b border-gray-100 py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src="/escudo_nyg.png"
                alt="Escudo NYG"
                className="h-12 md:h-14 w-auto drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-black text-xl md:text-2xl tracking-tight text-nyg-blue hidden sm:block group-hover:text-nyg-red transition-colors duration-300">
                Natacion y Gimnasia
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  link.isSpecial
                    ? `ml-4 px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 ${
                        isActive
                          ? "bg-nyg-red text-white shadow-lg shadow-nyg-red/30 scale-105"
                          : "bg-nyg-blue text-white hover:bg-nyg-red hover:shadow-lg hover:shadow-nyg-red/30"
                      }`
                    : `px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                        isActive
                          ? "text-nyg-red bg-red-50/50"
                          : "text-nyg-blue hover:text-nyg-red hover:bg-gray-50"
                      }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-nyg-blue hover:text-nyg-red focus:outline-none p-2 rounded-lg bg-gray-50/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-xl absolute w-full"
          >
            <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    link.isSpecial
                      ? `block mt-4 px-4 py-3 text-center rounded-xl font-bold text-lg transition-all ${
                          isActive
                            ? "bg-nyg-red text-white shadow-md"
                            : "bg-nyg-blue text-white"
                        }`
                      : `block px-4 py-3 rounded-xl font-bold text-lg transition-all ${
                          isActive
                            ? "text-nyg-red bg-red-50"
                            : "text-nyg-blue hover:bg-gray-50"
                        }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
