import { useState, useEffect } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import numeral from 'numeral';
import moment from 'moment';
import 'moment/locale/th';

moment.locale('th'); // ตั้งค่าให้ Moment ใช้ภาษาไทยเป็นค่าเริ่มต้นทั่วทั้งโปรเจกต์

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrders(token);
  }, []);

  const handleGetOrders = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log("Error get orders", err);
      });
  };

  const handleOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        toast.success("อัปเดตสถานะสำเร็จ");
        handleGetOrders(token);
      })
      .catch((err) => {
        console.log("Error update status", err);
        toast.error("อัปเดตสถานะไม่สำเร็จ");
      });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-sm font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Completed
          </span>
        );
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-sm font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            Processing
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-sm font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            Cancelled
          </span>
        );
      case "Not Process":
      case "Pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-sm font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Not Process
          </span>
        );
    }
  };

  return (
    <div className="w-full px-6 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
        <div className="p-6 border-b border-sky-100/60 bg-gradient-to-r from-sky-50/50 to-pink-50/30 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            📦 รายการคำสั่งซื้อทั้งหมด
          </h2>
          <span className="text-sm font-semibold text-slate-600 bg-white px-4 py-1.5 rounded-full border border-sky-100 shadow-sm">
            ทั้งหมด {orders.length} รายการ
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-50/80 text-slate-700 text-sm font-bold uppercase tracking-wider border-b border-sky-100">
                <th className="py-4 px-6 text-center w-16">ลำดับ</th>
                <th className="py-4 px-6">ผู้ใช้งาน</th>
                <th className="py-4 px-6">วันที่</th>
                <th className="py-4 px-6">สินค้า</th>
                <th className="py-4 px-6 text-right">รวม (THB)</th>
                <th className="py-4 px-6 text-center">สถานะ</th>
                <th className="py-4 px-6 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100/60 text-base">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400 font-medium">
                    ไม่มีรายการคำสั่งซื้อในระบบ
                  </td>
                </tr>
              ) : (
                orders.map((item, index) => (
                  <tr key={index} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-5 px-6 text-center font-bold text-slate-600 align-top">
                      {index + 1}
                    </td>
                    <td className="py-5 px-6 align-top">
                      <div className="font-bold text-slate-800">{item.orderedBy?.email}</div>
                    </td>
                    <td className="py-5 px-6 align-top whitespace-nowrap">
                      <div className="text-sm font-semibold text-slate-600">
                        {moment(item.createdAt).format('D MMMM YYYY [เวลา] HH:mm [น.]')}
                      </div>
                    </td>
                    <td className="py-5 px-6 align-top">
                      <div className="space-y-1.5">
                        {item.products?.map((product, i) => (
                          <div key={i} className="text-sm text-slate-700 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                            <span className="font-semibold text-slate-800">{product.product?.title}</span>
                            <span className="text-slate-500 font-medium">({product.count} x {numberFormat(product.price)})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-right font-extrabold text-slate-900 align-top whitespace-nowrap">
                      {numeral(item.cartTotal).format('0,0')}
                    </td>
                    <td className="py-5 px-6 text-center align-top whitespace-nowrap">
                      {getStatusBadge(item.orderStatus)}
                    </td>
                    <td className="py-5 px-6 text-center align-top whitespace-nowrap">
                      <select
                        value={item.orderStatus}
                        onChange={(e) =>
                          handleOrderStatus(token, item.id, e.target.value)
                        }
                        className="bg-white border border-sky-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-sky-300 focus:outline-none shadow-sm font-semibold transition-all cursor-pointer hover:border-sky-300"
                      >
                        <option value="Not Process">Not Process</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
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

export default TableOrders;