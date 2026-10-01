import {
  Dumbbell,
  HeartPulse,
  UserRound,
  ShowerHead,
} from "lucide-react";

function Facilities() {

  const facilities = [
    {
      icon: Dumbbell,
      title: "Strength Studio",
      text: "Quality equipment designed for strength, mobility, and functional training."
    },
    {
      icon: HeartPulse,
      title: "Cardio Space",
      text: "A dedicated space for improving endurance, stamina, and cardiovascular health."
    },
    {
      icon: UserRound,
      title: "Personal Training",
      text: "One-on-one guidance from experienced trainers who understand your goals."
    },
    {
      icon: ShowerHead,
      title: "Recovery & Wellness",
      text: "Clean changing areas and everything you need before and after your workout."
    }
  ];

  return (
    <section
      id="facilities"
      className="bg-[#3D4F5A] px-6 py-24 text-[#E2DECE] lg:px-8"
    >

      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <div className="mb-16 max-w-2xl">

          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#E2DECE]/60">
            Our Space
          </p>

          <h2 className="text-4xl font-light leading-tight sm:text-5xl">
            Everything you need
            <span className="block italic text-[#E2DECE]/70">
              to move better.
            </span>
          </h2>

        </div>


        {/* Cards */}

        <div className="grid gap-px bg-[#E2DECE]/15 md:grid-cols-2 lg:grid-cols-4">

          {facilities.map((facility) => {

            const Icon = facility.icon;

            return (
              <div
                key={facility.title}
                className="bg-[#3D4F5A] p-8 transition hover:bg-[#2E2C26]"
              >

                <Icon
                  size={34}
                  strokeWidth={1.3}
                  className="mb-10"
                />

                <h3 className="mb-4 text-xl font-medium">
                  {facility.title}
                </h3>

                <p className="text-sm leading-7 text-[#E2DECE]/60">
                  {facility.text}
                </p>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Facilities;