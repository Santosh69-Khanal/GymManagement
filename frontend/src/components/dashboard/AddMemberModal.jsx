import { useState } from "react";
import { addMember } from "../../services/memberService";

function AddMemberModal({ onClose, onMemberAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membership_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await addMember(formData);

      // Tell MembersPage that a member was added
      onMemberAdded();

    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="px-7 py-6 border-b border-[#3D4F5A]/10 flex items-center justify-between">

          <div>
            <p className="text-[#73795D] text-[10px] uppercase tracking-[0.25em] font-bold">
              New Member
            </p>

            <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
              Add Member
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-[#3D4F5A]/5 text-[#3D4F5A] hover:bg-[#3D4F5A] hover:text-[#E2DECE] transition"
          >
            ✕
          </button>

        </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="p-7 space-y-5">

          {/* Error */}
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
              {error}
            </div>
          )}


          {/* Name */}
          <div>

            <label className="block text-xs font-bold uppercase tracking-wider text-[#3D4F5A]/60 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter member name"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-[#E2DECE] border border-[#3D4F5A]/15 text-[#2E2C26] placeholder-[#3D4F5A]/35 outline-none focus:border-[#73795D] focus:ring-2 focus:ring-[#73795D]/10 transition"
            />

          </div>


          {/* Email */}
          <div>

            <label className="block text-xs font-bold uppercase tracking-wider text-[#3D4F5A]/60 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="member@example.com"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-[#E2DECE] border border-[#3D4F5A]/15 text-[#2E2C26] placeholder-[#3D4F5A]/35 outline-none focus:border-[#73795D] focus:ring-2 focus:ring-[#73795D]/10 transition"
            />

          </div>


          {/* Phone */}
          <div>

            <label className="block text-xs font-bold uppercase tracking-wider text-[#3D4F5A]/60 mb-2">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
              className="w-full px-4 py-3.5 rounded-xl bg-[#E2DECE] border border-[#3D4F5A]/15 text-[#2E2C26] placeholder-[#3D4F5A]/35 outline-none focus:border-[#73795D] focus:ring-2 focus:ring-[#73795D]/10 transition"
            />

          </div>


          {/* Membership */}
          <div>

            <label className="block text-xs font-bold uppercase tracking-wider text-[#3D4F5A]/60 mb-2">
              Membership Type
            </label>

            <select
              name="membership_type"
              value={formData.membership_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-xl bg-[#E2DECE] border border-[#3D4F5A]/15 text-[#2E2C26] outline-none focus:border-[#73795D] focus:ring-2 focus:ring-[#73795D]/10 transition"
            >

              <option value="">
                Select membership
              </option>

              <option value="Basic">
                Basic
              </option>

              <option value="Standard">
                Standard
              </option>

              <option value="Premium">
                Premium
              </option>

            </select>

          </div>


          {/* Buttons */}
          <div className="flex gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-5 py-3.5 rounded-xl border border-[#3D4F5A]/15 text-[#3D4F5A] font-bold text-sm hover:bg-[#3D4F5A]/5 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-5 py-3.5 rounded-xl bg-[#73795D] text-[#E2DECE] font-bold text-sm hover:bg-[#3D4F5A] transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Member"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddMemberModal;