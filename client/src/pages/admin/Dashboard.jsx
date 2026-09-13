import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  Calendar,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import axios from "axios";

const Dashboard = () => {
  const token = useEcomStore((state) => state.token);

  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalUsers: 4,
    totalProducts: 16,
    totalOrders: 0,
    avgOrderValue: 0,
    notProcessPercent: 100,
    completedPercent: 0,
  });

  useEffect(() => {
    const fetchAdminOrders = async () => {
      try {
        const res = await axios.get(
          "http://ecom2024-api.vercel.app/api/admin/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (res.data && Array.isArray(res.data)) {
          const fetchedOrders = res.data;
          setOrders(fetchedOrders);

          const totalSales = fetchedOrders.reduce(
            (sum, ord) => sum + Number(ord.cartTotal || 0),
            0,
          );
          const totalOrders = fetchedOrders.length;
          const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

          const completedCount = fetchedOrders.filter(
            (ord) =>
              ord.orderStatus === "Completed" || ord.orderStatus === "สำเร็จ",
          ).length;
          const completedPercent =
            totalOrders > 0
              ? Math.round((completedCount / totalOrders) * 100)
              : 0;
          const notProcessPercent = 100 - completedPercent;

          setStats({
            totalSales,
            totalUsers: 4,
            totalProducts: 16,
            totalOrders,
            avgOrderValue,
            notProcessPercent,
            completedPercent,
          });
        }
      } catch (error) {
        console.log("Error fetching admin orders:", error);
      }
    };

    if (token) {
      fetchAdminOrders();
      const interval = setInterval(fetchAdminOrders, 3000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const chartData = [
    { name: "10 ก.ย.", sales: 12000 },
    { name: "11 ก.ย.", sales: 15500 },
    { name: "12 ก.ย.", sales: 22000 },
    { name: "13 ก.ย.", sales: stats.totalSales > 0 ? stats.totalSales : 1590 },
  ];

  const numberFormat = (num) => Number(num || 0).toLocaleString("th-TH");

  const dateFormat = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6 p-6 sm:p-8 bg-gradient-to-br from-[#FAF8F5] via-[#FFFDF9] to-[#F4EFEB] min-h-screen">
      {/* หัวข้อหน้า */}
      <div className="bg-white/85 backdrop-blur-xl p-6 rounded-[2rem] border border-[#EBE5DC] shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#F9F5F0] text-[#D4A373] rounded-xl shadow-sm">
              <Sparkles size={18} />
            </span>
            <h1 className="text-lg font-bold text-stone-800">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-xs text-stone-400 pl-9">
            ภาพรวมและสถิติคำสั่งซื้อสินค้าภายในร้านของคุณ
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#F9F5F0] border border-[#EBE5DC] rounded-2xl text-xs font-semibold text-stone-600">
          <Calendar size={14} className="text-[#D4A373]" />
          <span>
            {new Date().toLocaleDateString("th-TH", { dateStyle: "medium" })}
          </span>
        </div>
      </div>

      {/* แถบสถิติย่อย 4 การ์ด (พาสเทลละมุน) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/85 backdrop-blur-xl p-5 rounded-[2rem] border border-[#EBE5DC] shadow-[0_8px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3.5 bg-sky-50 text-sky-500 rounded-2xl shadow-inner">
            <Users size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-stone-400">Total Users</p>
            <h3 className="text-xl font-extrabold text-stone-800 mt-0.5">
              {stats.totalUsers}
            </h3>
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-xl p-5 rounded-[2rem] border border-[#EBE5DC] shadow-[0_8px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl shadow-inner">
            <Package size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-stone-400">Total Products</p>
            <h3 className="text-xl font-extrabold text-stone-800 mt-0.5">
              {stats.totalProducts}
            </h3>
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-xl p-5 rounded-[2rem] border border-[#EBE5DC] shadow-[0_8px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl shadow-inner">
            <ShoppingCart size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-stone-400">Total Orders</p>
            <h3 className="text-xl font-extrabold text-stone-800 mt-0.5">
              {stats.totalOrders}
            </h3>
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-xl p-5 rounded-[2rem] border border-[#EBE5DC] shadow-[0_8px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3.5 bg-rose-50 text-rose-500 rounded-2xl shadow-inner">
            <DollarSign size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-stone-400">
              Avg Order Value
            </p>
            <h3 className="text-lg font-extrabold text-stone-800 mt-0.5">
              ฿{numberFormat(stats.avgOrderValue)}
            </h3>
          </div>
        </div>
      </div>

      {/* ส่วนกราฟยอดขายและสถานะ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* กราฟยอดขายรวม */}
        <div className="lg:col-span-2 bg-white/85 backdrop-blur-xl p-6 rounded-[2rem] border border-[#EBE5DC] shadow-[0_10px_30px_rgba(0,0,0,0.02)] space-y-4">
          <div>
            <p className="text-xs font-medium text-stone-400">
              ยอดขายการค้าทั้งหมด
            </p>
            <h2 className="text-2xl font-extrabold text-stone-800 mt-0.5">
              ฿{numberFormat(stats.totalSales)}
            </h2>
          </div>

          <div className="h-52 w-full bg-[#FAF9F6] border border-[#EBE5DC]/60 rounded-[1.5rem] p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#EBE5DC"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#A8A29E"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#A8A29E"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #EBE5DC",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#D4A373"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#D4A373" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* สถานะคำสั่งซื้อ */}
        <div className="bg-white/85 backdrop-blur-xl p-6 rounded-[2rem] border border-[#EBE5DC] shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            สถานะคำสั่งซื้อ
          </h3>

          <div className="flex items-center justify-center my-2">
            <div className="w-32 h-32 rounded-full border-8 border-emerald-400 border-t-amber-300 flex items-center justify-center shadow-inner bg-[#FAF9F6]">
              <span className="text-xs font-bold text-stone-600">
                Orders Ratio
              </span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-stone-600 bg-[#FAF9F6] px-3 py-2 rounded-xl">
              <span className="flex items-center gap-2 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>{" "}
                Not Process
              </span>
              <span className="font-bold">{stats.notProcessPercent}%</span>
            </div>
            <div className="flex justify-between items-center text-stone-600 bg-[#FAF9F6] px-3 py-2 rounded-xl">
              <span className="flex items-center gap-2 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>{" "}
                Completed
              </span>
              <span className="font-bold">{stats.completedPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ตาราง Recent Orders */}
      <div className="bg-white/85 backdrop-blur-xl p-6 sm:p-7 rounded-[2rem] border border-[#EBE5DC] shadow-[0_10px_30px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Recent Orders
          </h3>
          <span className="text-xs text-stone-400 font-medium">
            รายการล่าสุดทั้งหมด {orders.length} รายการ
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-[#EBE5DC] text-stone-500 text-xs font-bold">
                <th className="p-3.5 rounded-l-2xl">Order ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-2xl text-right">Total</th>
              </tr>
            </thead>
            <tbody className="text-xs text-stone-700 divide-y divide-[#FAF9F6]">
              {orders.length > 0 ? (
                orders.map((ord, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#FAF9F6]/60 transition-all"
                  >
                    <td className="p-3.5 font-medium text-stone-400">
                      #{ord.id}
                    </td>
                    <td className="p-3.5 font-bold text-stone-800">
                      {ord.orderedBy?.email || "User"}
                    </td>
                    <td className="p-3.5 text-stone-500 flex items-center gap-1.5 pt-4">
                      <Clock size={12} className="text-[#D4A373]" />
                      <span>{dateFormat(ord.createdAt)}</span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-3 py-1 rounded-xl font-semibold inline-block ${
                          ord.orderStatus === "Completed"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}
                      >
                        {ord.orderStatus || "Not Process"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-extrabold text-[#BC6C25]">
                      ฿{numberFormat(ord.cartTotal)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-8 text-center text-stone-400" colSpan="5">
                    ยังไม่มีข้อมูลคำสั่งซื้อในระบบ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
