import React, { useState } from 'react'
import "./styles.scss"
import { siderContent } from '../../../data/siderData'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../../main'
import dashboard from "../../../assets/dashboard.png"
import logout from "../../../assets/logout.png"
import toast from 'react-hot-toast'

const Sider = ({ items, }) => {
    const [subcat, setSubCat] = useState(false)
    const [subId, setSubId] = useState('')
    const navigateTo = useNavigate()
    const openSubCat = (e) => {
        setSubCat(!subcat)
        setSubId(e)
    }
    const handleLogout = async () => {
        try {
            await axios.get(`${server}/auth/logout`, { withCredentials: true })
            window.location.reload()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const Sublinkopen = (e) => {
        navigateTo(e);
        setSubCat(false)
    }
    return (
        <div className='sider'>
            <div className="logo">
                <h2>LIFE DIGITAL PAY</h2>
            </div>
            <div className="cat" onClick={() => navigateTo("/")}>
                <img src={dashboard} alt="" className='dash-log' />
                <span>Dashboard</span>
            </div>
            {
                items.map((e) => (
                    <>
                        <div className='cats'>
                            <div className='each' onClick={() => openSubCat(e.id)}>
                                <img src={e.ico} alt="" />
                                <span>{e.cat}</span>
                            </div>
                            {
                                subcat && subId === e.id && e.children ? <div className="sub-cat">
                                    {e?.children?.map((subs) => (
                                        <span onClick={() => Sublinkopen(subs.link)}>{subs.subcat}</span>
                                    ))}
                                </div> : null
                            }

                        </div>
                    </>

                ))
            }
            <div className="cat" onClick={handleLogout}> <img src={logout} alt="" className='dash-log' /> <span>Logout</span></div>
        </div>

    )
}

export default Sider
