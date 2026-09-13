import { useState } from "react";
import { saveAddress, createUserCart } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ShoppingBag,
  Save,
  CreditCard,
  CheckCircle2,
  Edit3,
  Truck,
  Tag,
} from "lucide-react";

const numberFormat = (num) => {
  return Number(num || 0).toLocaleString("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

const SummaryCard = () => {
  const token =
    useEcomStore((state) => state.token) || localStorage.getItem("token");
  const carts = useEcomStore((state) => state.carts) || [];

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  const cartTotal = carts.reduce((sum, item) => {
    const price = Number(item.price || item.product?.price || 0);
    const count = Number(item.count || 1);
    return sum + price * count;
  }, 0);

  const hdlSaveAddress = () => {
    if (!address.trim()) {
      return toast.warning("กรุณากรอกที่อยู่ก่อนครับ");
    }
    saveAddress(token, { address })
      .then((res) => {
        toast.success(res.data?.message || "บันทึกที่อยู่เรียบร้อย");
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("บันทึกที่อยู่ไม่สำเร็จ");
      });
  };

  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกและบันทึกที่อยู่ก่อนครับ");
    }
    if (carts.length === 0) {
      return toast.error("ไม่มีสินค้าในตะกร้า");
    }

    createUserCart(token, { cart: carts })
      .then((res) => {
        console.log("Check stock & save cart success:", res);
        toast.success("บันทึกตะกร้าเรียบร้อย");
        navigate("/user/payment");
      })
      .catch((err) => {
        console.log("Check stock error response:", err.response);
        const errorMsg =
          err.response?.data?.message || "สินค้าในสต็อกไม่พอหรือหมดแล้ว";

        toast.warning(errorMsg, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="max-w-5xl mx-auto my-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* ฝั่งซ้าย: ที่อยู่จัดส่ง */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-[#EBE5DC] shadow-[0_10px_30px_rgba(0,0,0,0.03)] h-fit space-y-4">
          <h2 className="text-sm font-bold text-stone-800 flex items-center gap-2 pb-3 border-b border-[#EBE5DC]/60">
            <span className="p-2 bg-[#FAF9F6] border border-[#EBE5DC] rounded-xl text-[#D4A373]">
              <MapPin size={16} />
            </span>
            ที่อยู่ในการจัดส่งสินค้า
          </h2>

          <textarea
            required
            rows={3}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setAddressSaved(false);
            }}
            placeholder="กรุณากรอกที่อยู่สำหรับจัดส่งสินค้า..."
            className="w-full p-3 bg-[#FAF9F6] border border-[#EBE5DC] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/20 focus:border-[#D4A373] resize-none text-stone-700 placeholder-stone-400 text-xs leading-relaxed transition-all"
          />

          <button
            type="button"
            onClick={hdlSaveAddress}
            className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-2xl text-xs transition duration-200 cursor-pointer shadow-sm ${
              addressSaved
                ? "bg-emerald-600 text-white shadow-emerald-600/20"
                : "bg-[#D4A373] hover:bg-[#BC6C25] text-white shadow-[0_8px_20px_rgba(212,163,115,0.3)] active:scale-[0.99]"
            }`}
          >
            {addressSaved ? (
              <>
                <CheckCircle2 size={16} />
                บันทึกที่อยู่เรียบร้อย
              </>
            ) : (
              <>
                <Save size={16} />
                Save Address
              </>
            )}
          </button>
        </div>

        {/* ฝั่งขวา: คำสั่งซื้อ (พร้อมรูปภาพสินค้า & โทนชาไทยละมุนตา) */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-[#EBE5DC] shadow-[0_10px_30px_rgba(0,0,0,0.03)] h-fit space-y-4">
          <h2 className="text-sm font-bold text-stone-800 flex items-center gap-2 pb-3 border-b border-[#EBE5DC]/60">
            <span className="p-2 bg-[#FAF9F6] border border-[#EBE5DC] rounded-xl text-[#D4A373]">
              <ShoppingBag size={16} />
            </span>
            คำสั่งซื้อของคุณ
          </h2>

          {/* รายการสินค้าพร้อมรูปภาพ */}
          <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
            {carts.length > 0 ? (
              carts.map((item, index) => {
                const title =
                  item.title || item.product?.title || "สินค้าไม่มีชื่อ";
                const price = Number(item.price || item.product?.price || 0);
                const count = Number(item.count || 1);
                
                // ดึงรูปภาพจากโครงสร้างข้อมูลที่หลากหลาย (item.images หรือ item.product.images)
                const images = item.images || item.product?.images;
                const imageUrl = images && images.length > 0 ? images[0].url : null;

                return (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-3 bg-[#FAF9F6] p-3 rounded-2xl border border-[#EBE5DC]/60"
                  >
                    <div className="flex items-center gap-3">
                      {/* รูปภาพสินค้า */}
                      <div className="w-12 h-12 bg-white border border-[#EBE5DC] rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-[9px] text-stone-400">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          "No Img"
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-stone-800 line-clamp-1">
                          {title}
                        </p>
                        <p className="text-[11px] text-stone-400">
                          จำนวน: {count} x ฿{numberFormat(price)}
                        </p>
                      </div>
                    </div>

                    <p className="text-[#D4A373] font-bold text-xs shrink-0">
                      ฿{numberFormat(count * price)}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-stone-400 py-4 text-center">
                ไม่มีสินค้าในตะกร้า
              </p>
            )}
          </div>

          <hr className="border-[#EBE5DC]/60" />

          {/* รายละเอียดค่าบริการ */}
          <div className="space-y-2 text-stone-600 text-xs">
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5 text-stone-400">
                <Truck size={14} /> ค่าจัดส่ง:
              </span>
              <span className="font-semibold text-stone-800">฿0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5 text-stone-400">
                <Tag size={14} /> ค่าส่วนลด:
              </span>
              <span className="font-semibold text-emerald-600">-฿0.00</span>
            </div>
          </div>

          <hr className="border-[#EBE5DC]/60" />

          {/* ยอดรวมสุทธิ */}
          <div className="flex justify-between items-center">
            <p className="font-bold text-xs text-stone-800">ยอดรวมสุทธิ:</p>
            <p className="text-[#D4A373] font-bold text-lg">
              ฿{numberFormat(cartTotal)}
            </p>
          </div>

          {/* ปุ่มดำเนินการชำระเงิน */}
          <button
            type="button"
            onClick={hdlGoToPayment}
            className="w-full bg-[#D4A373] hover:bg-[#BC6C25] active:scale-[0.99] text-white font-bold py-3.5 px-3 rounded-2xl shadow-[0_8px_20px_rgba(212,163,115,0.3)] transition duration-200 cursor-pointer text-center text-xs flex items-center justify-center gap-2"
          >
            <CreditCard size={16} />
            ดำเนินการชำระเงิน
          </button>

          {/* ปุ่มแก้ไขรายการ */}
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="w-full bg-[#FAF9F6] hover:bg-[#EBE5DC]/50 text-stone-600 font-semibold py-3 px-3 rounded-2xl border border-[#EBE5DC] transition duration-200 cursor-pointer text-center text-xs flex items-center justify-center gap-2"
          >
            <Edit3 size={16} />
            แก้ไขรายการ
          </button>
        </div>

      </div>
    </div>
  );
};

export default SummaryCard;