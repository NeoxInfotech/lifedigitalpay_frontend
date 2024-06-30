import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import utipan from "../../../../assets/utipan.png"
import { UserContext } from '../../../../context/userContext'
import axios from "axios"
import { server } from '../../../../main'
import toast from 'react-hot-toast'

const UtiCoupon = () => {
    const { user } = useContext(UserContext)
    const [url, setUrl] = useState('')

    const generateUti = async () => {
        try {
            const res = await axios.post(`${server}/uti/onboard/${user?.username}`, { withCredentials: true });
            toast.success(res.data.message)
            console.log(res.data.response)
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }

    const getLoginLink = async () => {
        try {
            const res = await axios.post(`${server}/uti/utilogin/${user?.username}`, { withCredentials: true })
            console.log(res.data.response)
            setUrl(res.data.url)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getLoginLink()
    }, [])
    return (
        <div className='uti-coupon'>
            {
                !user?.utiactive ? <div className="activation">
                    <img src={utipan} alt="" />
                    <h1>Generate Agent Id and Login to Uti Portal</h1>
                    <button onClick={generateUti} className="uti-gen">Generate Id</button>
                </div> :
                    <div className='uti-active-page'>
                        <div className="details">
                            <h1>PSA Login ID - {user?.username}</h1>
                            <h1>PSA Login Password - {user?.username}</h1>
                            <h1>PSA Login Link - <a href={url}>Link</a></h1>
                        </div>
                    </div>
            }

        </div>
    )
}

export default UtiCoupon
