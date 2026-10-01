import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardNavbar() {
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  let user = {
    name: "Newton",
    email: "",
    role: "admin",
  };

  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error("USER DATA ERROR:", error);
    }
  }

  const firstLetter = user.name
    ? user.name.charAt(0).toUpperCase()
    : "N";

  const roleName =
    user.role === "admin"
      ? "Administrator"
      : user.role === "trainer"
      ? "Trainer"
      : "Member";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="h-24 bg-[#E2DECE] border-b border-[#2E2C26]/10 px-6 md:px-10 flex items-center justify-between">

      {/* LEFT */}

      <div>
        <p className="text-[#73795D] text-[10px] uppercase tracking-[0.3em] font-bold mb-1">
          NewtonFitness
        </p>

        <h2 className="text-2xl font-black tracking-tight text-[#2E2C26]">
          Dashboard
        </h2>
      </div>


      {/* RIGHT */}

      <div className="flex items-center gap-5">

        {/* DATE */}

        <div className="hidden md:block text-right">

          <p className="text-[10px] uppercase tracking-widest text-[#3D4F5A]/40">
            Today
          </p>

          <p className="text-sm font-semibold text-[#3D4F5A]">
            August 21, 2026
          </p>

        </div>


        {/* DIVIDER */}

        <div className="hidden md:block h-8 w-px bg-[#2E2C26]/10" />


        {/* PROFILE */}

        <div className="relative">

          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-[#3D4F5A]/5 transition"
          >

            {/* INITIAL */}

            <div className="w-11 h-11 rounded-full bg-[#3D4F5A] flex items-center justify-center shadow-sm">

              <span className="text-[#E2DECE] font-black">
                {firstLetter}
              </span>

            </div>


            {/* USER */}

            <div className="hidden sm:block text-left">

              <p className="text-sm font-bold text-[#2E2C26]">
                {user.name}
              </p>

              <p className="text-[10px] uppercase tracking-wider text-[#73795D] font-semibold">
                {roleName}
              </p>

            </div>


            {/* ARROW */}

            <span
              className={`hidden sm:block text-xs text-[#3D4F5A]/50 transition-transform ${
                showProfile ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>

          </button>


          {/* DROPDOWN */}

          {showProfile && (

            <div className="absolute right-0 top-16 w-72 bg-[#E2DECE] border border-[#3D4F5A]/15 rounded-2xl shadow-xl overflow-hidden z-50">

              {/* PROFILE */}

              <div className="p-5 border-b border-[#3D4F5A]/10">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-full bg-[#3D4F5A] flex items-center justify-center">

                    <span className="text-[#E2DECE] font-black text-lg">
                      {firstLetter}
                    </span>

                  </div>

                  <div className="min-w-0">

                    <p className="font-bold text-[#2E2C26] truncate">
                      {user.name}
                    </p>

                    <p className="text-xs text-[#3D4F5A]/50 truncate">
                      {user.email}
                    </p>

                    <p className="text-[10px] uppercase tracking-wider text-[#73795D] font-bold mt-1">
                      {roleName}
                    </p>

                  </div>

                </div>

              </div>


              {/* OPTIONS */}

              <div className="p-2">

                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/profile");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold text-[#2E2C26] hover:bg-[#3D4F5A]/5 transition"
                >

                  <span className="w-8 h-8 rounded-lg bg-[#3D4F5A]/5 flex items-center justify-center">
                    👤
                  </span>

                  My Profile

                </button>


                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/settings");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold text-[#2E2C26] hover:bg-[#3D4F5A]/5 transition"
                >

                  <span className="w-8 h-8 rounded-lg bg-[#3D4F5A]/5 flex items-center justify-center">
                    ⚙
                  </span>

                  Account Settings

                </button>

              </div>


              {/* LOGOUT */}

              <div className="p-2 border-t border-[#3D4F5A]/10">

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold text-red-600 hover:bg-red-500/10 transition"
                >

                  <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    ↪
                  </span>

                  Logout

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default DashboardNavbar;