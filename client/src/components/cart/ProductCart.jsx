import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { motion } from "framer-motion";

const ProductCart = ({ item }) => {
  const actionAddCart = useEcomStore((state) => state.actionAddtoCart);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center"
    >
      {/* ปรับขอบให้ละมุนขึ้นด้วยสี #EBE5DC และเพิ่มมิติเงาให้ฟุ้งละมุนตา */}
      <div className="group relative border border-[#EBE5DC] rounded-3xl p-4 w-52 flex flex-col justify-between bg-white transition-all duration-300 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1">
        
        {/* ป้ายแท็กมินิมอล (Glassmorphism Badge) โทนละมุน */}
        <div className="absolute top-6 left-6 z-10">
          <span className="bg-white/90 backdrop-blur-md border border-[#EBE5DC] text-[10px] font-medium text-stone-600 px-2.5 py-1 rounded-full shadow-sm">
            ✨ New Item
          </span>
        </div>

        {/* ส่วนรูปภาพสินค้า พร้อมพื้นหลังครีมจางๆ ละมุนตา */}
        <div className="w-full h-40 bg-[#FAF9F6] rounded-2xl overflow-hidden flex items-center justify-center p-2 mb-3 border border-[#EBE5DC]/50">
          {item?.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              alt={item.title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
            />
          ) : (
            <div className="text-stone-400 text-xs font-light">No Image</div>
          )}
        </div>

        {/* ส่วนชื่อและรายละเอียดสินค้า */}
        <div className="my-1 flex flex-col flex-grow">
          <h3 className="text-sm font-semibold text-stone-800 line-clamp-1 group-hover:text-[#D4A373] transition-colors">
            {item?.title}
          </h3>
          <p className="text-xs text-stone-400 line-clamp-1 mt-0.5 font-light">
            {item?.description}
          </p>
        </div>

        {/* ส่วนราคาและปุ่มเพิ่มลงตะกร้า */}
        <div className="flex justify-between items-center pt-3 mt-2 border-t border-[#EBE5DC]/60">
          <div>
            <span className="text-[10px] text-stone-400 block font-light uppercase tracking-wider">Price</span>
            <span className="text-base font-bold text-stone-800">
              ฿{item?.price?.toLocaleString()}
            </span>
          </div>
          
          {/* ปุ่มกดเปลี่ยนเป็นโทนสีน้ำตาลชาไทย/เบจละมุน (หรือเปลี่ยนตามชอบได้ครับ) */}
          <button
            onClick={() => actionAddCart(item)}
            className="bg-[#D4A373] hover:bg-[#BC8A5F] text-white rounded-xl p-2.5 transition-all duration-300 shadow-[0_4px_12px_rgba(212,163,115,0.3)] hover:shadow-[0_6px_16px_rgba(212,163,115,0.4)] flex items-center justify-center active:scale-95"
            title="เพิ่มลงตะกร้า"
          >
            <ShoppingCart size={16} />
          </button>
        </div>

      </div>
    </motion.div>
  );
};


export default ProductCart;