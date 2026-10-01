import {
  Check,
  Leaf,
  Sparkles,
  Users,
  Target,
} from "lucide-react";

function WhyChooseUs() {

  const reasons = [
    {
      icon: Target,
      title: "Goal Focused",
      text: "Training designed around what you actually want to achieve."
    },
    {
      icon: Users,
      title: "Real Community",
      text: "A welcoming environment where everyone has a place."
    },
    {
      icon: Leaf,
      title: "Balanced Approach",
      text: "Fitness that supports your body, mind, and everyday life."
    },
    {
      icon: Sparkles,
      title: "Quality First",
      text: "Thoughtfully selected equipment and experienced trainers."
    }
  ];

  return (
    <section className="bg-[#E2DECE] px-6 py-24 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Image */}

          <div className="order-2 lg:order-1">

            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=85"
              alt="Fitness training"
              className="h-[600px] w-full object-cover"
            />

          </div>


          {/* Content */}

          <div className="order-1 lg:order-2">

            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#73795D]">
              Why FormFit
            </p>

            <h2 className="text-4xl font-light leading-tight sm:text-5xl">

              A different kind of
              <span className="block italic text-[#3D4F5A]">
                fitness experience.
              </span>

            </h2>

            <p className="mt-7 leading-8 text-[#2E2C26]/65">
              We believe great fitness isn't about pushing yourself
              until you're exhausted. It's about building habits,
              understanding your body, and becoming stronger over time.
            </p>


            <div className="mt-10 grid gap-7 sm:grid-cols-2">

              {reasons.map((reason) => {

                const Icon = reason.icon;

                return (
                  <div
                    key={reason.title}
                    className="border-t border-[#2E2C26]/15 pt-5"
                  >

                    <Icon
                      size={25}
                      strokeWidth={1.5}
                      className="mb-4 text-[#73795D]"
                    />

                    <h3 className="mb-2 font-medium">
                      {reason.title}
                    </h3>

                    <p className="text-sm leading-6 text-[#2E2C26]/55">
                      {reason.text}
                    </p>

                  </div>
                );

              })}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;