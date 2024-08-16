import React, { useContext, useState } from 'react'
import "./styles.scss"
import upi from "../../assets/upiwallet.jpg"
import axios from 'axios'
import { server } from '../../main'
import { UserContext } from '../../context/userContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import demoqr from "./demoqr.png"

const OneTimePayment = () => {
    const { user } = useContext(UserContext)
    const [qrcreate, setQrCreate] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [qr, setQr] = useState('')
    const [orderid, setOrderId] = useState('')
    const [utr, setUtr] = useState('')
    const amount = 1
    const navigateTo = useNavigate()
    const updateAccountToActive = async () => {
        try {
            const res = await axios.post(`${server}/auth/transaction/${user?._id}`, { mobile, email, name, amount }, { withCredentials: true })
            toast.success(res.data.message)
            console.log(res.data.response)
            setQr(res.data.qr)
            setOrderId(res.data.orderid)
            setQrCreate(true)
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    const completeVerify = async () => {
        try {
            const res = await axios.post(`${server}/auth/registerpay/${user?._id}`, { orderid, utr }, { withCredentials: true })
            toast.success(res.data.message)
            navigateTo("/")
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    return (
        <div className='onetimepay'>
            <h1>Pay Your Registration Money To access all ervices</h1>
            <img src={upi} alt="" />
            <div className="pay-money">
                {/* All the money add details adds here */}
                <input type="number" placeholder='Enter Your Number' onChange={(e) => setMobile(e.target.value)} />
                <input type="text" placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
                <button onClick={updateAccountToActive}>Add Money</button>
            </div>
            {
                qrcreate ? <div className="qr-pay">
                    <div className="qr">
                        <img src={qr} alt="" />
                        <h4>Scan the Qr and Pay Your Registration Amount, After Payment verify Your UTR Number</h4>
                    </div>
                    <div className="utr">
                        <input type="text" placeholder='Enter UTR Number' onChange={e => setUtr(e.target.value)} />
                        <button onClick={completeVerify}>Verify</button>
                    </div>
                </div> : null
            }

        </div>
    )
}

export default OneTimePayment
