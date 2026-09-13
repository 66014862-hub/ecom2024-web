import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay, Pagination } from 'swiper/modules';

import img1 from '../../assets/2dev/1.jpg';
import img2 from '../../assets/2dev/2.jpg';
import img3 from '../../assets/2dev/3.jpg';
import img4 from '../../assets/2dev/4.jpg';
import img5 from '../../assets/2dev/5.jpg';
import img6 from '../../assets/2dev/6.jpg';
import img11 from '../../assets/2dev/11.jpg';
import img22 from '../../assets/2dev/22.jpg';
import img33 from '../../assets/2dev/33.jpg';
import img44 from '../../assets/2dev/44.jpg';
import img55 from '../../assets/2dev/55.jpg';
import img66 from '../../assets/2dev/66.jpg';
import img77 from '../../assets/2dev/77.jpg';
import imgA from '../../assets/2dev/a.jpg';
import imgAsus from '../../assets/2dev/asus.jpg';
import imgBalenciaga from '../../assets/2dev/Balenciaga.jpg';
import imgCD from '../../assets/2dev/CD.jpg';
import imgChanel from '../../assets/2dev/chanel.jpg';
import imgCL from '../../assets/2dev/CL.jpg';
import imgCoach from '../../assets/2dev/coach.jpg';
import imgD from '../../assets/2dev/d.jpg';
import imgGucci from '../../assets/2dev/gucci.jpg';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

const ContentCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = [
    { id: 1, url: img1, title: "เก้าอี้สำนักงาน" },
    { id: 2, url: img2, title: "เก้าอี้พลาสติกแดง" },
    { id: 3, url: img3, title: "เก้าอี้เกมมิ่ง/ทำงาน" },
    { id: 4, url: img4, title: "เก้าอี้นวดไฟฟ้า" },
    { id: 5, url: img5, title: "เก้าอี้พลาสติกเด็ก" },
    { id: 6, url: img6, title: "เก้าอี้ผู้บริหาร" },
    { id: 7, url: img11, title: "ลิปสติก/เครื่องสำอาง" },
    { id: 8, url: img22, title: "ลิปบาล์ม" },
    { id: 9, url: img33, title: "บลัชออน" },
    { id: 10, url: img44, title: "ลิปสติกแบรนด์" },
    { id: 11, url: img55, title: "เซ็ตบลัชออน" },
    { id: 12, url: img66, title: "พาเลทอายแชโดว์" },
    { id: 13, url: img77, title: "พาเลทแต่งหน้า Dior" },
    { id: 14, url: imgA, title: "สินค้าพิเศษ" },
    { id: 15, url: imgAsus, title: "แล็ปท็อป ASUS" },
    { id: 16, url: imgBalenciaga, title: "แว่นตา/สินค้า Balenciaga" },
    { id: 17, url: imgCD, title: "แว่นตาแฟชั่น CD" },
    { id: 18, url: imgChanel, title: "น้ำหอม Chanel" },
    { id: 19, url: imgCL, title: "แว่นตากันแดด CL" },
    { id: 20, url: imgCoach, title: "น้ำหอม/สินค้า Coach" },
    { id: 21, url: imgD, title: "แล็ปท็อป Dell" },
    { id: 22, url: imgGucci, title: "น้ำหอม Gucci Flora" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* เพิ่มเงาแบบฟุ้งละมุน (Soft Layer Shadow) ให้กล่องใหญ่ */}
      <div className="bg-[#FAF9F6] p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#EBE5DC] backdrop-blur-xl">
        
        {/* เพิ่มเงาให้สไลด์ตัวหลัก */}
        <Swiper
          style={{
            '--swiper-navigation-color': '#D4A373',
            '--swiper-pagination-color': '#D4A373',
          }}
          spaceBetween={15}
          navigation={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
          className="mySwiper2 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] mb-4 h-[320px] sm:h-[420px] bg-white border border-[#EBE5DC]/60"
        >
          {images.map((item) => (
            <SwiperSlide key={item.id} className="relative flex items-center justify-center p-6">
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:scale-105 transition-transform duration-500"
              />
              {/* เพิ่มเงาให้ป้ายชื่อสินค้าลอยเด่นขึ้น */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md text-stone-700 border border-[#EBE5DC] px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium tracking-wide shadow-[0_8px_20px_rgba(0,0,0,0.05)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A373]"></span>
                {item.title}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* เพิ่มเงาให้รูปตัวอย่างด้านล่าง */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          breakpoints={{
            640: { slidesPerView: 5 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 8 },
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper h-20 sm:h-24 cursor-pointer py-1"
        >
          {images.map((item) => (
            <SwiperSlide 
              key={item.id} 
              className="bg-white rounded-2xl overflow-hidden border border-[#EBE5DC] transition-all duration-300 opacity-60 hover:opacity-100 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-[#D4A373] [&.swiper-slide-thumb-active]:ring-2 [&.swiper-slide-thumb-active]:ring-[#D4A373]/20 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-contain p-2"
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
};

export default ContentCarousel;