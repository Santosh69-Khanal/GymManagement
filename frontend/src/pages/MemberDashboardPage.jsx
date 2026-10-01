import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MemberDashboardPage() {

  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [membership, setMembership] = useState(null);
  const [payments, setPayments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [stats, setStats] = useState({
    total_visits: 0,
    weekly_visits: 0,
    today_visits: 0,
    total_payments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");


  // ==========================================
  // FETCH DASHBOARD
  // ==========================================

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const response = await fetch(
          "http://localhost:5000/api/member-dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const data = await response.json();


        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load dashboard"
          );
        }


        setMember(data.member);

        setMembership(data.membership);

        setPayments(data.payments || []);

        setAttendance(data.attendance || []);

        setStats(
          data.stats || {
            total_visits: 0,
            weekly_visits: 0,
            today_visits: 0,
            total_payments: 0,
          }
        );


      } catch (error) {

        console.error(error);

        setError(error.message);

      } finally {

        setLoading(false);

      }

    };


    fetchDashboard();

  }, [token]);


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#E2DECE] flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-2 border-[#3D4F5A]/20 border-t-[#73795D] rounded-full animate-spin mx-auto" />

          <p className="text-[#3D4F5A]/50 text-sm mt-4">
            Loading your dashboard...
          </p>

        </div>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="min-h-screen bg-[#E2DECE] flex items-center justify-center px-6">

        <div className="max-w-md w-full bg-[#2E2C26] rounded-2xl p-8">

          <p className="text-red-400 text-sm">
            {error}
          </p>

          <button
            onClick={handleLogout}
            className="mt-5 bg-[#73795D] text-[#E2DECE] px-5 py-3 rounded-xl font-bold text-sm"
          >
            Back to Login
          </button>

        </div>

      </div>

    );

  }


  // ==========================================
  // DATA
  // ==========================================

  const firstName =
    member?.name?.split(" ")[0] || "Member";


  const latestPayment =
    payments.length > 0
      ? payments[0]
      : null;


  const daysRemaining =
    membership?.days_remaining ?? 0;


  return (

    <div className="min-h-screen bg-[#E2DECE] text-[#2E2C26]">


      {/* ======================================
          NAVBAR
      ====================================== */}

      <nav className="bg-[#2E2C26] text-[#E2DECE]">

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#73795D] flex items-center justify-center">

                <span className="font-black text-lg">
                  N
                </span>

              </div>

              <div>

                <h1 className="text-xl font-black">

                  Newton
                  <span className="text-[#73795D]">
                    Fitness
                  </span>

                </h1>

                <p className="text-[#E2DECE]/30 text-[9px] uppercase tracking-[0.2em]">
                  Member Portal
                </p>

              </div>

            </div>


            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-bold text-[#E2DECE]/50 hover:text-[#E2DECE] transition"
            >

              Logout

              <span>
                ↪
              </span>

            </button>

          </div>

        </div>

      </nav>


      {/* ======================================
          MAIN
      ====================================== */}

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-10">


        {/* ======================================
            HERO
        ====================================== */}

        <section className="relative overflow-hidden bg-[#3D4F5A] rounded-3xl p-7 md:p-10 text-[#E2DECE] mb-7">

          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full border border-[#E2DECE]/10" />

          <div className="absolute -right-10 -bottom-32 w-80 h-80 rounded-full bg-[#73795D]/20 blur-3xl" />


          <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">

            <div>

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.3em] font-black mb-3">
                Member Dashboard
              </p>

              <h1 className="text-4xl md:text-6xl font-black leading-none">

                Welcome,

                <br />

                <span className="text-[#73795D]">
                  {firstName}.
                </span>

              </h1>

              <p className="text-[#E2DECE]/50 mt-5 max-w-md">
                Keep showing up. Keep getting stronger.
                Your fitness journey is right here.
              </p>

            </div>


            {/* MEMBERSHIP */}

            <div className="bg-[#2E2C26]/70 border border-[#E2DECE]/10 rounded-2xl p-5 min-w-[240px]">

              <p className="text-[#E2DECE]/40 text-[9px] uppercase tracking-[0.2em] font-bold">
                Current Membership
              </p>

              <p className="text-xl font-black mt-2">
                {membership?.plan_name || "No Membership"}
              </p>

              <div className="flex items-center gap-2 mt-3">

                <span
                  className={`w-2 h-2 rounded-full ${
                    membership?.is_active
                      ? "bg-[#73795D]"
                      : "bg-red-400"
                  }`}
                />

                <span className="text-xs text-[#E2DECE]/60">
                  {membership?.is_active
                    ? "Active"
                    : "Expired"}
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* ======================================
            TOP STAT CARDS
        ====================================== */}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">


          {/* DAYS REMAINING */}

          <div className="bg-[#2E2C26] rounded-2xl p-6 text-[#E2DECE]">

            <p className="text-[#E2DECE]/35 text-[9px] uppercase tracking-[0.2em] font-bold">
              Membership Time
            </p>

            <h2 className="text-4xl font-black mt-4">

              {membership
                ? daysRemaining
                : 0}

            </h2>

            <p className="text-[#E2DECE]/35 text-xs mt-2">

              {daysRemaining === 1
                ? "day remaining"
                : "days remaining"}

            </p>

          </div>


          {/* THIS WEEK */}

          <div className="bg-[#73795D] rounded-2xl p-6 text-[#E2DECE]">

            <p className="text-[#E2DECE]/60 text-[9px] uppercase tracking-[0.2em] font-bold">
              This Week
            </p>

            <h2 className="text-4xl font-black mt-4">
              {stats.weekly_visits}
            </h2>

            <p className="text-[#E2DECE]/60 text-xs mt-2">
              Gym visits this week
            </p>

          </div>


          {/* TOTAL VISITS */}

          <div className="bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl p-6">

            <p className="text-[#3D4F5A]/40 text-[9px] uppercase tracking-[0.2em] font-bold">
              Total Visits
            </p>

            <h2 className="text-4xl font-black mt-4">
              {stats.total_visits}
            </h2>

            <p className="text-[#3D4F5A]/40 text-xs mt-2">
              Lifetime gym visits
            </p>

          </div>


          {/* TODAY */}

          <div className="bg-[#3D4F5A] rounded-2xl p-6 text-[#E2DECE]">

            <p className="text-[#E2DECE]/35 text-[9px] uppercase tracking-[0.2em] font-bold">
              Today
            </p>

            <h2 className="text-4xl font-black mt-4">
              {stats.today_visits}
            </h2>

            <p className="text-[#E2DECE]/35 text-xs mt-2">
              Today's check-ins
            </p>

          </div>

        </section>


        {/* ======================================
            MEMBERSHIP + ATTENDANCE
        ====================================== */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-7">


          {/* MEMBERSHIP CARD */}

          <div className="bg-[#2E2C26] rounded-2xl p-7 text-[#E2DECE] relative overflow-hidden">

            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#73795D]/10 blur-2xl" />

            <div className="relative z-10">

              <p className="text-[#E2DECE]/35 text-[9px] uppercase tracking-[0.2em] font-bold">
                Membership
              </p>

              <h2 className="text-3xl font-black mt-2">
                {membership?.plan_name || "No Plan"}
              </h2>


              {/* DAYS REMAINING BIG */}

              <div className="mt-7 p-5 rounded-xl bg-[#E2DECE]/5">

                <p className="text-[#E2DECE]/30 text-[9px] uppercase tracking-widest">
                  Time Remaining
                </p>

                <p className="text-4xl font-black mt-2 text-[#73795D]">
                  {daysRemaining}
                  <span className="text-lg ml-2 text-[#E2DECE]/50">
                    days
                  </span>
                </p>

              </div>


              <div className="mt-6 grid grid-cols-2 gap-5">

                <div>

                  <p className="text-[#E2DECE]/30 text-[9px] uppercase tracking-widest">
                    Start Date
                  </p>

                  <p className="text-sm font-bold mt-1">
                    {membership?.start_date || "—"}
                  </p>

                </div>


                <div>

                  <p className="text-[#E2DECE]/30 text-[9px] uppercase tracking-widest">
                    End Date
                  </p>

                  <p className="text-sm font-bold mt-1">
                    {membership?.end_date || "—"}
                  </p>

                </div>

              </div>


              <div className="mt-6">

                <p className="text-[#E2DECE]/30 text-[9px] uppercase tracking-widest">
                  Status
                </p>

                <span
                  className={`inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg text-xs font-bold ${
                    membership?.is_active
                      ? "bg-[#73795D]/20 text-[#73795D]"
                      : "bg-red-400/10 text-red-400"
                  }`}
                >

                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      membership?.is_active
                        ? "bg-[#73795D]"
                        : "bg-red-400"
                    }`}
                  />

                  {membership?.is_active
                    ? "Active"
                    : "Expired"}

                </span>

              </div>

            </div>

          </div>


          {/* WEEKLY ACTIVITY */}

          <div className="bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl overflow-hidden">

            <div className="p-6 border-b border-[#3D4F5A]/10">

              <p className="text-[#73795D] text-[9px] uppercase tracking-[0.2em] font-bold">
                Your Activity
              </p>

              <h2 className="text-2xl font-black mt-1">
                This Week
              </h2>

            </div>


            <div className="p-6">

              <div className="flex items-end justify-between mb-6">

                <div>

                  <p className="text-5xl font-black">
                    {stats.weekly_visits}
                  </p>

                  <p className="text-xs text-[#3D4F5A]/40 mt-2">
                    visits this week
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-[#73795D] text-sm font-black">
                    {stats.weekly_visits >= 3
                      ? "Great work!"
                      : "Keep going!"}
                  </p>

                  <p className="text-xs text-[#3D4F5A]/40 mt-1">
                    Consistency is key
                  </p>

                </div>

              </div>


              {/* SIMPLE WEEKLY BAR */}

              <div className="grid grid-cols-7 gap-2">

                {[
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                  "Sun",
                ].map((day) => (

                  <div
                    key={day}
                    className="text-center"
                  >

                    <div className="h-28 bg-[#3D4F5A]/5 rounded-lg flex items-end justify-center overflow-hidden">

                      <div
                        className="w-full bg-[#73795D] rounded-lg min-h-1"
                        style={{
                          height:
                            attendance.some(
                              (record) => {

                                const date =
                                  new Date(
                                    record.attendance_date
                                  );

                                const dayName =
                                  date.toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "short",
                                    }
                                  );

                                return dayName === day;
                              }
                            )
                              ? "75%"
                              : "5%",
                        }}
                      />

                    </div>

                    <p className="text-[9px] font-bold text-[#3D4F5A]/40 mt-2">
                      {day}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>


        {/* ======================================
            RECENT ATTENDANCE
        ====================================== */}

        <section className="bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl overflow-hidden mb-7">

          <div className="p-6 border-b border-[#3D4F5A]/10">

            <p className="text-[#73795D] text-[9px] uppercase tracking-[0.2em] font-bold">
              Your Activity
            </p>

            <h2 className="text-2xl font-black mt-1">
              Recent Attendance
            </h2>

          </div>


          {attendance.length === 0 ? (

            <div className="p-10 text-center">

              <div className="w-12 h-12 rounded-full bg-[#3D4F5A]/5 flex items-center justify-center mx-auto text-[#73795D] text-xl">
                ◷
              </div>

              <p className="text-[#3D4F5A]/40 text-sm mt-4">
                No attendance records yet.
              </p>

            </div>

          ) : (

            <div>

              {attendance.slice(0, 5).map((record) => (

                <div
                  key={record.id}
                  className="px-6 py-4 flex items-center justify-between border-b border-[#3D4F5A]/10 last:border-b-0"
                >

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-[#73795D]/10 flex items-center justify-center text-[#73795D]">
                      ✓
                    </div>

                    <div>

                      <p className="text-sm font-bold">
                        Gym Visit
                      </p>

                      <p className="text-xs text-[#3D4F5A]/40 mt-0.5">
                        {record.attendance_date}
                      </p>

                    </div>

                  </div>

                  <p className="text-xs font-bold text-[#3D4F5A]/50">
                    {record.check_in_time}
                  </p>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* ======================================
            LATEST PAYMENT
        ====================================== */}

        <section className="bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl overflow-hidden">

          <div className="p-6 border-b border-[#3D4F5A]/10">

            <p className="text-[#73795D] text-[9px] uppercase tracking-[0.2em] font-bold">
              Billing
            </p>

            <h2 className="text-2xl font-black mt-1">
              Latest Payment
            </h2>

          </div>


          {latestPayment ? (

            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>

                <p className="text-lg font-black">
                  {latestPayment.plan_name || "Membership Payment"}
                </p>

                <p className="text-xs text-[#3D4F5A]/40 mt-1">
                  {latestPayment.payment_date}
                </p>

              </div>


              <div className="flex items-center gap-8">

                <div>

                  <p className="text-[9px] uppercase tracking-widest text-[#3D4F5A]/40">
                    Amount
                  </p>

                  <p className="text-lg font-black mt-1">
                    Rs. {latestPayment.amount}
                  </p>

                </div>


                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#73795D]/10 text-[#73795D] text-xs font-bold">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#73795D]" />

                  {latestPayment.status || "Paid"}

                </span>

              </div>

            </div>

          ) : (

            <div className="p-8 text-center">

              <p className="text-[#3D4F5A]/40 text-sm">
                No payment records yet.
              </p>

            </div>

          )}

        </section>


        {/* ======================================
            FOOTER
        ====================================== */}

        <div className="mt-10 pt-6 border-t border-[#3D4F5A]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

          <p className="text-[#3D4F5A]/30 text-[10px] uppercase tracking-[0.2em]">
            NewtonFitness Member Portal
          </p>

          <p className="text-[#3D4F5A]/30 text-[10px]">
            © 2026 NewtonFitness
          </p>

        </div>

      </main>

    </div>

  );

}

export default MemberDashboardPage;