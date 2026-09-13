import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserPlus, Mail, Lock, ShieldCheck } from 'lucide-react';

// 1. กำหนดกฎเกณฑ์และข้อความแจ้งเตือน (Error Message) ตามในภาพ
const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email!!!" }),
  password: z.string().min(8, { message: "Password ต้องมากกว่า 8 ตัวอักษร" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password มันบ่ตรงกันเด้อ",
  path: ["confirmPassword"],
});

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password", "");
  const passwordScore = zxcvbn(passwordValue).score;

  const getPasswordStrengthText = (score) => {
    switch (score) {
      case 0:
      case 1: return { text: "อ่อนแอมาก", color: "bg-red-500", width: "w-1/4" };
      case 2: return { text: "ปานกลาง", color: "bg-yellow-500", width: "w-2/4" };
      case 3: return { text: "ดี", color: "bg-blue-500", width: "w-3/4" };
      case 4: return { text: "แข็งแกร่งมาก", color: "bg-emerald-500", width: "w-full" };
      default: return { text: "", color: "bg-slate-200", width: "w-0" };
    }
  };

  const strengthInfo = getPasswordStrengthText(passwordScore);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5001/api/register', {
        email: data.email,
        password: data.password
      });
      toast.success(res.data || "สมัครสมาชิกสำเร็จ!");
    } catch (err) {
      const errMsg = err?.response?.data?.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก";
      toast.error(errMsg);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <UserPlus size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Register</h2>
          <p className="text-slate-500 text-sm mt-1">กรอกข้อมูลเพื่อสมัครสมาชิกใหม่</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* ช่องกรอก Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">อีเมล</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </span>
              <input 
                {...register("email")}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                  errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                }`}
                type="text" 
                placeholder="name@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* ช่องกรอก Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">รหัสผ่าน</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </span>
              <input 
                {...register("password")}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                  errors.password ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                }`}
                type="password" 
                placeholder="••••••••"
              />
            </div>
            
            {passwordValue && (
              <div className="mt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-500">ความปลอดภัย:</span>
                  <span className="font-semibold text-slate-700">{strengthInfo.text}</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${strengthInfo.color} ${strengthInfo.width}`}></div>
                </div>
              </div>
            )}

            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* ช่องกรอก Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ยืนยันรหัสผ่าน</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <ShieldCheck size={18} />
              </span>
              <input 
                {...register("confirmPassword")}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                }`}
                type="password" 
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-cyan-500 hover:bg-cyan-600 active:scale-[0.98] text-white font-medium py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-cyan-500/20 disabled:opacity-50 mt-2"
          >
            {isSubmitting ? "Loading..." : "Register"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;