import { useEffect, useState } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import AddMemberModal from "../components/dashboard/AddMemberModal";
import MemberDetailsModal from "../components/dashboard/MemberDetailsModal";
import EditMemberModal from "../components/dashboard/EditMemberModal";
import DeleteMemberModal from "../components/dashboard/DeleteMemberModal";
import { getMembers } from "../services/memberService";

function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modals
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

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

  // Count active/inactive members
  const activeMembers = members.filter(
    (member) => member.status === "active"
  ).length;

  const inactiveMembers = members.filter(
    (member) => member.status === "inactive"
  ).length;

  // Search/filter members
  const filteredMembers = members.filter((member) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      member.name?.toLowerCase().includes(search) ||
      member.email?.toLowerCase().includes(search) ||
      member.phone?.toLowerCase().includes(search) ||
      member.membership_type?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-[#E2DECE] flex">

      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* MAIN */}
      <div className="flex-1 min-w-0">

        <DashboardNavbar />

        <main className="p-6 md:p-10">

          {/* PAGE HEADER */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">

            <div>
              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
                Management
              </p>

              <h1 className="text-4xl font-black text-[#2E2C26]">
                Members
              </h1>

              <p className="text-[#3D4F5A]/50 mt-2 text-sm">
                Manage your NewtonFitness members.
              </p>
            </div>

            {/* ADD MEMBER */}
            <button
              onClick={() => setShowAddMember(true)}
              className="group flex items-center justify-center gap-3 bg-[#73795D] text-[#E2DECE] px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-[#3D4F5A] transition duration-300"
            >
              <span className="text-lg">+</span>

              <span>Add Member</span>

              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>

          </div>


          {/* ERROR */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
              {error}
            </div>
          )}


          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">

            {/* TOTAL */}
            <div className="bg-[#2E2C26] rounded-2xl p-6">

              <p className="text-[#E2DECE]/45 text-[10px] uppercase tracking-widest font-bold">
                Total Members
              </p>

              <h2 className="text-3xl font-black text-[#E2DECE] mt-4">
                {loading ? "..." : members.length}
              </h2>

              <p className="text-[#E2DECE]/35 text-xs mt-2">
                All registered members
              </p>

            </div>


            {/* ACTIVE */}
            <div className="bg-[#73795D] rounded-2xl p-6">

              <p className="text-[#E2DECE]/70 text-[10px] uppercase tracking-widest font-bold">
                Active
              </p>

              <h2 className="text-3xl font-black text-[#E2DECE] mt-4">
                {loading ? "..." : activeMembers}
              </h2>

              <p className="text-[#E2DECE]/55 text-xs mt-2">
                Currently active
              </p>

            </div>


            {/* INACTIVE */}
            <div className="bg-[#3D4F5A] rounded-2xl p-6">

              <p className="text-[#E2DECE]/55 text-[10px] uppercase tracking-widest font-bold">
                Inactive
              </p>

              <h2 className="text-3xl font-black text-[#E2DECE] mt-4">
                {loading ? "..." : inactiveMembers}
              </h2>

              <p className="text-[#E2DECE]/40 text-xs mt-2">
                Inactive members
              </p>

            </div>

          </div>


          {/* MEMBERS TABLE */}
          <div className="bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl overflow-hidden">

            {/* TABLE HEADER */}
            <div className="p-6 md:p-7 border-b border-[#3D4F5A]/10">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                  <p className="text-[#73795D] text-[10px] uppercase tracking-[0.2em] font-bold">
                    Directory
                  </p>

                  <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
                    All Members
                  </h2>

                </div>


                {/* SEARCH */}
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] placeholder-[#3D4F5A]/40 outline-none focus:border-[#73795D] transition"
                />

              </div>

            </div>


            {/* LOADING */}
            {loading ? (

              <div className="py-20 text-center">

                <div className="w-8 h-8 border-2 border-[#3D4F5A]/20 border-t-[#73795D] rounded-full animate-spin mx-auto" />

                <p className="text-[#3D4F5A]/50 text-sm mt-4">
                  Loading members...
                </p>

              </div>

            ) : filteredMembers.length === 0 ? (

              /* EMPTY / NO SEARCH RESULTS */
              <div className="px-6 py-20 text-center">

                <div className="flex flex-col items-center">

                  <div className="w-14 h-14 rounded-full bg-[#3D4F5A]/5 flex items-center justify-center text-[#73795D] text-2xl">
                    ♙
                  </div>

                  <h3 className="text-[#2E2C26] font-bold mt-5">
                    {searchTerm
                      ? "No matching members"
                      : "No members found"}
                  </h3>

                  <p className="text-[#3D4F5A]/45 text-sm mt-1">
                    {searchTerm
                      ? "Try searching with a different name, email, or phone."
                      : "Add your first member to get started."}
                  </p>

                  {!searchTerm && (
                    <button
                      onClick={() => setShowAddMember(true)}
                      className="mt-5 text-sm font-bold text-[#73795D] hover:text-[#3D4F5A] transition"
                    >
                      + Add your first member
                    </button>
                  )}

                </div>

              </div>

            ) : (

              /* TABLE */
              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-[#3D4F5A]/10">

                      <th className="text-left px-6 md:px-7 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                        Member
                      </th>

                      <th className="text-left px-6 md:px-7 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                        Contact
                      </th>

                      <th className="text-left px-6 md:px-7 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                        Membership
                      </th>

                      <th className="text-left px-6 md:px-7 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                        Status
                      </th>

                      <th className="text-right px-6 md:px-7 py-4 text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredMembers.map((member) => (

                      <tr
                        key={member.id}
                        className="border-b border-[#3D4F5A]/10 last:border-b-0 hover:bg-[#3D4F5A]/5 transition"
                      >

                        {/* MEMBER */}
                        <td className="px-6 md:px-7 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-[#3D4F5A] flex items-center justify-center">

                              <span className="text-[#E2DECE] font-bold">
                                {member.name?.charAt(0).toUpperCase()}
                              </span>

                            </div>

                            <div>

                              <p className="text-sm font-bold text-[#2E2C26]">
                                {member.name}
                              </p>

                              <p className="text-xs text-[#3D4F5A]/40">
                                ID #{member.id}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* CONTACT */}
                        <td className="px-6 md:px-7 py-5">

                          <p className="text-sm text-[#2E2C26]">
                            {member.email}
                          </p>

                          <p className="text-xs text-[#3D4F5A]/40 mt-1">
                            {member.phone || "No phone"}
                          </p>

                        </td>


                        {/* MEMBERSHIP */}
                        <td className="px-6 md:px-7 py-5">

                          <span className="inline-flex px-3 py-1.5 rounded-lg bg-[#73795D]/10 text-[#73795D] text-xs font-bold">
                            {member.membership_type || "None"}
                          </span>

                        </td>


                        {/* STATUS */}
                        <td className="px-6 md:px-7 py-5">

                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${
                              member.status === "active"
                                ? "bg-[#73795D]/10 text-[#73795D]"
                                : "bg-[#3D4F5A]/10 text-[#3D4F5A]"
                            }`}
                          >

                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                member.status === "active"
                                  ? "bg-[#73795D]"
                                  : "bg-[#3D4F5A]"
                              }`}
                            />

                            {member.status || "inactive"}

                          </span>

                        </td>


                        {/* ACTIONS */}
                        <td className="px-6 md:px-7 py-5 text-right">

                          <div className="flex items-center justify-end gap-4">

                            {/* VIEW */}
                            <button
                              onClick={() => setSelectedMember(member)}
                              className="text-xs font-bold text-[#3D4F5A] hover:text-[#73795D] transition"
                            >
                              View →
                            </button>


                            {/* EDIT */}
                            <button
                              onClick={() => setEditingMember(member)}
                              className="text-xs font-bold text-[#73795D] hover:text-[#3D4F5A] transition"
                            >
                              Edit
                            </button>


                            {/* DELETE */}
                            <button
                              onClick={() => setDeletingMember(member)}
                              className="text-xs font-bold text-red-600 hover:text-red-700 transition"
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </main>


        {/* ADD MEMBER MODAL */}
        {showAddMember && (
          <AddMemberModal
            onClose={() => setShowAddMember(false)}
            onMemberAdded={() => {
              setShowAddMember(false);
              window.location.reload();
            }}
          />
        )}


        {/* VIEW MEMBER MODAL */}
        {selectedMember && (
          <MemberDetailsModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}


        {/* EDIT MEMBER MODAL */}
        {editingMember && (
          <EditMemberModal
            member={editingMember}
            onClose={() => setEditingMember(null)}
            onMemberUpdated={() => {
              setEditingMember(null);
              window.location.reload();
            }}
          />
        )}


        {/* DELETE MEMBER MODAL */}
        {deletingMember && (
          <DeleteMemberModal
            member={deletingMember}
            onClose={() => setDeletingMember(null)}
            onMemberDeleted={() => {
              setDeletingMember(null);
              window.location.reload();
            }}
          />
        )}

      </div>

    </div>
  );
}

export default MembersPage;