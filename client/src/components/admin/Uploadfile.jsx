import { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFile } from "../../api/Product";
import useEcomStore from "../../store/ecom-store";
import { Loader } from "lucide-react";

const Uploadfile = ({ form, setForm }) => {
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsLoading(true);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} ไม่ใช่รูป`);
          setIsLoading(false);
          continue;
        }

        const resizerObj = Resizer.default || Resizer;
        const resizeImage = resizerObj.imageFileResizer || resizerObj;

        resizeImage(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            uploadFile(token, data)
              .then((res) => {
                console.log("Upload res:", res.data);
                
                // ใช้ Callback อัปเดต State เพื่อป้องกันค่าตกหล่น
                setForm((prevForm) => ({
                  ...prevForm,
                  images: [...(prevForm.images || []), res.data],
                }));

                setIsLoading(false);
                toast.success("Upload image success!");
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
                toast.error("Upload image failed!");
              });
          },
          "base64"
        );
      }
    }
  }

  const handleDelete = (public_id) => {
    {
      isLoading && <Loader className="w-16 h-16 animate-spin "/>
    }
    removeFiles(token, public_id)
      .then((res) => {
        toast.success(res.data?.message || "ลบรูปภาพสำเร็จ");

        const filterImages = (form.images || []).filter(
          (item) => item.public_id !== public_id
        );

        setForm({
          ...form,
          images: filterImages,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response?.data?.message || "เกิดข้อผิดพลาดในการลบรูป"
        );
      });
  };

  return (
    <div className="my-4">
      {/* สถานะกำลังอัปโหลด */}
      {isLoading && <p className="text-blue-500 font-semibold mb-2">กำลังอัปโหลดรูปภาพ...</p>}
       
      <div className="flex flex-wrap mx-4 gap-4 my-4">
        {/* ป้องกัน Crash โดยเช็ก form.images ก่อน .map */}
        {form.images &&
          form.images.map((item, index) => (
            <div className="relative border p-1 rounded-md" key={index}>
              <img
                className="w-24 h-24 object-cover rounded-md hover:scale-105 transition-transform"
                src={item.secure_url || item.url}
                alt="Product Preview"
              />

              <span
                onClick={() => handleDelete(item.public_id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md text-xs hover:bg-red-600"
              >
                X
              </span>
            </div>
          ))}
      </div>

      <div>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleOnChange}
          className="border p-2 rounded-md cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Uploadfile;