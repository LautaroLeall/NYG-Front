import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-nyg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/escudo_nyg.png"
                alt="Escudo NYG"
                className="h-12 w-auto"
              />
              <span className="font-bold text-xl text-nyg-blue hidden sm:block">
                Club Natación y Gimnasia
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-nyg-blue hover:text-nyg-red font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="/el-club"
              className="text-nyg-blue hover:text-nyg-red font-medium transition-colors"
            >
              El Club
            </Link>
            <Link
              to="/rugby"
              className="text-nyg-blue hover:text-nyg-red font-medium transition-colors"
            >
              Rugby
            </Link>
            <Link
              to="/hockey"
              className="text-nyg-blue hover:text-nyg-red font-medium transition-colors"
            >
              Hockey
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-nyg-blue hover:text-nyg-red focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (FE-005) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-nyg-white border-b border-gray-200 absolute w-full"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-nyg-blue hover:text-nyg-red"
              >
                Inicio
              </Link>
              <Link
                to="/el-club"
                className="block px-3 py-2 text-base font-medium text-nyg-blue hover:text-nyg-red"
              >
                El Club
              </Link>
              <Link
                to="/rugby"
                className="block px-3 py-2 text-base font-medium text-nyg-blue hover:text-nyg-red"
              >
                Rugby
              </Link>
              <Link
                to="/hockey"
                className="block px-3 py-2 text-base font-medium text-nyg-blue hover:text-nyg-red"
              >
                Hockey
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
