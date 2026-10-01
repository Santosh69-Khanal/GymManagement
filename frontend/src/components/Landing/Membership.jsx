import { Check } from "lucide-react";
import { Link } from "react-router-dom";

function Membership() {
  const plans = [
    {
      name: "Essential",
      price: "$25",
      description: "Everything you need to get started.",
      features: [
        "Full gym access",
        "Locker access",
        "Free Wi-Fi",
      ],
    },

    {
      name: "Complete",
      price: "$40",
      description: "Our most popular way to train.",
      popular: true,
      features: [
        "Full gym access",
        "Locker access",
        "Group classes",
        "Fitness assessment",
      ],
    },

    {
      name: "Personal",
      price: "$60",
      description: "A more personal approach to fitness.",
      features: [
        "Unlimited gym access",
        "Personal trainer",
        "Nutrition guidance",
        "All group classes",
      ],
    },
  ];

  return (
    <section
      id="membership"
      className="bg-[#2E2C26] px-6 py-24 text-[#E2DECE] lg:px-8"
    >
      <div className="mx-auto max-w-6xl">

        {/* Heading */}

        <div className="mb-16 text-center">

          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#E2DECE]/50">
            Membership
          </p>

          <h2 className="text-4xl font-light sm:text-5xl">
            Find your way to train.
          </h2>

        </div>


        {/* Plans */}

        <div className="grid gap-5 lg:grid-cols-3">

          {plans.map((plan) => (

            <div
              key={plan.name}
              className={`relative p-8 ${
                plan.popular
                  ? "bg-[#E2DECE] text-[#2E2C26]"
                  : "border border-[#E2DECE]/15 bg-[#2E2C26]"
              }`}
            >

              {/* Popular Badge */}

              {plan.popular && (
                <span className="absolute right-6 top-6 bg-[#73795D] px-3 py-1 text-xs text-[#E2DECE]">
                  POPULAR
                </span>
              )}


              {/* Plan Name */}

              <p className="text-sm uppercase tracking-widest opacity-60">
                {plan.name}
              </p>


              {/* Price */}

              <div className="mt-6">

                <span className="text-5xl font-light">
                  {plan.price}
                </span>

                <span className="ml-2 text-sm opacity-50">
                  / month
                </span>

              </div>


              {/* Description */}

              <p className="mt-5 text-sm leading-6 opacity-60">
                {plan.description}
              </p>


              {/* Features */}

              <div className="my-8 border-t border-current/10 pt-6">

                {plan.features.map((feature) => (

                  <div
                    key={feature}
                    className="mb-4 flex items-center gap-3 text-sm"
                  >

                    <Check
                      size={17}
                      className="text-[#73795D]"
                    />

                    {feature}

                  </div>

                ))}

              </div>


              {/* Choose Plan */}

              <Link
                to="/login"
                className={`block w-full py-4 text-center text-sm font-medium transition ${
                  plan.popular
                    ? "bg-[#3D4F5A] text-[#E2DECE] hover:bg-[#73795D]"
                    : "border border-[#E2DECE]/30 hover:bg-[#E2DECE] hover:text-[#2E2C26]"
                }`}
              >
                Choose Plan
              </Link>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Membership;