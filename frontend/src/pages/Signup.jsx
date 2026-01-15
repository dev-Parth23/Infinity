import {React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [pic, setPic] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match");
      setShowModal(true);
      setLoading(false);
      return;
    }

    try {
      console.log("entered try cactch");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user`, 
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await res.json();
      console.log("Signup success:", data);

      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Catch Error:", error.message);
      setModalMessage(error.message);
      setShowModal(true);
      setLoading(false);
    }
  };

  return (
    <section className="relative w-screen h-screen bg-[#141414] px-4 py-6 sm:px-10 sm:py-10 lg:p-24 overflow-hidden select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black/80 z-0" />

      <div className="relative w-full h-full rounded-2xl lg:rounded-[32px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)] z-10">
        <img
          src="/Hands.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute -inset-32 bg-white/10 blur-3xl rounded-full" />

          <div className="relative w-[80%] max-w-2xl mx-4 sm:mx-0 bg-white/20 backdrop-blur-sm border border-white/90 rounded-2xl sm:rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="mb-8 sm:mb-10">
              <h3 className="text-[26px] sm:text-[30px] font-semibold text-black tracking-tight">
                Create a new account
              </h3>
              <p className="text-[16px] sm:text-[15px] text-black/60 mt-2">
                Enter your details to continue
              </p>
            </div>

            <form
              className="flex flex-col gap-7 sm:gap-8"
              onSubmit={submitHandler}
            >
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  placeholder=""
                  required
                  className="   peer w-full bg-transparent
                    border-b border-black/30
                    px-1 py-3 text-black text-sm
                    outline-none
                    focus:border-black
                    transition"
                  onChange={(e) => setName(e.target.value)}
                />
                <label
                  className="absolute left-1 top-3 text-black/60 text-sm
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                  peer-valid:-top-2 peer-valid:text-xs transition-all"
                >
                  Name
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  required
                  className="
                  peer w-full bg-transparent
                    border-b border-black/30
                    px-1 py-3 text-black text-sm
                    outline-none
                    focus:border-black
                    transition"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  className="absolute left-1 top-3 text-black/60 text-sm
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                  peer-valid:-top-2 peer-valid:text-xs transition-all"
                >
                  Email
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  required
                  className="peer w-full bg-transparent border-b border-black/30 px-1 py-3 text-black text-sm outline-none focus:border-black transition"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  className="absolute left-1 top-3 text-black/60 text-sm
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                  peer-valid:-top-2 peer-valid:text-xs transition-all"
                >
                  Password
                </label>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type="password"
                  required
                  className="peer w-full bg-transparent border-b border-black/30 px-1 py-3 text-black text-sm outline-none focus:border-black transition"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label
                  className="absolute left-1 top-3 text-black/60 text-sm
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                  peer-valid:-top-2 peer-valid:text-xs transition-all"
                >
                  Confirm Password
                </label>
              </div>

              {/* Profile Pic
              <div className="relative">
                <label
                  htmlFor="profilePic"
                  className="absolute left-1 top-3 text-black/60 text-sm
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                  peer-valid:-top-2 peer-valid:text-xs transition-all"
                >
                  Upload profile picture (optional)
                </label>

                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  hidden
                  onChange={(e) => setPic(e.target.files[0])}
                />
              </div> */}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 bg-black/90 text-white py-3 rounded-2xl text-sm font-medium tracking-wide hover:bg-black transition-all"
              >
                {loading ? "Processing..." : "Continue"}
              </button>
            </form>

            <p className="mt-6 sm:mt-8 text-sm text-black/60 text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-black font-medium hover:underline underline-offset-4"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl text-center">
            <h3 className="text-lg font-semibold text-black mb-2">
              Signup Failed
            </h3>

            <p className="text-sm text-black/70 mb-6">{modalMessage}</p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-black text-white py-2 rounded-xl text-sm hover:bg-black/90 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Signup;