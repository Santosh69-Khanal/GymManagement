function MemberDetailsModal({ member, onClose }) {
  if (!member) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Background */}
      <div
        className="absolute inset-0 bg-[#2E2C26]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#E2DECE] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-7 py-6 bg-[#2E2C26] flex items-center justify-between">

          <div>
            <p className="text-[#73795D] text-[10px] uppercase tracking-[0.25em] font-bold">
              Member Profile
            </p>

            <h2 className="text-2xl font-black text-[#E2DECE] mt-1">
              {member.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-[#E2DECE]/10 text-[#E2DECE] hover:bg-[#73795D] transition"
          >
            ✕
          </button>

        </div>


        {/* Profile */}
        <div className="p-7">

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-7">

            <div className="w-16 h-16 rounded-2xl bg-[#3D4F5A] flex items-center justify-center">

              <span className="text-2xl font-black text-[#E2DECE]">
                {member.name?.charAt(0).toUpperCase()}
              </span>

            </div>

            <div>
              <p className="text-xs text-[#3D4F5A]/45 uppercase tracking-wider font-bold">
                Member ID
              </p>

              <p className="text-lg font-black text-[#2E2C26]">
                #{member.id}
              </p>
            </div>

          </div>


          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Email */}
            <div className="bg-[#3D4F5A]/5 rounded-2xl p-4">

              <p className="text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                Email
              </p>

              <p className="text-sm font-bold text-[#2E2C26] mt-2 break-all">
                {member.email}
              </p>

            </div>


            {/* Phone */}
            <div className="bg-[#3D4F5A]/5 rounded-2xl p-4">

              <p className="text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                Phone
              </p>

              <p className="text-sm font-bold text-[#2E2C26] mt-2">
                {member.phone || "No phone"}
              </p>

            </div>


            {/* Membership */}
            <div className="bg-[#73795D]/10 rounded-2xl p-4">

              <p className="text-[10px] uppercase tracking-widest text-[#73795D]/70 font-bold">
                Membership
              </p>

              <p className="text-sm font-bold text-[#73795D] mt-2">
                {member.membership_type || "None"}
              </p>

            </div>


            {/* Status */}
            <div className="bg-[#3D4F5A]/5 rounded-2xl p-4">

              <p className="text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                Status
              </p>

              <div className="flex items-center gap-2 mt-2">

                <span
                  className={`w-2 h-2 rounded-full ${
                    member.status === "active"
                      ? "bg-[#73795D]"
                      : "bg-[#3D4F5A]"
                  }`}
                />

                <p className="text-sm font-bold text-[#2E2C26] capitalize">
                  {member.status || "inactive"}
                </p>

              </div>

            </div>

          </div>


          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-7 px-5 py-3.5 rounded-xl bg-[#73795D] text-[#E2DECE] font-bold text-sm hover:bg-[#3D4F5A] transition"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default MemberDetailsModal;