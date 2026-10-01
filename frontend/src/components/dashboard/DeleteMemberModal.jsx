import { useState } from "react";
import { deleteMember } from "../../services/memberService";

function DeleteMemberModal({ member, onClose, onMemberDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      await deleteMember(member.id);

      onMemberDeleted();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

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
      <div className="relative w-full max-w-md bg-[#E2DECE] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#2E2C26] px-7 py-6">

          <p className="text-[#73795D] text-[10px] uppercase tracking-[0.25em] font-bold">
            Member Management
          </p>

          <h2 className="text-2xl font-black text-[#E2DECE] mt-1">
            Delete Member
          </h2>

        </div>

        {/* Content */}
        <div className="p-7">

          {/* Warning Icon */}
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600 text-2xl mb-5">
            !
          </div>

          <h3 className="text-lg font-black text-[#2E2C26]">
            Delete {member.name}?
          </h3>

          <p className="text-sm text-[#3D4F5A]/55 mt-2 leading-relaxed">
            This will permanently remove this member from NewtonFitness.
            This action cannot be undone.
          </p>

          {/* Error */}
          {error && (
            <div className="mt-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-7">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-5 py-3.5 rounded-xl border border-[#3D4F5A]/15 text-[#3D4F5A] font-bold text-sm hover:bg-[#3D4F5A]/5 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 px-5 py-3.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete Member"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DeleteMemberModal;