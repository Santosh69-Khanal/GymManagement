import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

import { getTrainers } from "../services/trainerService";

function DashboardPage() {
  const navigate = useNavigate();

  const [memberCount, setMemberCount] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);
  const [membershipCount, setMembershipCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const [recentMembers, setRecentMembers] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // ==========================================
        // GET MEMBERS
        // ==========================================

        const membersResponse = await fetch(
          "http://localhost:5000/api/members",
          {
            headers,
          }
        );

        if (!membersResponse.ok) {
          throw new Error("Failed to fetch members");
        }

        const membersData = await membersResponse.json();

        const members = membersData.members || [];

        setMemberCount(members.length);

        // Show latest 5 members
        const latestMembers = [...members]
          .sort((a, b) => Number(b.id) - Number(a.id))
          .slice(0, 5);

        setRecentMembers(latestMembers);

        // ==========================================
        // GET TRAINERS
        // ==========================================

        const trainersData = await getTrainers();

        const activeTrainers = (trainersData.trainers || []).filter(
          (trainer) => trainer.status === "active"
        );

        setTrainerCount(activeTrainers.length);

        // ==========================================
        // GET MEMBERSHIPS
        // ==========================================

        const membershipsResponse = await fetch(
          "http://localhost:5000/api/memberships",
          {
            headers,
          }
        );

        if (!membershipsResponse.ok) {
          throw new Error("Failed to fetch memberships");
        }

        const membershipsData = await membershipsResponse.json();

        const activeMemberships = (
          membershipsData.memberships || []
        ).filter((membership) => membership.status === "active");

        setMembershipCount(activeMemberships.length);

        // ==========================================
        // GET PAYMENTS
        // ==========================================

        const paymentsResponse = await fetch(
          "http://localhost:5000/api/payments",
          {
            headers,
          }
        );

        if (!paymentsResponse.ok) {
          throw new Error("Failed to fetch payments");
        }

        const paymentsData = await paymentsResponse.json();

        const payments = paymentsData.payments || [];

        // ==========================================
        // CALCULATE THIS MONTH'S REVENUE
        // ==========================================

        const now = new Date();

        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const monthlyRevenue = payments
          .filter((payment) => {
            if (!payment.payment_date) {
              return false;
            }

            const paymentDate = new Date(payment.payment_date);

            return (
              paymentDate.getMonth() === currentMonth &&
              paymentDate.getFullYear() === currentYear
            );
          })
          .reduce((total, payment) => {
            return total + Number(payment.amount || 0);
          }, 0);

        setRevenue(monthlyRevenue);

      } catch (error) {
        console.error("DASHBOARD ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#E2DECE] flex">

      <DashboardSidebar />

      <div className="flex-1 min-w-0">

        <DashboardNavbar />

        <main className="p-6 md:p-10">

          {/* HERO */}

          <section className="relative overflow-hidden rounded-3xl bg-[#3D4F5A] p-7 md:p-10 mb-8">

            <div className="absolute -right-20 -top-32 w-80 h-80 rounded-full border border-[#E2DECE]/10" />

            <div className="absolute -right-10 -bottom-40 w-72 h-72 rounded-full bg-[#73795D]/20 blur-3xl" />

            <div className="relative z-10 max-w-2xl">

              <p className="text-[#E2DECE]/50 text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
                Good evening, Newton
              </p>

              <h1 className="text-4xl md:text-5xl font-black leading-tight text-[#E2DECE]">
                Keep your gym
                <br />
                <span className="text-[#73795D]">
                  moving forward.
                </span>
              </h1>

              <p className="text-[#E2DECE]/55 mt-5 max-w-lg leading-relaxed">
                Here's a quick overview of what's happening
                across NewtonFitness today.
              </p>

            </div>

          </section>

          {/* STAT HEADER */}

          <div className="flex items-end justify-between mb-5">

            <div>

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.25em] font-bold">
                Overview
              </p>

              <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
                Gym statistics
              </h2>

            </div>

            <span className="hidden sm:block text-xs text-[#3D4F5A]/40">
              Live data
            </span>

          </div>

          {/* STAT CARDS */}

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

            {/* MEMBERS */}

            <div
              onClick={() => navigate("/members")}
              className="group bg-[#2E2C26] rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >

              <div className="flex items-start justify-between">

                <p className="text-[#E2DECE]/45 text-[10px] uppercase tracking-widest font-bold">
                  Members
                </p>

                <span className="w-8 h-8 rounded-lg bg-[#E2DECE]/5 flex items-center justify-center text-[#73795D]">
                  +
                </span>

              </div>

              <h3 className="text-4xl font-black text-[#E2DECE] mt-6">
                {loading ? "..." : memberCount}
              </h3>

              <p className="text-[#E2DECE]/35 text-xs mt-2">
                Total registered members
              </p>

            </div>

            {/* TRAINERS */}

            <div
              onClick={() => navigate("/trainers")}
              className="group bg-[#3D4F5A] rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >

              <div className="flex items-start justify-between">

                <p className="text-[#E2DECE]/55 text-[10px] uppercase tracking-widest font-bold">
                  Trainers
                </p>

                <span className="w-8 h-8 rounded-lg bg-[#E2DECE]/10 flex items-center justify-center text-[#E2DECE]">
                  +
                </span>

              </div>

              <h3 className="text-4xl font-black text-[#E2DECE] mt-6">
                {loading ? "..." : trainerCount}
              </h3>

              <p className="text-[#E2DECE]/40 text-xs mt-2">
                Active trainers
              </p>

            </div>

            {/* MEMBERSHIPS */}

            <div
              onClick={() => navigate("/memberships")}
              className="group bg-[#73795D] rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >

              <div className="flex items-start justify-between">

                <p className="text-[#E2DECE]/70 text-[10px] uppercase tracking-widest font-bold">
                  Memberships
                </p>

                <span className="w-8 h-8 rounded-lg bg-[#E2DECE]/10 flex items-center justify-center text-[#E2DECE]">
                  +
                </span>

              </div>

              <h3 className="text-4xl font-black text-[#E2DECE] mt-6">
                {loading ? "..." : membershipCount}
              </h3>

              <p className="text-[#E2DECE]/55 text-xs mt-2">
                Active memberships
              </p>

            </div>

            {/* REVENUE */}

            <div
              onClick={() => navigate("/payments")}
              className="group bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >

              <div className="flex items-start justify-between">

                <p className="text-[#3D4F5A]/50 text-[10px] uppercase tracking-widest font-bold">
                  Revenue
                </p>

                <span className="w-8 h-8 rounded-lg bg-[#3D4F5A]/5 flex items-center justify-center text-[#73795D]">
                  ↗
                </span>

              </div>

              <h3 className="text-4xl font-black text-[#2E2C26] mt-6">
                {loading ? "..." : `Rs. ${revenue.toLocaleString()}`}
              </h3>

              <p className="text-[#3D4F5A]/45 text-xs mt-2">
                This month's revenue
              </p>

            </div>

          </section>

          {/* LOWER CONTENT */}

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-8">

            {/* RECENT MEMBERS */}

            <div className="xl:col-span-2 bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl overflow-hidden">

              <div className="p-7 flex items-center justify-between border-b border-[#3D4F5A]/10">

                <div>

                  <p className="text-[#73795D] text-[10px] uppercase tracking-[0.2em] font-bold">
                    Members
                  </p>

                  <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
                    Recent members
                  </h2>

                </div>

                <button
                  onClick={() => navigate("/members")}
                  className="text-xs font-bold text-[#3D4F5A] hover:text-[#73795D] transition"
                >
                  View all →
                </button>

              </div>

              {/* MEMBERS LIST */}

              <div className="p-7">

                {loading ? (

                  <div className="min-h-48 flex items-center justify-center text-[#3D4F5A]/50 text-sm">
                    Loading members...
                  </div>

                ) : recentMembers.length === 0 ? (

                  <div className="min-h-48 rounded-xl border border-dashed border-[#3D4F5A]/20 flex flex-col items-center justify-center">

                    <div className="w-12 h-12 rounded-full bg-[#3D4F5A]/5 flex items-center justify-center text-[#73795D] text-xl">
                      +
                    </div>

                    <p className="text-[#2E2C26] font-bold mt-4">
                      No members yet
                    </p>

                    <p className="text-[#3D4F5A]/45 text-xs mt-1">
                      New members will appear here.
                    </p>

                  </div>

                ) : (

                  <div className="space-y-3">

                    {recentMembers.map((member) => (

                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-[#3D4F5A]/5 hover:bg-[#3D4F5A]/10 transition"
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-10 h-10 rounded-full bg-[#73795D] flex items-center justify-center text-[#E2DECE] font-black text-sm">
                            {member.name?.charAt(0)?.toUpperCase() || "M"}
                          </div>

                          <div>

                            <p className="font-bold text-sm text-[#2E2C26]">
                              {member.name}
                            </p>

                            <p className="text-xs text-[#3D4F5A]/45">
                              {member.email}
                            </p>

                          </div>

                        </div>

                        <div className="text-right">

                          <p className="text-xs font-bold text-[#73795D]">
                            {member.membership_type || "No membership"}
                          </p>

                          <p className="text-[10px] text-[#3D4F5A]/40 mt-1">
                            {member.status || "active"}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </div>

            {/* QUICK ACTIONS */}

            <div className="bg-[#2E2C26] rounded-2xl p-7">

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.2em] font-bold">
                Shortcuts
              </p>

              <h2 className="text-2xl font-black text-[#E2DECE] mt-1 mb-7">
                Quick actions
              </h2>

              <div className="space-y-3">

                <button
                  onClick={() => navigate("/members")}
                  className="group w-full flex items-center justify-between px-5 py-4 rounded-xl bg-[#E2DECE]/5 text-[#E2DECE] hover:bg-[#73795D] transition duration-300"
                >
                  <span className="text-sm font-medium">
                    Add member
                  </span>

                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>

                <button
                  onClick={() => navigate("/trainers")}
                  className="group w-full flex items-center justify-between px-5 py-4 rounded-xl bg-[#E2DECE]/5 text-[#E2DECE] hover:bg-[#73795D] transition duration-300"
                >
                  <span className="text-sm font-medium">
                    Add trainer
                  </span>

                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>

                <button
                  onClick={() => navigate("/payments")}
                  className="group w-full flex items-center justify-between px-5 py-4 rounded-xl bg-[#E2DECE]/5 text-[#E2DECE] hover:bg-[#73795D] transition duration-300"
                >
                  <span className="text-sm font-medium">
                    Record payment
                  </span>

                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>

              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default DashboardPage;