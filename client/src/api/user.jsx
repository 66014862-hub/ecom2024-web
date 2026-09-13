import axios from "axios";

export const createUserCart = async (token, cart) => {
  return await axios.post('http://localhost:5001/api/user/cart', cart, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// เพิ่มฟังก์ชันสำหรับดึงข้อมูลตะกร้าสินค้า
export const listUserCart = async (token) => {
  return await axios.get('http://localhost:5001/api/user/cart', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// เพิ่มฟังก์ชันสำหรับบันทึกที่อยู่
export const saveAddress = async (token, address) => {
  return await axios.post('http://localhost:5001/api/user/address', address, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const saveOrder = async (token, paymentIntent) => {
  return await axios.post(
    "http://localhost:5001/api/user/order",
    { paymentIntent }, // ส่ง paymentIntent ไปใน Body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// ตัวอย่างฟังก์ชันดึงประวัติคำสั่งซื้อ
export const getOrders = async (token) => {
  return await axios.get("http://localhost:5001/api/user/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};