import { useState, useEffect, useRef } from "react";
import { Search, LayoutGrid, SlidersHorizontal } from "lucide-react";
import useEcomStore from "../../store/ecom-store";

const SearchCard = () => {
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters,
  );

  const [text, setText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState([0, 100000]);

  // ตัวแปรเช็กว่าเปิดหน้าครั้งแรกหรือไม่
  const isFirstRender = useRef(true);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const handleSearch = (
    newText = text,
    newCats = selectedCategories,
    newPrice = price,
  ) => {
    actionSearchFilters({
      query: newText,
      category: newCats,
      price: newPrice,
    });
  };

  // 1. กรองด้วยข้อความ
  useEffect(() => {
    if (isFirstRender.current) return;
    const delayDebounceFn = setTimeout(() => {
      handleSearch(text, selectedCategories, price);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  // 2. กรองด้วยราคา (ทำงานเมื่อมีการเลื่อนสไลเดอร์จริงๆ เท่านั้น)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      handleSearch(text, selectedCategories, price);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [price]);

  // 3. เลือกหมวดหมู่
  const handleCategoryCheck = (e, categoryId) => {
    isFirstRender.current = false;
    let updated = [...selectedCategories];
    if (e.target.checked) {
      updated.push(categoryId);
    } else {
      updated = updated.filter((id) => id !== categoryId);
    }
    setSelectedCategories(updated);
    handleSearch(text, updated, price);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-[#EBE5DC] shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
      
      {/* 1. ค้นหาข้อความ */}
      <div>
        <h2 className="text-base font-bold text-stone-800 flex items-center gap-2 mb-3">
          <span className="p-1.5 bg-[#FAF9F6] border border-[#EBE5DC] rounded-xl text-[#D4A373]">
            <Search size={16} />
          </span>
          ค้นหาสินค้า
        </h2>
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              isFirstRender.current = false;
              setText(e.target.value);
            }}
            placeholder="ค้นหาสินค้า..."
            className="w-full bg-[#FAF9F6] border border-[#EBE5DC] rounded-2xl px-4 py-2.5 pl-10 text-xs sm:text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/20 focus:border-[#D4A373] transition-all"
          />
          <Search
            className="absolute left-3.5 top-3 text-stone-400"
            size={16}
          />
        </div>
      </div>

      <hr className="border-[#EBE5DC]/60" />

      {/* 2. หมวดหมู่สินค้า */}
      <div>
        <h2 className="text-base font-bold text-stone-800 flex items-center gap-2 mb-3">
          <span className="p-1.5 bg-[#FAF9F6] border border-[#EBE5DC] rounded-xl text-[#D4A373]">
            <LayoutGrid size={16} />
          </span>
          หมวดหมู่สินค้า
        </h2>
        <div className="space-y-2.5 pl-1 max-h-48 overflow-y-auto pr-1">
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <label
                key={cat._id || cat.id}
                className="flex items-center gap-3 text-xs sm:text-sm text-stone-600 cursor-pointer group hover:text-[#D4A373] transition-colors"
              >
                <input
                  type="checkbox"
                  value={cat._id || cat.id}
                  onChange={(e) => handleCategoryCheck(e, cat._id || cat.id)}
                  className="w-4 h-4 rounded-md border-[#EBE5DC] text-[#D4A373] focus:ring-[#D4A373]/20 accent-[#D4A373] cursor-pointer"
                />
                <span className="group-hover:translate-x-0.5 transition-transform">{cat.name}</span>
              </label>
            ))
          ) : (
            <p className="text-xs text-stone-400">ไม่มีหมวดหมู่</p>
          )}
        </div>
      </div>

      <hr className="border-[#EBE5DC]/60" />

      {/* 3. ค้นหาราคา */}
      <div>
        <h2 className="text-base font-bold text-stone-800 flex items-center gap-2 mb-3">
          <span className="p-1.5 bg-[#FAF9F6] border border-[#EBE5DC] rounded-xl text-[#D4A373]">
            <SlidersHorizontal size={16} />
          </span>
          ค้นหาราคา
        </h2>

        <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#EBE5DC]/60 space-y-4">
          <div className="flex justify-between text-xs text-stone-500 font-medium">
            <span>Min: {price[0].toLocaleString()} ฿</span>
            <span>Max: {price[1].toLocaleString()} ฿</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] text-stone-400 block mb-1">Min Price</span>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={price[0]}
                onChange={(e) => {
                  isFirstRender.current = false;
                  const val = Number(e.target.value);
                  setPrice([val > price[1] ? price[1] : val, price[1]]);
                }}
                className="w-full accent-[#D4A373] bg-[#EBE5DC] rounded-lg h-1.5 cursor-pointer"
              />
            </div>
            <div>
              <span className="text-[11px] text-stone-400 block mb-1">Max Price</span>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={price[1]}
                onChange={(e) => {
                  isFirstRender.current = false;
                  const val = Number(e.target.value);
                  setPrice([price[0], val < price[0] ? price[0] : val]);
                }}
                className="w-full accent-[#D4A373] bg-[#EBE5DC] rounded-lg h-1.5 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;