import { useEffect } from "react";
import ProductCart from "../components/cart/ProductCart";
import CartCard from "../components/cart/CartCard";
import SearchCard from "../components/cart/SearchCard";
import useEcomStore from "../store/ecom-store";
import { Sparkles } from "lucide-react";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex h-screen bg-[#FAF9F6]">

      {/* ฝั่งค้นหาด้านซ้าย */}
      <div className="w-1/4 p-4 bg-white/60 backdrop-blur-md border-r border-[#EBE5DC] overflow-y-auto">
        <SearchCard />
      </div>

      {/* ส่วนแสดงสินค้าทั้งหมดตรงกลาง */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-[#FAE1DD] text-[#BC6C25] p-2 rounded-2xl shadow-sm">
            <Sparkles size={18} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-stone-800">สินค้าทั้งหมด</h1>
            <p className="text-xs text-stone-400">เลือกชมสินค้าคุณภาพคัดสรรพิเศษเพื่อคุณ</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <ProductCart key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* ฝั่งตะกร้าสินค้าด้านขวา */}
      <div className="w-1/5 p-4 bg-white/80 backdrop-blur-md border-l border-[#EBE5DC] overflow-y-auto">
        <CartCard />
      </div>
    </div>
  );
};

export default Shop;