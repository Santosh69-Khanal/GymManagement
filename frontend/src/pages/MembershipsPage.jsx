import { useEffect, useState } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import AssignMembershipModal from "../components/dashboard/AssignMembershipModal";

import {
  getPlans,
  getMemberships,
  deleteMembership,
} from "../services/membershipService";

function MembershipsPage() {
  const [plans, setPlans] = useState([]);
  const [memberships, setMemberships] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Selected plan for assignment
  const [selectedPlan, setSelectedPlan] = useState(null);


  // =====================================================
  // FETCH DATA
  // =====================================================

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [plansData, membershipsData] = await Promise.all([
        getPlans(),
        getMemberships(),
      ]);

      setPlans(plansData.plans || []);
      setMemberships(membershipsData.memberships || []);

    } catch (error) {
      console.error(error);
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  // =====================================================
  // DELETE MEMBERSHIP
  // =====================================================

  const handleDeleteMembership = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this membership?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteMembership(id);

      await fetchData();

    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };


  // =====================================================
  // STATS
  // =====================================================

  const activePlans = plans.filter(
    (plan) => plan.status === "active"
  ).length;

  const activeMemberships = memberships.filter(
    (membership) => membership.status === "active"
  ).length;


  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-[#E2DECE] flex">

      {/* SIDEBAR */}

      <DashboardSidebar />


      {/* MAIN */}

      <div className="flex-1 min-w-0">

        <DashboardNavbar />


        <main className="p-6 md:p-10">


          {/* ================================================= */}
          {/* PAGE HEADER */}
          {/* ================================================= */}

          <div className="mb-8">

            <p className="text-[#73795D] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
              Management
            </p>

            <h1 className="text-4xl font-black text-[#2E2C26]">
              Memberships
            </h1>

            <p className="text-[#3D4F5A]/50 mt-2 text-sm">
              Manage plans and member memberships.
            </p>

          </div>


          {/* ================================================= */}
          {/* ERROR */}
          {/* ================================================= */}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
              {error}
            </div>
          )}


          {/* ================================================= */}
          {/* STATS */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">


            {/* TOTAL PLANS */}

            <div className="bg-[#2E2C26] rounded-2xl p-6">

              <p className="text-[#E2DECE]/45 text-[10px] uppercase tracking-widest font-bold">
                Total Plans
              </p>

              <h2 className="text-3xl font-black text-[#E2DECE] mt-4">
                {loading ? "..." : plans.length}
              </h2>

              <p className="text-[#E2DECE]/35 text-xs mt-2">
                Available membership plans
              </p>

            </div>


            {/* ACTIVE PLANS */}

            <div className="bg-[#73795D] rounded-2xl p-6">

              <p className="text-[#E2DECE]/70 text-[10px] uppercase tracking-widest font-bold">
                Active Plans
              </p>

              <h2 className="text-3xl font-black text-[#E2DECE] mt-4">
                {loading ? "..." : activePlans}
              </h2>

              <p className="text-[#E2DECE]/55 text-xs mt-2">
                Currently available
              </p>

            </div>


            {/* ACTIVE MEMBERSHIPS */}

            <div className="bg-[#3D4F5A] rounded-2xl p-6">

              <p className="text-[#E2DECE]/55 text-[10px] uppercase tracking-widest font-bold">
                Active Memberships
              </p>

              <h2 className="text-3xl font-black text-[#E2DECE] mt-4">
                {loading ? "..." : activeMemberships}
              </h2>

              <p className="text-[#E2DECE]/40 text-xs mt-2">
                Members with active plans
              </p>

            </div>

          </div>


          {/* ================================================= */}
          {/* MEMBERSHIP PLANS */}
          {/* ================================================= */}

          <section className="mb-10">

            <div className="mb-5">

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.2em] font-bold">
                Available
              </p>

              <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
                Membership Plans
              </h2>

            </div>


            {/* LOADING */}

            {loading ? (

              <div className="py-16 text-center">

                <div className="w-8 h-8 border-2 border-[#3D4F5A]/20 border-t-[#73795D] rounded-full animate-spin mx-auto" />

                <p className="text-[#3D4F5A]/50 text-sm mt-4">
                  Loading plans...
                </p>

              </div>


            ) : plans.length === 0 ? (

              /* NO PLANS */

              <div className="bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl py-16 text-center">

                <div className="w-14 h-14 rounded-full bg-[#3D4F5A]/5 flex items-center justify-center text-[#73795D] text-2xl mx-auto">
                  ◇
                </div>

                <h3 className="text-[#2E2C26] font-bold mt-5">
                  No membership plans
                </h3>

                <p className="text-[#3D4F5A]/45 text-sm mt-1">
                  No membership plans are available yet.
                </p>

              </div>


            ) : (

              /* PLAN CARDS */

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {plans.map((plan) => (

                  <div
                    key={plan.id}
                    className="bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition duration-300"
                  >

                    {/* TOP */}

                    <div className="flex items-start justify-between">

                      <div>

                        <p className="text-[#73795D] text-[10px] uppercase tracking-widest font-bold">
                          Plan
                        </p>

                        <h3 className="text-2xl font-black text-[#2E2C26] mt-1">
                          {plan.name}
                        </h3>

                      </div>


                      <span className="px-3 py-1.5 rounded-lg bg-[#73795D]/10 text-[#73795D] text-xs font-bold">
                        {plan.status}
                      </span>

                    </div>


                    {/* PRICE */}

                    <div className="mt-7">

                      <span className="text-4xl font-black text-[#2E2C26]">
                        Rs. {Number(plan.price).toLocaleString()}
                      </span>

                      <span className="text-[#3D4F5A]/40 text-sm ml-2">
                        / {plan.duration_months} month
                        {plan.duration_months > 1 ? "s" : ""}
                      </span>

                    </div>


                    {/* DESCRIPTION */}

                    <p className="text-[#3D4F5A]/50 text-sm mt-4 min-h-[40px]">
                      {plan.description || "No description available."}
                    </p>


                    {/* ASSIGN */}

                    <button
                      onClick={() => setSelectedPlan(plan)}
                      disabled={plan.status !== "active"}
                      className="mt-6 w-full py-3 rounded-xl bg-[#73795D] text-[#E2DECE] text-sm font-bold hover:bg-[#3D4F5A] transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Assign to Member →
                    </button>

                  </div>

                ))}

              </div>

            )}

          </section>


          {/* ================================================= */}
          {/* MEMBER MEMBERSHIPS */}
          {/* ================================================= */}

          <section>

            <div className="mb-5">

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.2em] font-bold">
                Assignments
              </p>

              <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
                Member Memberships
              </h2>

              <p className="text-[#3D4F5A]/45 text-sm mt-1">
                View memberships currently assigned to your members.
              </p>

            </div>


            {/* MEMBERSHIPS TABLE */}

            <div className="bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl overflow-hidden">


              {loading ? (

                <div className="py-16 text-center">

                  <div className="w-8 h-8 border-2 border-[#3D4F5A]/20 border-t-[#73795D] rounded-full animate-spin mx-auto" />

                  <p className="text-[#3D4F5A]/50 text-sm mt-4">
                    Loading memberships...
                  </p>

                </div>


              ) : memberships.length === 0 ? (

                /* EMPTY */

                <div className="py-16 text-center">

                  <div className="w-14 h-14 rounded-full bg-[#3D4F5A]/5 flex items-center justify-center text-[#73795D] text-2xl mx-auto">
                    ◇
                  </div>

                  <h3 className="text-[#2E2C26] font-bold mt-5">
                    No memberships assigned
                  </h3>

                  <p className="text-[#3D4F5A]/45 text-sm mt-1">
                    Assign a plan to a member to see it here.
                  </p>

                </div>


              ) : (

                <div className="overflow-x-auto">

                  <table className="w-full">

                    {/* HEADER */}

                    <thead>

                      <tr className="border-b border-[#3D4F5A]/10">

                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                          Member
                        </th>

                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                          Plan
                        </th>

                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                          Price
                        </th>

                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                          Start
                        </th>

                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                          End
                        </th>

                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                          Status
                        </th>

                        <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                          Action
                        </th>

                      </tr>

                    </thead>


                    {/* BODY */}

                    <tbody>

                      {memberships.map((membership) => (

                        <tr
                          key={membership.id}
                          className="border-b border-[#3D4F5A]/10 last:border-b-0 hover:bg-[#3D4F5A]/5 transition"
                        >

                          {/* MEMBER */}

                          <td className="px-6 py-5">

                            <p className="text-sm font-bold text-[#2E2C26]">
                              {membership.member_name}
                            </p>

                            <p className="text-xs text-[#3D4F5A]/40 mt-1">
                              {membership.member_email}
                            </p>

                          </td>


                          {/* PLAN */}

                          <td className="px-6 py-5">

                            <span className="inline-flex px-3 py-1.5 rounded-lg bg-[#73795D]/10 text-[#73795D] text-xs font-bold">
                              {membership.plan_name}
                            </span>

                          </td>


                          {/* PRICE */}

                          <td className="px-6 py-5 text-sm font-bold text-[#2E2C26]">
                            Rs.{" "}
                            {Number(
                              membership.price
                            ).toLocaleString()}
                          </td>


                          {/* START DATE */}

                          <td className="px-6 py-5 text-sm text-[#3D4F5A]">
                            {membership.start_date}
                          </td>


                          {/* END DATE */}

                          <td className="px-6 py-5 text-sm text-[#3D4F5A]">
                            {membership.end_date}
                          </td>


                          {/* STATUS */}

                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${
                                membership.status === "active"
                                  ? "bg-[#73795D]/10 text-[#73795D]"
                                  : "bg-[#3D4F5A]/10 text-[#3D4F5A]"
                              }`}
                            >

                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  membership.status === "active"
                                    ? "bg-[#73795D]"
                                    : "bg-[#3D4F5A]"
                                }`}
                              />

                              {membership.status || "inactive"}

                            </span>

                          </td>


                          {/* DELETE */}

                          <td className="px-6 py-5">

                            <button
                              onClick={() =>
                                handleDeleteMembership(
                                  membership.id
                                )
                              }
                              className="px-3 py-2 rounded-lg bg-red-500/10 text-red-600 text-xs font-bold hover:bg-red-500 hover:text-white transition"
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </section>

        </main>


        {/* ================================================= */}
        {/* ASSIGN MEMBERSHIP MODAL */}
        {/* ================================================= */}

        {selectedPlan && (

          <AssignMembershipModal
            plan={selectedPlan}

            onClose={() =>
              setSelectedPlan(null)
            }

            onAssigned={() => {
              setSelectedPlan(null);
              fetchData();
            }}
          />

        )}

      </div>

    </div>
  );
}

export default MembershipsPage;