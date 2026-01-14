import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";

const Home = () => {
  const { user } = ChatState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="h-screen w-screen bg-[#080808] text-white flex flex-col">
      <div className="h-full w-full flex flex-col gap-10 justify-center items-center">
        <h3 className="text-9xl">💬</h3>
        <h3 className="text-5xl">
          Welcome to ChitChat{user?.name ? `, ${user.name}` : ""}
        </h3>
      </div>

      <div className="mb-20 flex justify-center">
        <h5 className="text-sm text-gray-600 pt-6">
          🔒 Your personal messaging platform
        </h5>
      </div>
    </div>
  );
};

export default Home;
