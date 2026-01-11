import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Chats from "./components/Chats";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <div className="min-h-screen text-white flex overflow-hidden">
      <Login />
<Signup />
      {/* <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chats />} />
      </Routes> */}

    </div>
  );
}