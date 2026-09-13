import { useState, useEffect } from 'react';
import { getOrders } from '../../api/user';
import useEcomStore from '../../store/ecom-store';
import HistoryCard from '../../components/cart/HistoryCard';
import { Package } from 'lucide-react';

const History = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (token) {
      handleGetOrders(token);
    }
  }, [token]);

  const handleGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        const data = res.data.orders || res.data;
        if (Array.isArray(data)) {
          const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sortedOrders);
        } else {
          setOrders([]);
        }
      })
      .catch((err) => {
        console.log("Error fetching orders:", err);
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold text-stone-800 flex items-center gap-3">
        <span className="p-3 bg-amber-50 border border-amber-200/60 rounded-2xl text-amber-600 shadow-sm">
          <Package size={22} />
        </span>
        ประวัติการสั่งซื้อ
      </h1>

      {!orders || orders.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-amber-100 p-12 text-center text-stone-500 text-sm shadow-sm">
          ไม่มีประวัติคำสั่งซื้อ...
        </div>
      ) : (
        orders.map((item, index) => (
          <HistoryCard key={index} item={item} />
        ))
      )}
    </div>
  );
};

export default History;