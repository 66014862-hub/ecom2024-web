import { useState } from 'react'
import { PlusCircle, Package, Image as ImageIcon, Trash2, Edit } from 'lucide-react'
import { toast } from 'react-toastify'

const FormProduct = () => {
  // ตัวอย่าง State เบื้องต้น (สามารถปรับเข้ากับ Logic เดิมของคุณได้เลยครับ)
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
  })

  const [products, setProducts] = useState([
    { id: 1, title: 'ตัวอย่างสินค้า 1', description: 'รายละเอียดสินค้า...', price: 590, quantity: 10, sold: 2, updatedAt: '13/09/2026' }
  ])

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title) {
      return toast.warning('กรุณากรอกชื่อสินค้า')
    }
    toast.success('เพิ่มสินค้าสำเร็จ!')
  }

  return (
    <div className="max-w-6xl mx-auto my-6 px-4 space-y-6">
      
      {/* ส่วนฟอร์มเพิ่มข้อมูลสินค้า */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-sky-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
        
        {/* หัวข้อ */}
        <div className="flex items-center gap-3 pb-4 border-b border-sky-100">
          <span className="p-2.5 bg-sky-50 border border-sky-100 rounded-2xl text-sky-500 shadow-sm">
            <Package size={20} />
          </span>
          <div>
            <h2 className="text-base font-bold text-slate-800">เพิ่มข้อมูลสินค้า</h2>
            <p className="text-xs text-slate-400">กรอกรายละเอียดสินค้าใหม่เข้าสู่ระบบ</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ชื่อสินค้า */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">ชื่อสินค้า</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleOnChange}
                placeholder="ระบุชื่อสินค้า..."
                className="w-full px-4 py-3 bg-sky-50/30 border border-sky-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 text-slate-700 placeholder-slate-400 text-xs sm:text-sm transition-all shadow-inner"
              />
            </div>

            {/* หมวดหมู่ */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">หมวดหมู่สินค้า</label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleOnChange}
                className="w-full px-4 py-3 bg-sky-50/30 border border-sky-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 text-slate-700 text-xs sm:text-sm transition-all shadow-inner cursor-pointer"
              >
                <option value="">Please Select Category</option>
                <option value="1">Chairs</option>
                <option value="2">Eyewear / Sunglasses</option>
                <option value="3">Perfumes</option>
              </select>
            </div>
          </div>

          {/* รายละเอียด */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">รายละเอียดสินค้า</label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleOnChange}
              placeholder="ระบุรายละเอียดสินค้า..."
              className="w-full px-4 py-3 bg-sky-50/30 border border-sky-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 text-slate-700 placeholder-slate-400 text-xs sm:text-sm transition-all shadow-inner resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ราคา */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">ราคา (บาท)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleOnChange}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-sky-50/30 border border-sky-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 text-slate-700 placeholder-slate-400 text-xs sm:text-sm transition-all shadow-inner"
              />
            </div>

            {/* จำนวนสินค้า */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">จำนวนสินค้าในสต็อก</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleOnChange}
                placeholder="0"
                className="w-full px-4 py-3 bg-sky-50/30 border border-sky-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 text-slate-700 placeholder-slate-400 text-xs sm:text-sm transition-all shadow-inner"
              />
            </div>
          </div>

          {/* อัปโหลดรูปภาพ */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">รูปภาพสินค้า</label>
            <div className="flex items-center gap-3 p-3 bg-sky-50/30 border border-sky-100 rounded-2xl">
              <span className="p-2 bg-white border border-sky-100 rounded-xl text-sky-500 shadow-sm">
                <ImageIcon size={18} />
              </span>
              <input
                type="file"
                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-100 file:text-pink-600 hover:file:bg-pink-200 cursor-pointer"
              />
            </div>
          </div>

          {/* ปุ่มบันทึก */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-400 to-pink-400 hover:from-sky-500 hover:to-pink-500 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-2xl shadow-[0_8px_20px_rgba(244,114,182,0.25)] transition-all cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <PlusCircle size={18} />
            เพิ่มสินค้า
          </button>

        </form>
      </div>

      {/* ส่วนตารางแสดงรายการสินค้า */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-sky-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-4">
        <h3 className="text-sm font-bold text-slate-800">รายการสินค้าทั้งหมด</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-50/60 border-b border-sky-100 text-slate-600 text-xs font-semibold">
                <th className="p-3 rounded-l-2xl">No.</th>
                <th className="p-3">รูปภาพ</th>
                <th className="p-3">ชื่อสินค้า</th>
                <th className="p-3">รายละเอียด</th>
                <th className="p-3">ราคา</th>
                <th className="p-3">จำนวน</th>
                <th className="p-3">ขายแล้ว</th>
                <th className="p-3">วันที่อัพเดท</th>
                <th className="p-3 rounded-r-2xl text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700 divide-y divide-sky-50">
              {products.length > 0 ? (
                products.map((item, index) => (
                  <tr key={item.id} className="hover:bg-sky-50/30 transition-colors">
                    <td className="p-3 font-medium">{index + 1}</td>
                    <td className="p-3">
                      <div className="w-10 h-10 bg-sky-50 border border-sky-100 rounded-xl flex items-center justify-center text-slate-400 text-[10px]">
                        No Img
                      </div>
                    </td>
                    <td className="p-3 font-bold text-slate-800">{item.title}</td>
                    <td className="p-3 text-slate-400 truncate max-w-xs">{item.description}</td>
                    <td className="p-3 font-semibold text-pink-500">฿{item.price}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">{item.sold}</td>
                    <td className="p-3 text-slate-400">{item.updatedAt}</td>
                    <td className="p-3 text-center space-x-2">
                      <button className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-xl transition-all font-medium inline-flex items-center gap-1 cursor-pointer">
                        <Edit size={12} /> แก้ไข
                      </button>
                      <button className="px-2.5 py-1 bg-pink-50 hover:bg-pink-100 text-pink-500 rounded-xl transition-all font-medium inline-flex items-center gap-1 cursor-pointer">
                        <Trash2 size={12} /> ลบ
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-8 text-slate-400">ไม่มีข้อมูลสินค้า</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default FormProduct