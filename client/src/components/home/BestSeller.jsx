import SwiperShowProduct from '../../utils/SwiperShowProduct';
import { Sparkles, Flame } from 'lucide-react';

import img1 from '../../assets/2dev/1.jpg';
import img2 from '../../assets/2dev/2.jpg';
import img3 from '../../assets/2dev/3.jpg';
import imgAsus from '../../assets/2dev/asus.jpg';
import imgChanel from '../../assets/2dev/chanel.jpg';
import img66 from '../../assets/2dev/66.jpg';
import imgGucci from '../../assets/2dev/gucci.jpg';
import imgBalenciaga from '../../assets/2dev/Balenciaga.jpg';

const BestSeller = () => {
  const products = [
    { id: 1, title: "เก้าอี้สำนักงานพรีเมียม", description: "เก้าอี้ตาข่ายปรับระดับได้ รองรับสรีระ", price: 2900, images: [{ url: img1 }] },
    { id: 2, title: "เก้าอี้แดงดีไซน์โมเดิร์น", description: "ดีไซน์สวยหรู นั่งสบาย แข็งแรงทนทาน", price: 1590, images: [{ url: img2 }] },
    { id: 3, title: "เก้าอี้เกมมิ่งทำงาน", description: "เบาะหนานุ่มพิเศษ ปรับเอนนอนได้", price: 3500, images: [{ url: img3 }] },
    { id: 4, title: "แล็ปท็อป ASUS ทำงาน/เล่นเกม", description: "สเปคแรง ประมวลผลลื่นไหล จอคมชัด", price: 18900, images: [{ url: imgAsus }] },
    { id: 5, title: "น้ำหอม Chanel หรูหรา", description: "กลิ่นหอมติดทนนาน หรูหรามีระดับ", price: 4200, images: [{ url: imgChanel }] },
    { id: 6, title: "พาเลทเครื่องสำอางแต่งหน้า", description: "โทนสีฮิต แต่งได้ทุกวัน เม็ดสีแน่น", price: 890, images: [{ url: img66 }] },
    { id: 7, title: "น้ำหอม Gucci Flora", description: "กลิ่นฟลอรัลละมุน อ่อนหวาน สดชื่น", price: 4500, images: [{ url: imgGucci }] },
    { id: 8, title: "กระเป๋าแฟชั่น Balenciaga", description: "ดีเทลโดดเด่น ทันสมัย แมตช์ได้ทุกชุด", price: 12500, images: [{ url: imgBalenciaga }] },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* กรอบกล่องใหญ่ครอบหมวดหมู่ (Warm Minimalist & Pastel Card Wrapper) */}
      <div className="bg-gradient-to-b from-white/90 via-[#FAF9F6] to-[#FDFBF7] rounded-[36px] p-6 md:p-8 border border-[#EBE5DC] shadow-[0_15px_35px_rgba(212,163,115,0.06)] relative overflow-hidden">
        
        {/* ลูกเล่นวงกลมแสงพาสเทลจางๆ ด้านหลัง */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FAE1DD]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />

        {/* ส่วนหัวข้อสไตล์ละมุน */}
        <div className="flex flex-col items-center justify-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAE1DD]/60 border border-[#F5EBE6] text-[#BC6C25] text-xs font-medium tracking-wider uppercase mb-2 shadow-sm">
            <Flame size={13} className="text-[#E07A5F]" />
            <span>Featured Collection</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-800">
            สินค้าขายอย่างดี
          </h2>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-8 h-1 bg-[#D4A373] rounded-full"></span>
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

export default BestSeller;