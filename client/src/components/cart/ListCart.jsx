import React from 'react'
import useEcomStore from '../../store/ecom-store'
import { Link, useNavigate } from 'react-router-dom'
import { Trash, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

const numberFormat = (num) => {
  return Number(num || 0).toLocaleString('th-TH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

const ListCart = () => {
  const carts = useEcomStore((state) => state.carts)
  const updateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
  const removeProduct = useEcomStore((state) => state.actionRemoveProduct)
  
  const navigate = useNavigate()

  const cartTotal = carts.reduce((sum, item) => {
    const price = Number(item.price || item.product?.price || 0)
    const count = Number(item.count || 1)
    return sum + price * count
  }, 0)

  return (
    <div className="max-w-6xl mx-auto my-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* รายการสินค้าในตะกร้า */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#EBE5DC] shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#EBE5DC]/60">
            <span className="p-2.5 bg-[#FAF9F6] border border-[#EBE5DC] rounded-2xl text-[#D4A373] shadow-sm">
              <ShoppingBag size={20} />
            </span>
            <div>
              <h1 className="text-base font-bold text-stone-800">ตะกร้าสินค้าของคุณ</h1>
              <p className="text-xs text-stone-400">ตรวจสอบและจัดการรายการสินค้าก่อนชำระเงิน</p>
            </div>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {carts && carts.length > 0 ? (
              carts.map((item, index) => {
                const title = item.title || item.product?.title || 'สินค้าไม่มีชื่อ'
                const price = Number(item.price || item.product?.price || 0)
                const count = Number(item.count || 1)
                const images = item.images || item.product?.images
                const imageUrl = images && images.length > 0 ? images[0].url : null

                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF9F6] p-4 rounded-2xl border border-[#EBE5DC]/60 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white border border-[#EBE5DC] rounded-2xl overflow-hidden shrink-0 flex items-center justify-center text-[10px] text-stone-400 shadow-sm">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          'No Img'
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-xs sm:text-sm text-stone-800 line-clamp-1">{title}</h3>
                        <p className="text-xs text-[#D4A373] font-semibold mt-0.5">฿{numberFormat(price)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                      <div className="flex items-center bg-white border border-[#EBE5DC] rounded-xl overflow-hidden shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.id, count - 1)}
                          disabled={count <= 1}
                          className="p-2 hover:bg-stone-50 text-stone-600 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-xs font-bold text-stone-800">{count}</span>
                        <button
                          onClick={() => updateQuantity(item.id, count + 1)}
                          className="p-2 hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="font-bold text-xs sm:text-sm text-stone-800 min-w-[70px] text-right">
                        ฿{numberFormat(count * price)}
                      </span>

                      <button
                        onClick={() => removeProduct(item.id)}
                        className="p-2 bg-white hover:bg-rose-50 text-rose-500 border border-rose-100 rounded-xl transition-all shadow-sm cursor-pointer"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-16 text-center space-y-3">
                <p className="text-xs text-stone-400">ไม่มีสินค้าในตะกร้าของคุณ</p>
                <Link
                  to="/shop"
                  className="inline-block bg-[#D4A373] text-white font-bold px-6 py-2.5 rounded-2xl text-xs shadow-md hover:bg-[#BC6C25] transition-all"
                >
                  เลือกซื้อสินค้า
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* สรุปยอดคำสั่งซื้อ */}
        <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#EBE5DC] shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6 h-fit">
          <h2 className="text-sm font-bold text-stone-800 pb-3 border-b border-[#EBE5DC]/60">
            สรุปคำสั่งซื้อ
          </h2>

          <div className="space-y-3 text-xs text-stone-600">
            <div className="flex justify-between">
              <span className="text-stone-400">จำนวนสินค้าทั้งหมด</span>
              <span className="font-semibold text-stone-800">{carts ? carts.length : 0} รายการ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">ค่าจัดส่ง</span>
              <span className="font-semibold text-stone-800">฿0.00</span>
            </div>
          </div>

          <hr className="border-[#EBE5DC]/60" />

          <div className="flex justify-between items-center">
            <span className="font-bold text-xs text-stone-800">ยอดรวมสุทธิ</span>
            <span className="text-lg font-bold text-[#D4A373]">
              ฿{numberFormat(cartTotal)}
            </span>
          </div>

          {carts && carts.length > 0 ? (
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#D4A373] hover:bg-[#BC6C25] active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-2xl shadow-[0_8px_20px_rgba(212,163,115,0.3)] transition-all cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              ไปยังหน้าชำระเงิน
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-stone-200 text-stone-400 font-bold py-3.5 px-4 rounded-2xl text-xs sm:text-sm cursor-not-allowed"
            >
              ไม่มีสินค้าในตะกร้า
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default ListCart