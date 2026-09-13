import { useState, useEffect } from 'react'
import { createCategory, removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { FolderPlus, Trash2, Tag } from 'lucide-react'

const FormCategory = () => {
  const token = useEcomStore((state) => state.token)
  const [name, setName] = useState('')
  
  // ดึง categories และ getCategory จาก Zustand Store
  const categories = useEcomStore((state) => state.categories)
  const getCategory = useEcomStore((state) => state.getCategory)

  useEffect(() => {
    if (token) {
      getCategory(token)
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name) {
      return toast.warning('Please fill data')
    }
    try {
      const res = await createCategory(token, { name })
      console.log(res)
      toast.success(`Add Category ${res.data.name} success!!!`)
      setName('') // ล้างค่าในช่องกรอกข้อมูล
      getCategory(token) // อัปเดตรายการใน Store ใหม่
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Error adding category')
    }
  }

  const handleRemove = async (id) => {
    console.log(id)
    try {
      const res = await removeCategory(token, id)
      console.log(res)
      toast.success(`Delete ${res.data.name} success`)
      getCategory(token) // อัปเดตรายการใน Store ใหม่
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Error removing category')
    }
  }

  return (
    <div className="max-w-4xl mx-auto my-6 px-4">
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#EBE5DC] shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
        
        {/* หัวข้อ */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#EBE5DC]/60">
          <span className="p-2.5 bg-[#FAF9F6] border border-[#EBE5DC] rounded-2xl text-[#D4A373] shadow-sm">
            <Tag size={20} />
          </span>
          <div>
            <h1 className="text-base font-bold text-stone-800">Category Management</h1>
            <p className="text-xs text-stone-400">เพิ่มและจัดการหมวดหมู่สินค้าภายในระบบของคุณ</p>
          </div>
        </div>

        {/* ฟอร์มเพิ่มหมวดหมู่ */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="กรอกชื่อหมวดหมู่สินค้าใหม่..."
              className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#EBE5DC] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/20 focus:border-[#D4A373] text-stone-700 placeholder-stone-400 text-xs sm:text-sm transition-all shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="bg-[#D4A373] hover:bg-[#BC6C25] active:scale-[0.99] text-white font-bold px-6 py-3 rounded-2xl shadow-[0_8px_20px_rgba(212,163,115,0.3)] transition-all cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0"
          >
            <FolderPlus size={16} />
            Add Category
          </button>
        </form>

        {/* รายการหมวดหมู่ */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider px-1">
            รายการหมวดหมู่ทั้งหมด ({categories ? categories.length : 0})
          </p>

          <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
            {categories && categories.length > 0 ? (
              categories.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex justify-between items-center bg-[#FAF9F6] hover:bg-[#FAF9F6]/80 px-4 py-3.5 rounded-2xl border border-[#EBE5DC]/60 transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#D4A373]"></span>
                    <span className="text-xs sm:text-sm font-semibold text-stone-700">
                      {item.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-500 border border-rose-100 hover:border-rose-200 rounded-xl text-xs font-medium transition-all cursor-pointer shadow-sm"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <div className="py-12 text-center bg-[#FAF9F6] rounded-2xl border border-[#EBE5DC]/60">
                <p className="text-xs text-stone-400">ยังไม่มีหมวดหมู่สินค้า</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default FormCategory