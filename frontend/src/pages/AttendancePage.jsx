import { useEffect, useState } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");


  // Get attendance
  const fetchAttendance = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/attendance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch attendance");
      }

      setAttendance(data.attendance);

    } catch (error) {
      console.error(error);
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };


  // Get members
  const fetchMembers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/members",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch members");
      }

      setMembers(data.members);

    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };


  useEffect(() => {
    fetchAttendance();
    fetchMembers();
  }, []);


  // Mark attendance
  const handleMarkAttendance = async (e) => {
    e.preventDefault();

    if (!selectedMember) {
      setError("Please select a member");
      return;
    }

    setError("");
    setSuccess("");
    setMarking(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/attendance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            member_id: selectedMember,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to mark attendance");
      }

      setSuccess("Attendance marked successfully!");

      setSelectedMember("");

      fetchAttendance();

    } catch (error) {
      console.error(error);
      setError(error.message);

    } finally {
      setMarking(false);
    }
  };


  // Today's attendance
  const today = new Date().toISOString().split("T")[0];

  const todayAttendance = attendance.filter(
    (record) => record.attendance_date === today
  );


  return (
    <div className="min-h-screen bg-[#E2DECE] flex">

      {/* SIDEBAR */}

      <DashboardSidebar />


      {/* MAIN */}

      <div className="flex-1 min-w-0">

        <DashboardNavbar />


        <main className="p-6 md:p-10">


          {/* HEADER */}

          <div className="mb-8">

            <p className="text-[#73795D] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
              Management
            </p>

            <h1 className="text-4xl font-black text-[#2E2C26]">
              Attendance
            </h1>

            <p className="text-[#3D4F5A]/50 mt-2 text-sm">
              Track member check-ins and gym attendance.
            </p>

          </div>


          {/* ERROR */}

          {error && (

            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
              {error}
            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div className="mb-6 p-4 rounded-xl bg-[#73795D]/10 border border-[#73795D]/20 text-[#73795D] text-sm">
              {success}
            </div>

          )}


          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">


            {/* TODAY */}

            <div className="bg-[#2E2C26] rounded-2xl p-6">

              <p className="text-[#E2DECE]/45 text-[10px] uppercase tracking-widest font-bold">
                Today's Attendance
              </p>

              <h2 className="text-3xl font-black text-[#E2DECE] mt-4">
                {todayAttendance.length}
              </h2>

              <p className="text-[#E2DECE]/35 text-xs mt-2">
                Members checked in today
              </p>

            </div>


            {/* TOTAL */}

            <div className="bg-[#73795D] rounded-2xl p-6">

              <p className="text-[#E2DECE]/70 text-[10px] uppercase tracking-widest font-bold">
                Total Records
              </p>

              <h2 className="text-3xl font-black text-[#E2DECE] mt-4">
                {attendance.length}
              </h2>

              <p className="text-[#E2DECE]/55 text-xs mt-2">
                All attendance records
              </p>

            </div>


            {/* MEMBERS */}

            <div className="bg-[#3D4F5A] rounded-2xl p-6">

              <p className="text-[#E2DECE]/55 text-[10px] uppercase tracking-widest font-bold">
                Members
              </p>

              <h2 className="text-3xl font-black text-[#E2DECE] mt-4">
                {members.length}
              </h2>

              <p className="text-[#E2DECE]/40 text-xs mt-2">
                Registered members
              </p>

            </div>

          </div>


          {/* MARK ATTENDANCE */}

          <div className="bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl p-6 md:p-7 mb-7">

            <div className="mb-6">

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.2em] font-bold">
                Check In
              </p>

              <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
                Mark Attendance
              </h2>

            </div>


            <form
              onSubmit={handleMarkAttendance}
              className="flex flex-col md:flex-row gap-4"
            >

              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="flex-1 bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D]"
              >

                <option value="">
                  Select a member
                </option>

                {members.map((member) => (

                  <option
                    key={member.id}
                    value={member.id}
                  >
                    {member.name} — {member.email}
                  </option>

                ))}

              </select>


              <button
                type="submit"
                disabled={marking}
                className="bg-[#73795D] text-[#E2DECE] px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#3D4F5A] transition disabled:opacity-60"
              >
                {marking ? "Checking In..." : "Check In"}
              </button>

            </form>

          </div>


          {/* ATTENDANCE TABLE */}

          <div className="bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl overflow-hidden">


            {/* TABLE HEADER */}

            <div className="p-6 md:p-7 border-b border-[#3D4F5A]/10">

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.2em] font-bold">
                Records
              </p>

              <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
                Attendance History
              </h2>

            </div>


            {loading ? (

              <div className="py-20 text-center">

                <div className="w-8 h-8 border-2 border-[#3D4F5A]/20 border-t-[#73795D] rounded-full animate-spin mx-auto" />

                <p className="text-[#3D4F5A]/50 text-sm mt-4">
                  Loading attendance...
                </p>

              </div>

            ) : attendance.length === 0 ? (

              <div className="py-20 text-center">

                <p className="text-[#3D4F5A]/50 text-sm">
                  No attendance records yet.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-[#3D4F5A]/10">

                      <th className="text-left px-6 md:px-7 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                        Member
                      </th>

                      <th className="text-left px-6 md:px-7 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                        Email
                      </th>

                      <th className="text-left px-6 md:px-7 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                        Date
                      </th>

                      <th className="text-left px-6 md:px-7 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                        Check-in Time
                      </th>

                      <th className="text-left px-6 md:px-7 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {attendance.map((record) => (

                      <tr
                        key={record.id}
                        className="border-b border-[#3D4F5A]/10 last:border-b-0 hover:bg-[#3D4F5A]/5 transition"
                      >

                        <td className="px-6 md:px-7 py-5">

                          <p className="text-sm font-bold text-[#2E2C26]">
                            {record.member_name}
                          </p>

                          <p className="text-xs text-[#3D4F5A]/40 mt-1">
                            ID #{record.member_id}
                          </p>

                        </td>


                        <td className="px-6 md:px-7 py-5">

                          <p className="text-sm text-[#2E2C26]">
                            {record.member_email}
                          </p>

                        </td>


                        <td className="px-6 md:px-7 py-5">

                          <p className="text-sm text-[#2E2C26]">
                            {record.attendance_date}
                          </p>

                        </td>


                        <td className="px-6 md:px-7 py-5">

                          <p className="text-sm text-[#2E2C26]">
                            {record.check_in_time}
                          </p>

                        </td>


                        <td className="px-6 md:px-7 py-5">

                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#73795D]/10 text-[#73795D] text-xs font-bold">

                            <span className="w-1.5 h-1.5 rounded-full bg-[#73795D]" />

                            Present

                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>


        </main>

      </div>

    </div>
  );
}

export default AttendancePage;