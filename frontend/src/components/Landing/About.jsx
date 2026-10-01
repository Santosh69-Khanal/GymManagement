import { ArrowUpRight } from "lucide-react";

function About() {
  return (
    <section id="about" className="bg-[#E2DECE] px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85"
              alt="Modern gym"
              className="h-[550px] w-full object-cover"
            />

            <div className="absolute bottom-6 right-6 bg-[#73795D] px-6 py-5 text-[#E2DECE]">
              <p className="text-3xl font-light">10+</p>

              <p className="text-sm">Years of movement</p>
            </div>
          </div>

          {/* Content */}

          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#73795D]">
              About FormFit
            </p>

            <h2 className="text-4xl font-light leading-tight sm:text-5xl">
              Fitness should feel
              <span className="italic text-[#3D4F5A]"> good.</span>
            </h2>

            <p className="mt-7 leading-8 text-[#2E2C26]/65">
              We created FormFit to make fitness feel less intimidating and more
              intentional. Our space combines thoughtful training, modern
              equipment, and expert guidance.
            </p>

            <p className="mt-5 leading-8 text-[#2E2C26]/65">
              Whether you're beginning your fitness journey or looking to take
              your training further, we're here to help you move with
              confidence.
            </p>

            <a
              href="#facilities"
              className="mt-8 inline-flex items-center gap-2 border-b border-[#2E2C26] pb-2 text-sm font-medium"
            >
              Explore our space
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
