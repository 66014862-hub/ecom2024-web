import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  UserCog, 
  FolderKanban, 
  Package, 
  ClipboardList, 
  LogOut 
} from "lucide-react";

const SideberAdmin = () => {
  return (
    <div className="bg-sky-50 text-slate-700 flex flex-col h-screen border-r border-sky-100 shadow-sm">
      {/* ส่วนหัว Logo / Admin Panel */}
      <div className="h-20 bg-gradient-to-r from-sky-200 to-pink-200 flex items-center justify-center text-xl font-bold text-slate-800 shadow-sm">
        <span className="tracking-wide flex items-center gap-2">
          Admin Panel 🌸 
        </span>
      </div>

      {/* เมนูหลัก */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        <NavLink
          to={'/admin'}
          end
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 bg-pink-200 text-slate-800 font-semibold px-4 py-3 rounded-2xl shadow-sm transition-all duration-200"
              : "flex items-center gap-3 text-slate-600 px-4 py-3 rounded-2xl hover:bg-sky-100/70 hover:text-slate-950 transition-all duration-200 font-medium"
          }
        >
          <LayoutDashboard className="w-5 h-5 text-sky-600" />
          Dashboard
        </NavLink>

        <NavLink
          to={'manage'}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 bg-pink-200 text-slate-800 font-semibold px-4 py-3 rounded-2xl shadow-sm transition-all duration-200"
              : "flex items-center gap-3 text-slate-600 px-4 py-3 rounded-2xl hover:bg-sky-100/70 hover:text-slate-950 transition-all duration-200 font-medium"
          }
        >
          <UserCog className="w-5 h-5 text-sky-600" />
          Manage
        </NavLink>

        <NavLink
          to={'category'}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 bg-pink-200 text-slate-800 font-semibold px-4 py-3 rounded-2xl shadow-sm transition-all duration-200"
              : "flex items-center gap-3 text-slate-600 px-4 py-3 rounded-2xl hover:bg-sky-100/70 hover:text-slate-950 transition-all duration-200 font-medium"
          }
        >
          <FolderKanban className="w-5 h-5 text-sky-600" />
          Category
        </NavLink>

        <NavLink
          to={'product'}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 bg-pink-200 text-slate-800 font-semibold px-4 py-3 rounded-2xl shadow-sm transition-all duration-200"
              : "flex items-center gap-3 text-slate-600 px-4 py-3 rounded-2xl hover:bg-sky-100/70 hover:text-slate-950 transition-all duration-200 font-medium"
          }
        >
          <Package className="w-5 h-5 text-sky-600" />
          Product
        </NavLink>

        <NavLink
          to={'orders'}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 bg-pink-200 text-slate-800 font-semibold px-4 py-3 rounded-2xl shadow-sm transition-all duration-200"
              : "flex items-center gap-3 text-slate-600 px-4 py-3 rounded-2xl hover:bg-sky-100/70 hover:text-slate-950 transition-all duration-200 font-medium"
          }
        >
          <ClipboardList className="w-5 h-5 text-sky-600" />
          Orders
        </NavLink>
      </nav>

      {/* ปุ่มออกจากระบบ (Logout) ด้านล่าง */}
      <div className="p-4 border-t border-sky-100">
        <NavLink
          onClick={() => {
            // ใส่ฟังก์ชัน Logout ของคุณตรงนี้
          }}
          className="flex items-center gap-3 text-rose-500 px-4 py-3 rounded-2xl hover:bg-rose-100/70 hover:text-rose-600 transition-all duration-200 font-semibold"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SideberAdmin;