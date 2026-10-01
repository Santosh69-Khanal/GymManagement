import { useState } from "react";
import { Menu, X, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#2E2C26]/10 bg-[#E2DECE]/95 backdrop-blur-md">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 text-xl font-bold tracking-wide"
        >
          <Dumbbell size={24} strokeWidth={1.8} />

          <span>
            NEWTON<span className="text-[#73795D]">FITNESS</span>
          </span>
        </a>


        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <a
            href="#home"
            className="text-sm transition hover:text-[#73795D]"
          >
            Home
          </a>

          <a
            href="#about"
            className="text-sm transition hover:text-[#73795D]"
          >
            About
          </a>

          <a
            href="#facilities"
            className="text-sm transition hover:text-[#73795D]"
          >
            Facilities
          </a>

          <a
            href="#membership"
            className="text-sm transition hover:text-[#73795D]"
          >
            Membership
          </a>

          <a
            href="#trainers"
            className="text-sm transition hover:text-[#73795D]"
          >
            Trainers
          </a>

          <a
            href="#contact"
            className="text-sm transition hover:text-[#73795D]"
          >
            Contact
          </a>

        </div>


        {/* Desktop Join Button */}
        <Link
          to="/login"
          className="hidden bg-[#3D4F5A] px-8 py-3 rounded text-sm font-medium text-[#E2DECE] transition hover:bg-[#2E2C26] md:block"
        >
          Join Now
        </Link>


        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-[#2E2C26]/10 bg-[#E2DECE] px-6 py-6 md:hidden">

          <div className="flex flex-col gap-5">

            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>

            <a
              href="#facilities"
              onClick={() => setMenuOpen(false)}
            >
              Facilities
            </a>

            <a
              href="#membership"
              onClick={() => setMenuOpen(false)}
            >
              Membership
            </a>

            <a
              href="#trainers"
              onClick={() => setMenuOpen(false)}
            >
              Trainers
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>


            {/* Mobile Join Button */}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-[#3D4F5A] px-8 py-4 text-center text-[#E2DECE] rounded"
            >
              Join Us
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;