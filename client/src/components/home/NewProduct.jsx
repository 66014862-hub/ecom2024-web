import SwiperShowProduct from '../../utils/SwiperShowProduct';
import { Sparkles } from 'lucide-react';

import img11 from '../../assets/2dev/11.jpg';
import img22 from '../../assets/2dev/22.jpg';
import img33 from '../../assets/2dev/33.jpg';
import img44 from '../../assets/2dev/44.jpg';
import img55 from '../../assets/2dev/55.jpg';
import img66 from '../../assets/2dev/66.jpg';
import img77 from '../../assets/2dev/77.jpg';

const NewProduct = () => {
  const products = [
    { id: 301, title: "ลิปสติกแบรนด์หรู เนื้อเนียน", description: "เนื้อเนียนนุ่ม เม็ดสีชัดเจน หรูหรามีระดับ", price: 1490, images: [{ url: img11 }] },
    { id: 302, title: "ลิปบาล์มบำรุงริมฝีปาก", description: "เพิ่มความชุ่มชื้น ปากฉ่ำวาวสุขภาพดี", price: 590, images: [{ url: img22 }] },
    { id: 303, title: "บลัชออนตลับพาสเทล", description: "ปัดแก้มละมุน เติมความสดใสให้ใบหน้า", price: 490, images: [{ url: img33 }] },
    { id: 304, title: "ลิปสติกโทนสีคลาสสิก", description: "สีสวยติดทนนาน แมตช์ได้กับทุกลุค", price: 1290, images: [{ url: img44 }] },
    { id: 305, title: "พาเลทเครื่องสำอางครบเซ็ต", description: "รวมไอเทมแต่งหน้าโทนสีฮิต เม็ดสีแน่นชัด", price: 890, images: [{ url: img55 }] },
    { id: 306, title: "พาเลทอายแชโดว์โทนอุ่น", description: "แต่งตาง่ายได้ทุกวัน เนื้อเนียนเกลี่ยง่าย", price: 790, images: [{ url: img66 }] },
    { id: 307, title: "พาเลทอายแชโดว์พรีเมียม", description: "เฉดสีพรีเมียม สร้างมิติให้ดวงตาดูโดดเด่น", price: 2390, images: [{ url: img77 }] },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* กรอบกล่องใหญ่สินค้าใหม่ โทนพาสเทลละมุน */}
      <div className="bg-gradient-to-b from-white/90 via-[#FAF9F6] to-[#FDFBF7] rounded-[36px] p-6 md:p-8 border border-[#EBE5DC] shadow-[0_15px_35px_rgba(212,163,115,0.06)] relative overflow-hidden">
        
        {/* ลูกเล่นแสงพาสเทล */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#FAE1DD]/30 rounded-full blur-3xl pointer-events-none" />

        {/* ส่วนหัวข้อ */}
        <div className="flex flex-col items-center justify-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-500 text-xs font-medium tracking-wider uppercase mb-2 shadow-sm">
            <Sparkles size={13} className="text-rose-400" />
            <span>New Arrivals</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-800">
            สินค้าใหม่
          </h2>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-8 h-1 bg-rose-400 rounded-full"></span>
            <span className="w-1.5 h-1 bg-stone-300 rounded-full"></span>
          </div>
        </div>

        <div className="relative z-10">
          <SwiperShowProduct products={products} />
        </div>

      </div>
    </div>
  );
};

export default NewProduct;