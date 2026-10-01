import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1800&q=85')",
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#2E2C26]/55"></div>


      {/* Content */}
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-6 py-24 lg:px-8">

        <div className="max-w-3xl text-[#E2DECE]">

          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-[#E2DECE]/80">
            Move Better. Feel Stronger.
          </p>


          <h1 className="text-5xl font-light leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">

            A healthier

            <span className="block italic text-[#E2DECE]/80">
              you starts here.
            </span>

          </h1>


          <p className="mt-8 max-w-xl text-base leading-7 text-[#E2DECE]/80 sm:text-lg">
            A thoughtful approach to fitness, movement, and wellbeing.
            Train in a space designed to help you become your strongest
            self.
          </p>


          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">

            {/* START YOUR JOURNEY */}
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 bg-[#E2DECE] px-7 py-4 text-[#2E2C26] transition hover:bg-white"
            >
              Start Your Journey
              <ArrowRight size={18} />
            </Link>


            {/* DISCOVER MORE */}
            <a
              href="#about"
              className="flex items-center justify-center gap-2 border border-[#E2DECE]/60 px-7 py-4 transition hover:bg-[#E2DECE] hover:text-[#2E2C26]"
            >
              <Play size={17} />
              Discover More
            </a>

          </div>


          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-10 border-t border-[#E2DECE]/20 pt-8">

            <div>
              <p className="text-3xl font-light">
                500+
              </p>

              <p className="mt-1 text-sm text-[#E2DECE]/60">
                Active Members
              </p>
            </div>


            <div>
              <p className="text-3xl font-light">
                20+
              </p>

              <p className="mt-1 text-sm text-[#E2DECE]/60">
                Expert Trainers
              </p>
            </div>


            <div>
              <p className="text-3xl font-light">
                10
              </p>

              <p className="mt-1 text-sm text-[#E2DECE]/60">
                Years Experience
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;