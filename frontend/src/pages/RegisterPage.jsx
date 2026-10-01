import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await registerUser(name, email, password);

      // After successful registration
      navigate("/login");

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#2E2C26] flex">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#3D4F5A]">

        {/* Decorative circles */}

        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-[#E2DECE]/10" />

        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full border border-[#E2DECE]/10" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#73795D]/30 blur-3xl" />


        <div className="relative z-10 flex flex-col justify-between p-14 w-full">

          {/* Logo */}

          <div>

            <h1 className="text-3xl font-black tracking-tight text-[#E2DECE]">
              Newton<span className="text-[#73795D]">Fitness</span>
            </h1>

          </div>


          {/* Main text */}

          <div className="max-w-lg">

            <p className="text-[#E2DECE]/60 uppercase tracking-[0.3em] text-xs mb-5">
              NewtonFitness Management System
            </p>

            <h2 className="text-6xl xl:text-7xl font-black leading-[0.95] text-[#E2DECE]">

              START

              <br />

              <span className="text-[#73795D]">
                STRONG.
              </span>

              <br />

              STAY

              <br />

              CONSISTENT.

            </h2>

            <p className="text-[#E2DECE]/60 mt-7 max-w-sm leading-relaxed">
              Create your NewtonFitness account and
              start your fitness journey today.
            </p>

          </div>


          {/* Bottom */}

          <div className="flex items-center gap-3 text-[#E2DECE]/40 text-xs uppercase tracking-widest">

            <span className="w-10 h-px bg-[#73795D]" />

            NewtonFitness

          </div>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="w-full lg:w-1/2 relative overflow-hidden bg-[#2E2C26] flex items-center justify-center px-6 py-12">

        {/* Background decoration */}

        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-[#E2DECE]/5" />

        <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full border border-[#E2DECE]/5" />

        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[#73795D]/10 blur-3xl" />


        {/* Content */}

        <div className="relative z-10 w-full max-w-md">

          {/* Mobile logo */}

          <div className="lg:hidden mb-12">

            <h1 className="text-3xl font-black tracking-tight text-[#E2DECE]">
              Newton<span className="text-[#73795D]">Fitness</span>
            </h1>

          </div>


          {/* Heading */}

          <div className="mb-8">

            <p className="text-[#73795D] uppercase tracking-[0.25em] text-xs font-bold mb-4">
              Member Registration
            </p>

            <h2 className="text-5xl font-black tracking-tight text-[#E2DECE]">

              Create

              <br />

              <span className="text-[#73795D]">
                account.
              </span>

            </h2>

            <p className="text-[#E2DECE]/50 mt-4">
              Join NewtonFitness and start your journey.
            </p>

          </div>


          {/* FORM */}

          <form onSubmit={handleRegister} className="space-y-5">

            {/* NAME */}

            <div>

              <label className="block text-xs uppercase tracking-[0.2em] font-bold text-[#E2DECE]/60 mb-3">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Newton"
                required
                className="w-full bg-[#E2DECE]/5 border border-[#E2DECE]/10 rounded-xl px-5 py-4 text-[#E2DECE] placeholder-[#E2DECE]/25 outline-none focus:border-[#73795D] focus:bg-[#E2DECE]/10 transition duration-300"
              />

            </div>


            {/* EMAIL */}

            <div>

              <label className="block text-xs uppercase tracking-[0.2em] font-bold text-[#E2DECE]/60 mb-3">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="newton@gmail.com"
                required
                className="w-full bg-[#E2DECE]/5 border border-[#E2DECE]/10 rounded-xl px-5 py-4 text-[#E2DECE] placeholder-[#E2DECE]/25 outline-none focus:border-[#73795D] focus:bg-[#E2DECE]/10 transition duration-300"
              />

            </div>


            {/* PASSWORD */}

            <div>

              <label className="block text-xs uppercase tracking-[0.2em] font-bold text-[#E2DECE]/60 mb-3">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#E2DECE]/5 border border-[#E2DECE]/10 rounded-xl px-5 py-4 text-[#E2DECE] placeholder-[#E2DECE]/25 outline-none focus:border-[#73795D] focus:bg-[#E2DECE]/10 transition duration-300"
              />

            </div>


            {/* CONFIRM PASSWORD */}

            <div>

              <label className="block text-xs uppercase tracking-[0.2em] font-bold text-[#E2DECE]/60 mb-3">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#E2DECE]/5 border border-[#E2DECE]/10 rounded-xl px-5 py-4 text-[#E2DECE] placeholder-[#E2DECE]/25 outline-none focus:border-[#73795D] focus:bg-[#E2DECE]/10 transition duration-300"
              />

            </div>


            {/* ERROR */}

            {error && (

              <div className="text-red-400 text-sm border-l-2 border-red-400 pl-3">
                {error}
              </div>

            )}


            {/* REGISTER BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden bg-[#73795D] text-[#E2DECE] py-4 px-6 rounded-xl flex items-center justify-between font-bold tracking-wide transition-all duration-300 hover:bg-[#3D4F5A] hover:shadow-lg hover:shadow-black/20 active:scale-[0.98] disabled:opacity-60"
            >

              <span className="relative z-10">
                {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </span>

              <span className="relative z-10 text-xl group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>

              <span className="absolute inset-0 bg-[#3D4F5A] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

            </button>

          </form>


          {/* LOGIN LINK */}

          <div className="mt-7 text-center">

            <p className="text-sm text-[#E2DECE]/40">

              Already have an account?

              <button
                onClick={() => navigate("/login")}
                className="ml-2 text-[#73795D] font-bold hover:text-[#E2DECE] transition"
              >
                Login
              </button>

            </p>

          </div>


          {/* Footer */}

          <div className="mt-8 pt-6 border-t border-[#E2DECE]/10 flex justify-between text-xs text-[#E2DECE]/30 uppercase tracking-wider">

            <span>
              NewtonFitness
            </span>

            <span>
              © 2026
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;