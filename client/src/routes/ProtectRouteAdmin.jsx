import { useState, useEffect } from 'react'
import useEcomStore from "../store/ecom-store"
import { currentAdmin } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectRouteAdmin = ({ element }) => {
    const [ok, setOk] = useState(false)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)

    useEffect(() => {
        if (user && token) {
            currentAdmin(token)
                .then(() => setOk(true)) // ตัด res ออกเพื่อไม่ให้ ESLint บ่นว่าไม่ได้ใช้
                .catch((err) => {
                    console.error(err)
                    setOk(false)
                })
        }
    }, [user, token]) // แนะนำให้ใส่ dependency ให้ครบ

    return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteAdmin