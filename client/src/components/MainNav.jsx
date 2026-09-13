import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { Home, Store, ShoppingCart, UserPlus, LogIn, ChevronDown, History, LogOut } from "lucide-react";
import annImage from "../assets/2dev/ann.jpg";

function MainNav() {
  const navigate = useNavigate();
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      useEcomStore.setState({ user: null, token: null });
      localStorage.removeItem("ecom-storage");
    }
    setIsOpen(false);
    navigate("/login");
  };

  const navLinkStyle = ({ isActive }) =>
    `inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-white text-sky-600 shadow-sm font-semibold border border-sky-100"
        : "text-gray-600 hover:bg-white/60 hover:text-sky-500"
    }`;

  // ตรวจสอบฟิลด์รูปภาพโปรไฟล์จากหลายๆ รูปแบบที่ Backend อาจจะส่งมา
  const userProfileImage = annImage;
  return (
    <nav className="bg-gradient-to-r from-pink-100 via-purple-50 to-sky-100 border-b border-pink-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* ฝั่งซ้าย: โลโก้ และเมนูหลัก */}
          <div className="flex items-center gap-3">
            <Link 
              to={"/"} 
              className="text-2xl font-black bg-gradient-to-r from-pink-400 to-sky-400 bg-clip-text text-transparent mr-2 tracking-wide"
            >
              LOGO
            </Link>

            <NavLink to={"/"} end className={navLinkStyle}>
              <Home className="w-4 h-4 text-pink-400" />
              <span>Home</span>
            </NavLink>

            <NavLink to={"/shop"} className={navLinkStyle}>
              <Store className="w-4 h-4 text-sky-400" />
              <span>Shop</span>
            </NavLink>

            <NavLink 
              to={"/cart"} 
              style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center' }}
              className={({ isActive }) =>
                `relative gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-sky-600 shadow-sm font-semibold border border-sky-100"
                    : "text-gray-600 hover:bg-white/60 hover:text-sky-500"
                }`
              }
            >
              <ShoppingCart className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Cart</span>
              {carts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-pulse">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* ฝั่งขวา: ตรวจสอบสถานะ Login */}
          <div className="flex items-center gap-3 relative">
            {user ? (
              <div>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 bg-white/90 hover:bg-white px-3 py-1.5 rounded-full border border-pink-200 shadow-xs transition-all cursor-pointer"
                >
                  {/* แสดงรูปโปรไฟล์จริง หรือไอคอนการ์ตูนแมวน้อยสำรอง */}
                  <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center overflow-hidden shrink-0">
                    {userProfileImage ? (
                      <img 
                        src={userProfileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <svg viewBox="0 0 36 36" className="w-6 h-6">
                        <path fill="#ffd966" d="M18 4l5 6h-10z"/>
                        <circle cx="18" cy="20" r="10" fill="#fce5cd"/>
                        <path fill="#ffd966" d="M10 12l4 4-5 3zM26 12l-4 4 5 3z"/>
                        <circle cx="14" cy="18" r="1.5" fill="#333"/>
                        <circle cx="22" cy="18" r="1.5" fill="#333"/>
                        <path fill="#e06666" d="M17 21h2v1h-2z"/>
                        <path stroke="#333" strokeWidth="1" fill="none" d="M11 23q3 2 7 0M25 23q-3 2-7 0"/>
                      </svg>
                    )}
                  </div>

                  <span className="text-xs font-semibold text-gray-700 max-w-[120px] truncate">
                    {user.email || user.name || "User"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-pink-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <Link
                      to={"/user/history"}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      <History className="w-4 h-4 text-pink-400" />
                      History
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-rose-500 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to={"/register"} className={navLinkStyle}>
                  <UserPlus className="w-4 h-4 text-pink-400" />
                  <span>Register</span>
                </NavLink>

                <NavLink 
                  to={"/login"} 
                  style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center' }}
                  className={({ isActive }) =>
                    `gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-sky-500 text-white shadow-sm font-semibold"
                        : "bg-white/80 text-sky-600 hover:bg-sky-500 hover:text-white shadow-xs border border-sky-100"
                    }`
                  }
                >
                  <LogIn className="w-4 h-4 shrink-0" />
                  <span>Login</span>
                </NavLink>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default MainNav;