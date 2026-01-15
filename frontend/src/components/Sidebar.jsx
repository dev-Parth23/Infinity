import { NavLink } from "react-router-dom";
import {
  MessageSquare,
  Users,
  Phone,
  Video,
  Calendar,
  User,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside
      className="
        w-20 h-screen z-20 flex flex-col items-center py-6 justify-between
        bg-[#000000] backdrop-blur-xl
        border-r border-white/10
      
      "
    >
      {/* TOP */}
      <div className="flex flex-col items-center gap-7">
        {/* Logo */}
        <div className="relative mb-2">
          <div className="absolute inset-0 blur-xl rounded-full" />
          <div className="relative text-xl font-bold text-white tracking-wide">
            △
          </div>
        </div>

        <NavItem to="/" icon={MessageSquare} label="Chats" />
        <NavItem to="/" icon={Users} label="Groups" />
        {/* <NavItem to="/" icon={Phone} label="Calls" />
        <NavItem to="/" icon={Video} label="Meetings" />
        <NavItem to="/" icon={Calendar} label="Calendar" /> */}
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col items-center gap-6">
        <NavItem to="/" icon={User} label="Profile" />
        <NavItem to="/" icon={Settings} label="Settings" />
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `relative group flex flex-col items-center gap-1 transition-all
         ${isActive ? "text-white" : "text-gray-400"}`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator */}
          {isActive && (
            <span
              className="
                absolute -left-6 top-1/2 -translate-y-1/2
                h-8 w-1 rounded-full"
            />
          )}

          {/* Icon */}
          <div
            className={`
              p-3 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "bg-white/10 "
                  : "hover:bg-white/5"
              }
              group-hover:scale-110
            `}
          >
            <Icon size={20} />
          </div>

          {/* Label */}
          <span
            className="
              text-[11px]
              text-gray-400
              group-hover:text-gray-200
              transition
            "
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default Sidebar;
