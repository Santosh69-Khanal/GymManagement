import { NavLink, useNavigate } from "react-router-dom";

function DashboardSidebar() {
  const navigate = useNavigate();

  const mainLinks = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: "⌂",
    },
    {
      name: "Members",
      path: "/members",
      icon: "♙",
    },
    {
      name: "Trainers",
      path: "/trainers",
      icon: "♟",
    },
  ];

  const managementLinks = [
    {
      name: "Memberships",
      path: "/memberships",
      icon: "◇",
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: "◷",
    },
    {
      name: "Payments",
      path: "/payments",
      icon: "↗",
    },
  ];

  const renderLinks = (links) =>
    links.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        className={({ isActive }) =>
          `group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
            isActive
              ? "bg-[#73795D] text-[#E2DECE]"
              : "text-[#E2DECE]/50 hover:bg-[#3D4F5A] hover:text-[#E2DECE]"
          }`
        }
      >
        {({ isActive }) => (
          <>
            {/* Active indicator */}

            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#E2DECE] rounded-r-full" />
            )}


            {/* Icon */}

            <span
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-lg transition ${
                isActive
                  ? "bg-[#E2DECE]/10"
                  : "bg-[#E2DECE]/5 group-hover:bg-[#E2DECE]/10"
              }`}
            >
              {link.icon}
            </span>


            {/* Name */}

            <span className="text-sm font-medium">
              {link.name}
            </span>


            {/* Arrow */}

            <span
              className={`ml-auto text-sm transition-all duration-300 ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
              }`}
            >
              →
            </span>

          </>
        )}
      </NavLink>
    ));


  // Logout

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };


  return (
    <aside className="hidden lg:flex w-[270px] min-h-screen bg-[#2E2C26] flex-col border-r border-[#E2DECE]/10">


      {/* BRAND */}

      <div className="px-7 pt-8 pb-7">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[#73795D] flex items-center justify-center">

            <span className="text-[#E2DECE] font-black text-lg">
              N
            </span>

          </div>


          <div>

            <h1 className="text-xl font-black tracking-tight text-[#E2DECE]">
              Newton<span className="text-[#73795D]">Fitness</span>
            </h1>

            <p className="text-[#E2DECE]/30 text-[9px] uppercase tracking-[0.2em] mt-0.5">
              Admin Panel
            </p>

          </div>

        </div>

      </div>


      {/* DIVIDER */}

      <div className="mx-6 h-px bg-[#E2DECE]/10" />


      {/* NAVIGATION */}

      <nav className="flex-1 px-5 py-7 overflow-y-auto">


        {/* MAIN */}

        <div className="mb-8">

          <p className="px-4 mb-3 text-[#E2DECE]/25 text-[9px] uppercase tracking-[0.25em] font-bold">
            Main
          </p>

          <div className="space-y-1">

            {renderLinks(mainLinks)}

          </div>

        </div>


        {/* MANAGEMENT */}

        <div>

          <p className="px-4 mb-3 text-[#E2DECE]/25 text-[9px] uppercase tracking-[0.25em] font-bold">
            Management
          </p>

          <div className="space-y-1">

            {renderLinks(managementLinks)}

          </div>

        </div>

      </nav>


      {/* USER AREA */}

      <div className="px-5 pb-5">

        <div className="p-4 rounded-2xl bg-[#3D4F5A]/40 border border-[#E2DECE]/5">


          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-[#E2DECE] flex items-center justify-center">

              <span className="text-[#2E2C26] font-black">
                N
              </span>

            </div>


            <div className="min-w-0">

              <p className="text-[#E2DECE] text-sm font-bold truncate">
                Newton
              </p>

              <p className="text-[#E2DECE]/40 text-xs truncate">
                Administrator
              </p>

            </div>

          </div>


          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[#E2DECE]/40 hover:bg-[#2E2C26] hover:text-[#E2DECE] transition duration-200 text-xs"
          >

            <span>
              Logout
            </span>

            <span>
              ↪
            </span>

          </button>


        </div>

      </div>


    </aside>
  );
}

export default DashboardSidebar;