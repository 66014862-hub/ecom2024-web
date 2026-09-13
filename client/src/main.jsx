import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

// กำหนดให้ Axios วิ่งเข้า /api อัตโนมัติทุกตัวโดยไม่ต้องแก้ไฟล์ย่อย
axios.defaults.baseURL = window.location.hostname === 'localhost' ? 'http://localhost:5001' : '';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)