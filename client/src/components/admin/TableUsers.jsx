import { useState, useEffect } from "react";
import { getListAllUsers, changeUserStatus, changeUserRole } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Error fetching users:", err);
      });
  };

  const handleOnChangeStatus = (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        toast.success("อัปเดตสถานะสำเร็จ");
        handleGetUsers(token);
      })
      .catch((err) => {
        console.log("Error updating status:", err);
        toast.error("อัปเดตสถานะไม่สำเร็จ");
      });
  };

  const handleOnChangeRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        toast.success("อัปเดตสิทธิ์สำเร็จ");
        handleGetUsers(token);
      })
      .catch((err) => {
        console.log("Error updating role:", err);
        toast.error("อัปเดตสิทธิ์ไม่สำเร็จ");
      });
  };

  return (
    <div className="w-full px-6 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
        <div className="p-6 border-b border-sky-100/60 bg-gradient-to-r from-sky-50/50 to-pink-50/30 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            👥 จัดการผู้ใช้งานระบบ
          </h2>
          <span className="text-sm font-semibold text-slate-600 bg-white px-4 py-1.5 rounded-full border border-sky-100 shadow-sm">
            ทั้งหมด {users.length} บัญชี
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-50/80 text-slate-700 text-sm font-bold uppercase tracking-wider border-b border-sky-100">
                <th className="py-4 px-6 text-center w-16">ลำดับ</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">สิทธิ์</th>
                <th className="py-4 px-6 text-center">สถานะ</th>
                <th className="py-4 px-6 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100/60 text-base">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400 font-medium">
                    ไม่มีข้อมูลผู้ใช้งาน
                  </td>
                </tr>
              ) : (
                users.map((item, index) => (
                  <tr key={item.id} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-5 px-6 text-center font-bold text-slate-600 align-middle">
                      {index + 1}
                    </td>
                    <td className="py-5 px-6 font-bold text-slate-800 align-middle">
                      {item.email}
                    </td>
                    <td className="py-5 px-6 align-middle">
                      <select
                        onChange={(e) => handleOnChangeRole(item.id, e.target.value)}
                        value={item.role}
                        className="bg-white border border-sky-200 text-slate-700 text-sm rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-300 focus:outline-none shadow-sm font-semibold cursor-pointer"
                      >
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                      </select>
                    </td>
                    <td className="py-5 px-6 text-center align-middle">
                      <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold shadow-sm border ${
                        item.enabled 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${item.enabled ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                        {item.enabled ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-center align-middle">
                      <button
                        onClick={() => handleOnChangeStatus(item.id, item.enabled)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-all ${
                          item.enabled
                            ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
                        }`}
                      >
                        {item.enabled ? "Disable" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default TableUsers;