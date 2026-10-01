import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

function ProfilePage() {
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
              My Profile
            </h1>

            <p className="text-[#3D4F5A]/50 mt-2 text-sm">
              View your administrator profile information.
            </p>

          </div>


          {/* PROFILE CARD */}

          <div className="max-w-3xl bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl overflow-hidden">

            {/* PROFILE TOP */}

            <div className="bg-[#3D4F5A] p-8 md:p-10">

              <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                {/* AVATAR */}

                <div className="w-24 h-24 rounded-full bg-[#73795D] flex items-center justify-center">

                  <span className="text-4xl font-black text-[#E2DECE]">
                    N
                  </span>

                </div>


                {/* NAME */}

                <div>

                  <p className="text-[#E2DECE]/50 text-[10px] uppercase tracking-[0.25em] font-bold mb-2">
                    Administrator
                  </p>

                  <h2 className="text-3xl font-black text-[#E2DECE]">
                    Newton
                  </h2>

                  <p className="text-[#E2DECE]/50 text-sm mt-1">
                    Gym Administrator
                  </p>

                </div>

              </div>

            </div>


            {/* INFORMATION */}

            <div className="p-7 md:p-9">

              <p className="text-[#73795D] text-[10px] uppercase tracking-[0.25em] font-bold mb-5">
                Personal Information
              </p>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* NAME */}

                <div className="bg-[#3D4F5A]/5 rounded-xl p-5">

                  <p className="text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                    Full Name
                  </p>

                  <p className="text-sm font-bold text-[#2E2C26] mt-2">
                    Newton
                  </p>

                </div>


                {/* EMAIL */}

                <div className="bg-[#3D4F5A]/5 rounded-xl p-5">

                  <p className="text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                    Email
                  </p>

                  <p className="text-sm font-bold text-[#2E2C26] mt-2">
                    Administrator
                  </p>

                </div>


                {/* ROLE */}

                <div className="bg-[#3D4F5A]/5 rounded-xl p-5">

                  <p className="text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                    Role
                  </p>

                  <p className="text-sm font-bold text-[#2E2C26] mt-2">
                    Administrator
                  </p>

                </div>


                {/* STATUS */}

                <div className="bg-[#3D4F5A]/5 rounded-xl p-5">

                  <p className="text-[10px] uppercase tracking-widest text-[#3D4F5A]/40 font-bold">
                    Account Status
                  </p>

                  <div className="mt-2">

                    <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      Active
                    </span>

                  </div>

                </div>

              </div>


              {/* ACCOUNT INFORMATION */}

              <div className="mt-8">

                <p className="text-[#73795D] text-[10px] uppercase tracking-[0.25em] font-bold mb-5">
                  Account Information
                </p>

                <div className="bg-[#3D4F5A]/5 rounded-xl p-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm font-bold text-[#2E2C26]">
                        Administrator Access
                      </p>

                      <p className="text-xs text-[#3D4F5A]/45 mt-1">
                        Full access to manage the gym system.
                      </p>

                    </div>

                    <span className="px-3 py-1 rounded-full bg-[#73795D]/10 text-[#73795D] text-xs font-bold">
                      Admin
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default ProfilePage;