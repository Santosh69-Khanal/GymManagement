import { ArrowUpRight } from "lucide-react";

function Trainers() {

  const trainers = [
    {
      name: "Alex Morgan",
      role: "Strength & Conditioning",
      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&q=85",
    },

    {
      name: "Sarah Wilson",
      role: "Movement & Fitness",
      image:
        "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=900&q=85",
    },

    {
      name: "Mike Johnson",
      role: "Personal Training",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=85",
    },
  ];

  return (
    <section
      id="trainers"
      className="bg-[#E2DECE] px-6 py-24 lg:px-8"
    >

      <div className="mx-auto max-w-7xl">

        <div className="mb-16 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#73795D]">
              Our Team
            </p>

            <h2 className="text-4xl font-light sm:text-5xl">
              Meet the people
              <span className="italic text-[#3D4F5A]">
                {" "}behind NewtonFitness.
              </span>
            </h2>

          </div>

          <a
            href="#contact"
            className="flex items-center gap-2 border-b border-[#2E2C26] pb-2 text-sm"
          >
            Meet all trainers
            <ArrowUpRight size={17} />
          </a>

        </div>


        <div className="grid gap-6 md:grid-cols-3">

          {trainers.map((trainer) => (

            <div key={trainer.name}>

              <div className="group overflow-hidden">

                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="h-[450px] w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />

              </div>

              <div className="flex justify-between border-b border-[#2E2C26]/15 py-5">

                <div>

                  <h3 className="font-medium">
                    {trainer.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#2E2C26]/50">
                    {trainer.role}
                  </p>

                </div>

                <ArrowUpRight
                  size={20}
                  className="text-[#73795D]"
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Trainers;