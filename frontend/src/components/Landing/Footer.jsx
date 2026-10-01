import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#2E2C26] px-6 pt-20 text-[#E2DECE] lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Main Footer Content */}

        <div className="grid gap-12 pb-16 md:grid-cols-4">

          {/* Brand */}

          <div className="md:col-span-2">

            <h2 className="text-3xl font-light">
              NEWTON<span className="text-[#73795D]">FITNESS</span>
            </h2>

            <p className="mt-5 max-w-sm leading-7 text-[#E2DECE]/50">
              A thoughtful space for movement, strength, and wellbeing.
              Come as you are. Leave stronger.
            </p>


            {/* Social Media */}

            <div className="mt-7 flex gap-3">

              <a
                href="https://www.instagram.com/?hl=en" target="_blank"git --version
                aria-label="Instagram"
                className="border border-[#E2DECE]/15 p-3 transition duration-300 hover:bg-[#73795D]"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="border border-[#E2DECE]/15 p-3 transition duration-300 hover:bg-[#73795D]"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                aria-label="TikTok"
                className="border border-[#E2DECE]/15 p-3 transition duration-300 hover:bg-[#73795D]"
              >
                <FaTiktok size={18} />rmdir /s /q .git
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="border border-[#E2DECE]/15 p-3 transition duration-300 hover:bg-[#73795D]"
              >
                <FaYoutube size={18} />
              </a>

            </div>

          </div>


          {/* Get Started */}

          <div>

            <h3 className="mb-6 text-sm uppercase tracking-widest text-[#E2DECE]/50">
              Get Started
            </h3>

            <div className="flex flex-col gap-4 text-sm">

              <a
                href="#membership"
                className="transition hover:text-[#73795D]"
              >
                Membership Plans
              </a>

              <a
                href="#facilities"
                className="transition hover:text-[#73795D]"
              >
                Explore the Gym
              </a>

              <a
                href="#trainers"
                className="transition hover:text-[#73795D]"
              >
                Meet Our Trainers
              </a>

              <a
                href="#contact"
                className="transition hover:text-[#73795D]"
              >
                Book a Visit
              </a>

            </div>

          </div>


          {/* Contact */}

          <div>

            <h3 className="mb-6 text-sm uppercase tracking-widest text-[#E2DECE]/50">
              Visit Us
            </h3>

            <div className="space-y-4 text-sm text-[#E2DECE]/60">

              <p>
                Kathmandu, Nepal
              </p>

              <p>
                +977 9705435075
              </p>

              <p>
                Hello@NewtonFitness.com
              </p>

              <p>
                Sun–Fri · 5:00 AM – 10:00 PM
              </p>

            </div>

          </div>

        </div>


        {/* Bottom Footer */}

        <div className="flex flex-col justify-between gap-4 border-t border-[#E2DECE]/10 py-6 text-xs text-[#E2DECE]/30 sm:flex-row">

          <p>
            © 2026 NewtonFitness. All rights reserved.
          </p>

          <div className="flex gap-6">

            <a
              href="#"
              className="transition hover:text-[#E2DECE]"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-[#E2DECE]"
            >
              Terms of Service
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;