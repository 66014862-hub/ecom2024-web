import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/Product";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],

  // เพิ่มสินค้าลงตะกร้า
  actionAddtoCart: (product) => {
    const carts = get().carts || [];
    const index = carts.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      const updatedCart = [...carts];
      updatedCart[index] = {
        ...updatedCart[index],
        count: (updatedCart[index].count || 1) + 1,
      };
      set({ carts: updatedCart });
    } else {
      set({ carts: [...carts, { ...product, count: 1 }] });
    }
  },

  // อัปเดตจำนวนสินค้า (+1 / -1)
  actionUpdateQuantity: (productId, delta) => {
    const carts = get().carts || [];
    const updatedCart = carts
      .map((item) => {
        if (item.id === productId) {
          const newCount = (item.count || 1) + delta;
          return newCount > 0 ? { ...item, count: newCount } : null;
        }
        return item;
      })
      .filter(Boolean);

    set({ carts: updatedCart });
  },

  // ลบสินค้าออกจากตะกร้า
  actionRemoveItem: (productId) => {
    const carts = get().carts || [];
    const updatedCart = carts.filter((item) => item.id !== productId);
    set({ carts: updatedCart });
  },

  actionsLogin: async (form) => {
    const res = await axios.post(
      "https://ecom2024-api.vercel.app/api/login",
      form,
    );
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },

  // 👇 เพิ่มฟังก์ชัน logout ตรงนี้เพื่อเคลียร์ user และ token ให้เป็น null
  logout: () => {
    set({
      user: null,
      token: null,
    });
  },

  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  getProduct: async (count = 100) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  actionSearchFilters: async (arg) => {
    try {
      const { query, category, price } = arg;
      const hasQuery = query && query.trim() !== "";
      const hasCategory = category && category.length > 0;
      const hasPrice = price && price.length > 0;

      if (!hasQuery && !hasCategory && !hasPrice) {
        get().getProduct(100);
        return;
      }

      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  clearCart: () => set({ carts: [] }),
});

const usePersist = {
  name: "ecom-storage",
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    user: state.user,
    token: state.token,
    carts: state.carts, // บันทึกตะกร้าลง LocalStorage
  }),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
