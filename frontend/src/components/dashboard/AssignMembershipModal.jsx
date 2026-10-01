import { useEffect, useState } from "react";
import { getMembers } from "../../services/memberService";
import { assignMembership } from "../../services/membershipService";

function AssignMembershipModal({ plan, onClose, onAssigned }) {
  const [members, setMembers] = useState([]);

  const [memberId, setMemberId] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Get members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers();
        setMembers(data.members);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Automatically calculate end date
  useEffect(() => {
    if (!startDate || !plan) return;

    const date = new Date(startDate);

    date.setMonth(date.getMonth() + Number(plan.duration_months));

    const formattedDate = date.toISOString().split("T")[0];

    setEndDate(formattedDate);
  }, [startDate, plan]);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!memberId || !startDate || !endDate) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await assignMembership({
        member_id: Number(memberId),
        plan_id: plan.id,
        start_date: startDate,
        end_date: endDate,
      });

      onAssigned();
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2E2C26]/60 backdrop-blur-sm p-4">

      {/* MODAL */}
      <div className="w-full max-w-lg bg-[#E2DECE] rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="px-6 md:px-7 py-6 border-b border-[#3D4F5A]/10 flex items-start justify-between">

          <div>

            <p className="text-[#73795D] text-[10px] uppercase tracking-[0.25em] font-bold">
              Membership
            </p>

            <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
              Assign Plan
            </h2>

            <p className="text-[#3D4F5A]/45 text-sm mt-1">
              Assign the {plan?.name} plan to a member.
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-[#3D4F5A]/5 text-[#3D4F5A] hover:bg-[#3D4F5A] hover:text-[#E2DECE] transition"
          >
            ×
          </button>

        </div>


        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 md:p-7">

          {/* ERROR */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
              {error}
            </div>
          )}


          {/* PLAN PREVIEW */}
          <div className="mb-6 p-4 rounded-xl bg-[#73795D]/10 border border-[#73795D]/10">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[#3D4F5A]/40 text-[10px] uppercase tracking-widest font-bold">
                  Selected Plan
                </p>

                <p className="text-[#2E2C26] font-black text-lg mt-1">
                  {plan?.name}
                </p>

              </div>

              <div className="text-right">

                <p className="text-[#2E2C26] font-black">
                  Rs. {Number(plan?.price).toLocaleString()}
                </p>

                <p className="text-[#3D4F5A]/40 text-xs">
                  {plan?.duration_months} month
                  {plan?.duration_months > 1 ? "s" : ""}
                </p>

              </div>

            </div>

          </div>


          {/* MEMBER */}
          <div className="mb-5">

            <label className="block text-xs font-bold text-[#2E2C26] mb-2">
              Select Member
            </label>

            {loading ? (

              <div className="w-full px-4 py-3 rounded-xl bg-[#3D4F5A]/5 text-[#3D4F5A]/40 text-sm">
                Loading members...
              </div>

            ) : (

              <select
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 text-[#2E2C26] text-sm outline-none focus:border-[#73795D] transition"
              >

                <option value="">
                  Choose a member
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

            )}

          </div>


          {/* DATES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

            {/* START */}
            <div>

              <label className="block text-xs font-bold text-[#2E2C26] mb-2">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 text-[#2E2C26] text-sm outline-none focus:border-[#73795D] transition"
              />

            </div>


            {/* END */}
            <div>

              <label className="block text-xs font-bold text-[#2E2C26] mb-2">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 text-[#2E2C26] text-sm outline-none focus:border-[#73795D] transition"
              />

              <p className="text-[#3D4F5A]/35 text-[11px] mt-1">
                Automatically calculated from the plan duration.
              </p>

            </div>

          </div>


          {/* BUTTONS */}
          <div className="flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-[#3D4F5A]/15 text-[#3D4F5A] text-sm font-bold hover:bg-[#3D4F5A]/5 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || loading}
              className="flex-1 py-3 rounded-xl bg-[#73795D] text-[#E2DECE] text-sm font-bold hover:bg-[#3D4F5A] transition disabled:opacity-50"
            >
              {saving ? "Assigning..." : "Assign Membership"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AssignMembershipModal;