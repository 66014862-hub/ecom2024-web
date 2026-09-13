import { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { readProduct, updateProduct, listProduct} from "../../api/Product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams(); // ดึง id จาก URL (/admin/product/:id)
  const navigate = useNavigate();

  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  const [form, setForm] = useState(initialState);

  // โหลดหมวดหมู่ และ โหลดข้อมูลสินค้าเดิมตาม ID
  useEffect(() => {
    if (token) {
      getCategory();
      fetchProduct(token,id,form);
    }
  }, [token, id]);

  const fetchProduct = async () => {
    try {
      const res = await readProduct(token, id, form);
      setForm({
        title: res.data.title || "",
        description: res.data.description || "",
        price: res.data.price || "",
        quantity: res.data.quantity || "",
        categoryId: res.data.categoryId || "",
        images: res.data.images || [],
      });
    } catch (err) {
      console.log(err);
      toast.error("ไม่สามารถดึงข้อมูลสินค้าได้");
    }
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.categoryId) {
      return toast.warning("Please select a Category");
    }

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
        categoryId: Number(form.categoryId),
      };

      const res = await updateProduct(token, id, payload);
      toast.success(`แก้ไขข้อมูล ${res.data.title} สำเร็จ!`);
      
      // บันทึกเสร็จแล้วให้ย้อนกลับไปหน้าตารางสินค้า
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Server Error");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md max-w-6xl">
      <h1 className="text-xl font-bold mb-4">แก้ไขข้อมูลสินค้า</h1>

      <form className="flex flex-col gap-3 mb-6" onSubmit={handleSubmit}>
        <label className="text-sm font-semibold">ชื่อสินค้า</label>
        <input
          className="border p-2 rounded-md w-full"
          value={form.title}
          onChange={handleOnChange}
          placeholder="title"
          name="title"
          required
        />

        <label className="text-sm font-semibold">รายละเอียด</label>
        <input
          className="border p-2 rounded-md w-full"
          value={form.description}
          onChange={handleOnChange}
          placeholder="description"
          name="description"
          required
        />

        <label className="text-sm font-semibold">ราคา</label>
        <input
          className="border p-2 rounded-md w-full"
          type="number"
          value={form.price}
          onChange={handleOnChange}
          placeholder="price"
          name="price"
          required
        />

        <label className="text-sm font-semibold">จำนวน</label>
        <input
          className="border p-2 rounded-md w-full"
          type="number"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="quantity"
          name="quantity"
          required
        />

        <label className="text-sm font-semibold">หมวดหมู่</label>
        <select
          className="border p-2 rounded-md w-full"
          name="categoryId"
          onChange={handleOnChange}
          value={form.categoryId}
          required
        >
          <option value="" disabled>
            Please Select
          </option>
          {categories &&
            categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <hr />
        
        {/* Component อัปโหลดและจัดการรูปภาพ */}
        <Uploadfile form={form} setForm={setForm} />

        <div className="flex gap-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md mt-2 font-medium flex-1"
            type="submit"
          >
            บันทึกการแก้ไข
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/product")}
            className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-md mt-2 font-medium"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditProduct;