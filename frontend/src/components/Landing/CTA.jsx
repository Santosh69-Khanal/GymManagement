import { ArrowRight } from "lucide-react";

function CTA() {
  return (
    <section
      className="relative bg-cover bg-center px-6 py-32 lg:px-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=85')",
      }}
    >

      <div className="absolute inset-0 bg-[#3D4F5A]/75"></div>

      <div className="relative mx-auto max-w-4xl text-center text-[#E2DECE]">

        <p className="mb-5 text-sm uppercase tracking-[0.3em] text-[#E2DECE]/60">
          Your next chapter
        </p>

        <h2 className="text-5xl font-light leading-tight sm:text-7xl">

          Ready to move
          <span className="block italic">
            differently?
          </span>

        </h2>

        <p className="mx-auto mt-7 max-w-xl leading-7 text-[#E2DECE]/70">
          Start building a healthier relationship with movement,
          one session at a time.
        </p>

        <a
          href="#membership"
          className="mt-9 inline-flex items-center gap-2 bg-[#E2DECE] px-8 py-4 text-[#2E2C26] transition hover:bg-white"
        >
          Start Your Journey
          <ArrowRight size={18} />
        </a>

      </div>

    </section>
  );
}

export default CTA;