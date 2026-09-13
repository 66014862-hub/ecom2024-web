import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ShoppingCart, Check } from 'lucide-react';
import useEcomStore from '../store/ecom-store';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SwiperShowProduct = ({ products, title }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (product) => {
    actionAddtoCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      {/* หัวข้อหมวดหมู่สินค้า */}
      <div className="text-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-wide">
          {title}
        </h2>
        <div className="w-12 h-1 bg-pink-500 mx-auto mt-1 rounded-full"></div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        slidesPerView={2}
        spaceBetween={12}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 12 },
          768: { slidesPerView: 4, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 15 },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper pb-8 px-2"
      >
        {products.map((item) => {
          const isAdded = addedId === item.id;
          return (
            <SwiperSlide key={item.id} className="h-auto">
              {/* กรอบสินค้าขนาดเล็กลง ดีไซน์กะทัดรัด สวยงาม */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col justify-between h-full group p-2">
                
                {/* รูปสินค้า */}
                <div className="w-full h-32 bg-slate-50 flex items-center justify-center p-2 overflow-hidden rounded-lg relative">
                  <img 
                    src={item.images?.[0]?.url} 
                    alt={item.title} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* รายละเอียดสินค้า */}
                <div className="p-2 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-xs sm:text-sm line-clamp-1 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-[10px] sm:text-xs line-clamp-2 mb-2">
                      {item.description}
                    </p>
                  </div>

                  {/* ราคา และปุ่มตะกร้า */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
                    <span className="text-pink-600 font-bold text-xs sm:text-sm">
                      ฿{item.price?.toLocaleString()}
                    </span>
                    
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 flex items-center justify-center shadow-sm ${
                        isAdded 
                          ? 'bg-emerald-500 text-white scale-105' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                      }`}
                      title="เพิ่มลงตะกร้า"
                    >
                      {isAdded ? <Check size={16} /> : <ShoppingCart size={16} />}
                    </button>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SwiperShowProduct;