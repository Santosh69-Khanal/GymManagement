import { useState } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

function SettingsPage() {
  const [name, setName] = useState("Newton");
  const [email, setEmail] = useState("admin@newtonfitness.com");

  const [success, setSuccess] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    setSuccess("Account settings saved successfully.");

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#E2DECE] flex">

      <DashboardSidebar />

      <div className="flex-1 min-w-0">

        <DashboardNavbar />

        <main className="p-6 md:p-10">

          {/* HEADER */}

          <div className="mb-8">

            <p className="text-[#73795D] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
              Account
            </p>

            <h1 className="text-4xl font-black text-[#2E2C26]">
              Account Settings
            </h1>

            <p className="text-[#3D4F5A]/50 mt-2 text-sm">
              Manage your account information and preferences.
            </p>

          </div>


          {/* SUCCESS MESSAGE */}

          {success && (
            <div className="max-w-3xl mb-6 p-4 rounded-xl bg-[#73795D]/10 border border-[#73795D]/20 text-[#73795D] text-sm font-bold">
              {success}
            </div>
          )}


          {/* PROFILE SETTINGS */}

          <div className="max-w-3xl bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl overflow-hidden">

            <div className="p-7 md:p-9 border-b border-[#3D4F5A]/10">

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.25em] font-bold">
                Profile
              </p>

              <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
                Personal Information
              </h2>

            </div>


            <form
              onSubmit={handleSave}
              className="p-7 md:p-9 space-y-6"
            >

              {/* NAME */}

              <div>

                <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D]"
                />

              </div>


              {/* EMAIL */}

              <div>

                <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#2E2C26] outline-none focus:border-[#73795D]"
                />

              </div>


              {/* ROLE */}

              <div>

                <label className="block text-xs font-bold text-[#3D4F5A] mb-2">
                  Account Role
                </label>

                <input
                  type="text"
                  value="Administrator"
                  disabled
                  className="w-full bg-[#3D4F5A]/5 border border-[#3D4F5A]/10 rounded-xl px-4 py-3 text-sm text-[#3D4F5A]/50 cursor-not-allowed"
                />

              </div>


              {/* SAVE */}

              <div className="pt-2 flex justify-end">

                <button
                  type="submit"
                  className="bg-[#2E2C26] text-[#E2DECE] px-7 py-3 rounded-xl text-sm font-bold hover:bg-[#73795D] transition"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>


          {/* SECURITY */}

          <div className="max-w-3xl mt-6 bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl overflow-hidden">

            <div className="p-7 md:p-9">

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.25em] font-bold">
                Security
              </p>

              <h2 className="text-2xl font-black text-[#2E2C26] mt-1">
                Account Security
              </h2>

              <p className="text-sm text-[#3D4F5A]/50 mt-2">
                Manage your account security settings.
              </p>


              <div className="mt-6 flex items-center justify-between p-5 rounded-xl bg-[#3D4F5A]/5">

                <div>

                  <p className="text-sm font-bold text-[#2E2C26]">
                    Password
                  </p>

                  <p className="text-xs text-[#3D4F5A]/45 mt-1">
                    Change your administrator password.
                  </p>

                </div>

                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-xs font-bold text-[#3D4F5A] border border-[#3D4F5A]/15 hover:bg-[#3D4F5A]/10 transition"
                >
                  Change Password
                </button>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default SettingsPage;