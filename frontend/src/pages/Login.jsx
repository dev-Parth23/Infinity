import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = ChatState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch( `${import.meta.env.VITE_API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("accessToken", data.accessToken);

      setUser(data);
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-screen h-screen bg-[#141414] px-4 py-6 sm:px-10 sm:py-10 lg:p-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black/80 z-0" />

      <div
        className="
          relative w-full h-full
          rounded-2xl lg:rounded-[32px]
          overflow-hidden
          shadow-[0_40px_120px_rgba(0,0,0,0.6)]
          z-10
        "
      >
        <img
          src="/Hands.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute -inset-32 bg-white/10 blur-3xl rounded-full" />

          <div
            className="
              relative w-[80%]  max-w-2xl
              mx-4 sm:mx-0
              bg-white/20 backdrop-blur-sm
              border border-white/90
              rounded-2xl sm:rounded-[28px]
              p-8 sm:p-10 lg:p-12
              shadow-[0_30px_80px_rgba(0,0,0,0.35)]
            "
          >
            <div className="mb-8 sm:mb-10">
              <h3 className="text-[26px] sm:text-[30px] font-semibold text-black tracking-tight">
                Welcome back!
              </h3>
              <p className="text-[12px] sm:text-[13px] text-black/60 mt-2">
                Enter your details to continue
              </p>
            </div>

            <form
              onSubmit={submitHandler}
              className="flex flex-col gap-7 sm:gap-8"
            >
              <div className="relative">
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    peer w-full bg-transparent
                    border-b border-black/30
                    px-1 py-3 text-black text-sm
                    outline-none
                    focus:border-black
                    transition
                  "
                />
                <label
                  className="absolute left-1 top-3 text-black/60 text-sm
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                  peer-valid:-top-2 peer-valid:text-xs transition-all"
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  inputMode="alphanumeric"
                  minLength={8}
                  maxLength={16}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    peer w-full bg-transparent
                    border-b border-black/30
                    px-1 py-3 text-black text-sm
                    outline-none
                    focus:border-black
                    transition
                  "
                />
                <label
                  className="absolute left-1 top-3 text-black/60 text-sm
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black
                  peer-valid:-top-2 peer-valid:text-xs transition-all"
                >
                  Password
                </label>
              </div>
              <button
                className="
                  mt-6 bg-black/90 text-white py-3 rounded-2xl
                  text-sm font-medium tracking-wide
                  hover:bg-black
                  active:scale-[0.98]
                  transition-all
                  shadow-[0_10px_30px_rgba(0,0,0,0.45)]
                "
                type="submit"
              >
                {loading ? "Processing..." : "Continue"}
              </button>
            </form>
            <p className="mt-6 sm:mt-8 text-sm text-black/60 text-center">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-black font-medium hover:underline underline-offset-4"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;