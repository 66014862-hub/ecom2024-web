import { useState } from 'react';
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react'; // นำเข้าไอคอนจาก lucide-react

const Login = () => {
  const navigate = useNavigate();
  const actionsLogin = useEcomStore((state) => state.actionsLogin);
  const user = useEcomStore((state) => state.user);
  console.log('user form zustand', user);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await actionsLogin(form);
      const role = res?.data?.payload?.role;
      roleRedirect(role);
      toast.success('ยินดีต้อนรับกลับมา!');
    } catch (err) {
      console.error(err);
      const errMsg = err?.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/shop');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        
        {/* หัวข้อฟอร์ม */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <LogIn size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">เข้าสู่ระบบ</h2>
          <p className="text-slate-500 text-sm mt-1">กรอกข้อมูลเพื่อเข้าใช้งานบัญชีของคุณ</p>
        </div>

        {/* ฟอร์ม Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* ช่องกรอก Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">อีเมล</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </span>
              <input
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>

          {/* ช่องกรอก Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">รหัสผ่าน</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </span>
              <input
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>

          {/* ปุ่มกด Login */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 active:scale-[0.98] text-white font-medium py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-cyan-500/20 disabled:opacity-50 mt-2"
          >
            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;