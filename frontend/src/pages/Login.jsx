import React, { useState } from "react";

const Login = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
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

            <form className="flex flex-col gap-7 sm:gap-8">
              <div className="relative">
                <input
                  type="text"
                  required
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
                  Name
                </label>
              </div>

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
                onClick={submitHandler}
              >
                Continue
              </button>
            </form>
            <p className="mt-6 sm:mt-8 text-sm text-black/60 text-center">
              Don’t have an account?{" "}
              <button className="text-black font-medium hover:underline underline-offset-4">
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
