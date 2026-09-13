import { Calendar, Package, Clock, CheckCircle2, XCircle } from 'lucide-react';

const HistoryCard = ({ item }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
      case "Success":
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-sm font-bold shadow-sm">
            <CheckCircle2 size={16} />
            Completed
          </span>
        );
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-sm font-bold shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse"></span>
            Processing
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-full text-sm font-bold shadow-sm">
            <XCircle size={16} />
            Cancelled
          </span>
        );
      case "Pending":
      case "Not Process":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200/80 rounded-full text-sm font-bold shadow-sm">
            <Clock size={16} />
            Not Process
          </span>
        );
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md border border-amber-200/70 rounded-3xl shadow-[0_10px_30px_rgba(217,119,6,0.04)] hover:shadow-[0_15px_35px_rgba(217,119,6,0.08)] transition-all duration-200 overflow-hidden mb-6">
      
      {/* ส่วนหัว: วันที่คำสั่งซื้อ และ สถานะ (ตัวหนังสือใหญ่ขึ้น) */}
      <div className="bg-gradient-to-r from-amber-50/60 via-orange-50/30 to-amber-50/60 px-6 py-5 border-b border-amber-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-white border border-amber-200/80 rounded-2xl text-amber-600 shadow-sm">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Order Date</p>
            <p className="text-sm sm:text-base font-bold text-stone-800">
              {item.createdAt ? new Date(item.createdAt).toLocaleString('th-TH', {
                dateStyle: 'medium',
                timeStyle: 'short'
              }) : item.createdAt}
            </p>
          </div>
        </div>
        <div>
          {getStatusBadge(item.orderStatus || item.status)}
        </div>
      </div>

      {/* ตารางแสดงรายการสินค้า (ขยายขนาดตัวหนังสือให้อ่านง่าย) */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-amber-50/40 text-stone-500 text-xs font-bold uppercase tracking-wider">
              <th className="py-3.5 px-4 rounded-l-2xl">สินค้า</th>
              <th className="py-3.5 px-4 text-center">ราคา</th>
              <th className="py-3.5 px-4 text-center">จำนวน</th>
              <th className="py-3.5 px-4 text-right rounded-r-2xl">รวม</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100/50 text-sm">
            {item.products && item.products.map((product, idx) => {
              const title = product.product?.title || product.title || product.name || "สินค้าไม่มีชื่อ";
              const price = Number(product.price || 0);
              const count = Number(product.count || product.quantity || 1);
              
              const images = product.images || product.product?.images;
              const imageUrl = images && images.length > 0 ? images[0].url : null;

              return (
                <tr key={idx} className="hover:bg-amber-50/20 transition-colors">
                  <td className="py-4 px-4 font-bold text-stone-800 flex items-center gap-3.5">
                    <div className="w-14 h-14 bg-white border border-amber-200/60 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center text-amber-500 shadow-sm">
                      {imageUrl ? (
                        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                      ) : (
                        <Package size={22} />
                      )}
                    </div>
                    <span className="line-clamp-1 text-base">{title}</span>
                  </td>
                  <td className="py-4 px-4 text-stone-600 text-center font-semibold text-base">
                    ฿{price.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-stone-600 text-center font-semibold text-base">
                    {count}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-amber-700 text-right text-base">
                    ฿{(price * count).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ส่วนท้าย: ราคาสุทธิ (ตัวหนังสือใหญ่ ชัดเจน) */}
      <div className="px-6 pb-6 pt-2 flex justify-end items-center">
        <div className="text-right bg-gradient-to-r from-amber-50/80 to-orange-50/80 px-6 py-4 rounded-2xl border border-amber-200/80 shadow-sm flex items-center gap-5">
          <span className="text-sm font-bold text-stone-600 uppercase tracking-wider">ราคาสุทธิ</span>
          <div>
            <span className="text-xl sm:text-2xl font-black text-amber-700">
              ฿{(item.cartTotal || item.amount || item.total || 0).toLocaleString()}
            </span>
            <span className="text-xs text-stone-500 ml-2 font-bold">THB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;