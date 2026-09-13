
import { Trash2, ShoppingCart, CreditCard } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from 'react-router-dom';

const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity);
  const actionRemoveItem = useEcomStore((state) => state.actionRemoveItem);

  const getTotalPrice = () => {
    return carts.reduce((total, item) => total + item.price * (item.count || 1), 0);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-[#EBE5DC] shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6 flex flex-col h-full">
      
      {/* ส่วนหัวข้อตะกร้าสินค้า พร้อมไอคอนพาสเทล */}
      <div>
        <h2 className="text-base font-bold text-stone-800 flex items-center gap-2">
          <span className="p-1.5 bg-[#FAF9F6] border border-[#EBE5DC] rounded-xl text-[#D4A373]">
            <ShoppingCart size={16} />
          </span>
          ตะกร้าสินค้า
        </h2>
      </div>

      <hr className="border-[#EBE5DC]/60" />

      {/* รายการสินค้าในตะกร้า */}
      <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 flex-1">
        {carts.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 bg-[#FAF9F6] border border-[#EBE5DC] rounded-full flex items-center justify-center mx-auto mb-3 text-stone-300">
              <ShoppingCart size={20} />
            </div>
            <p className="text-xs text-stone-400">ไม่มีสินค้าในตะกร้า</p>
          </div>
        ) : (
          carts.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-[#FAF9F6] border border-[#EBE5DC]/60 rounded-2xl p-3 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-14 h-14 bg-white border border-[#EBE5DC] rounded-xl flex items-center justify-center text-center text-[10px] text-stone-400 font-medium overflow-hidden shadow-sm shrink-0">
                    {item.images && item.images.length > 0 ? (
                      <img src={item.images[0].url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      "No Image"
                    )}
                  </div>

                  <div className="flex flex-col">
                    <p className="font-bold text-xs sm:text-sm text-stone-800 line-clamp-1">{item.title}</p>
                    <p className="text-[11px] text-stone-400 line-clamp-1">{item.description}</p>
                    <p className="text-xs font-semibold text-[#D4A373] mt-0.5">{item.price.toLocaleString()} ฿</p>
                  </div>
                </div>

                <button 
                  onClick={() => actionRemoveItem(item.id)}
                  className="text-stone-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                  title="ลบสินค้า"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-[#EBE5DC]/40">
                {/* ปุ่มเพิ่มลดจำนวนสินค้า */}
                <div className="flex items-center border border-[#EBE5DC] rounded-xl bg-white overflow-hidden shadow-sm">
                  <button 
                    onClick={() => actionUpdateQuantity(item.id, -1)}
                    className="px-2.5 py-1 hover:bg-[#FAF9F6] text-stone-600 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs text-stone-700 font-medium py-1 bg-[#FAF9F6]/50">
                    {item.count || 1}
                  </span>
                  <button 
                    onClick={() => actionUpdateQuantity(item.id, 1)}
                    className="px-2.5 py-1 hover:bg-[#FAF9F6] text-stone-600 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="font-bold text-[#D4A373] text-xs sm:text-sm">
                  {(item.price * (item.count || 1)).toLocaleString()} ฿
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <hr className="border-[#EBE5DC]/60" />

      {/* ส่วนสรุปราคารวม */}
      <div className="flex justify-between items-center px-1 font-bold text-sm text-stone-800 pt-1">
        <span>รวมทั้งหมด</span>
        <span className="text-[#D4A373] text-base">{getTotalPrice().toLocaleString()} ฿</span>
      </div>

      {/* ปุ่มไปหน้า Checkout เปลี่ยนเป็นโทนสีชาไทยละมุนตา */}
      <Link to='/checkout' className="block w-full">
        <button className="w-full bg-[#D4A373] hover:bg-[#BC6C25] text-white font-bold py-3 rounded-2xl shadow-[0_8px_20px_rgba(212,163,115,0.3)] transition-all cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2">
          <CreditCard size={16} />
          ดำเนินการชำระเงิน
        </button>
      </Link>
    </div>
  );
};

export default CartCard;