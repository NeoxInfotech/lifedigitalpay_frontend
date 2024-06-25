import React, { useState } from 'react'
import "./styles.scss"
import { siderContent } from '../../../data/siderData'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../../main'
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
    return (
        <div className='sider'>
            <div className="logo">
                <h2>LIFE DIGITAL PAY</h2>
            </div>
            <span className="cat" onClick={() => navigateTo("/")}>Dashboard</span>
            {
                items.map((e) => (
                    <div className='cats'>
                        <a onClick={() => openSubCat(e.id)}>{e.cat}</a>
                        {
                            subcat && subId === e.id && e.children ? <div className="sub-cat">
                                {e?.children?.map((subs) => (
                                    <span onClick={() => navigateTo(subs.link)}>{subs.subcat}</span>
                                ))}
                            </div> : null
                        }

                    </div>
                ))
            }
            <span className="cat" onClick={handleLogout}>Logout</span>
        </div>

    )
}

export default Sider
