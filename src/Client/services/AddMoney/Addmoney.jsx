import React, { useContext, useState } from 'react'
import axios from "axios"
import "./styles.scss"
import { UserContext } from '../../../context/userContext'
import { server } from '../../../main'
import demoqr from "./demoqr.png"
import toast from 'react-hot-toast'

const AddMoney = () => {
    const [amount, setAmount] = useState(0)
    const [orderid, setOrderId] = useState('')
    const [utr, setUtr] = useState('')
    const [qr, setQr] = useState('')
    const [payconfirm, setPayConfirm] = useState(false)
    const { user } = useContext(UserContext)
    const handleAddMoney = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${server}/wallet/paymentcreate/${user?._id}`, { amount }, { withCredentials: true })
            toast.success(res.data.message)
            console.log(res.data.response)
            setOrderId(res.data.orderid)
            setQr(res.data.qr)
            setPayConfirm(true)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    const confirmAndAdd = async () => {
        try {
            const res = await axios.post(`${server}/wallet/addmoney/${user?._id}`, {
                utr, orderid
            }, { withCredentials: true })
            toast.success(res.data.message)
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error)
        }
    }
    return (
        <div className='add-money'>
            <h1>ADD MONEY TO YOUR WALLET</h1>
            <form onSubmit={handleAddMoney}>
                <input type="number" placeholder='Add Money to your wallet' onChange={(e) => setAmount(e.target.value)} />
                <button>Add Money</button>
            </form>
            <span>*** Important Information - Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores qui amet natus explicabo reprehenderit ea doloremque magnam. Accusamus, nostrum iste. Corporis et harum molestias iure recusandae suscipit asperiores deleniti alias?</span>
            {
                payconfirm ? <div className="wallet-qr">
                    <div className="qr-img">
                        <img src={qr} alt="" height={200} width={200} />
                        <h4>Scan the Qr code and pay the amount, <br /> get the UTR number and verify it to confirm your payment</h4>
                    </div>
                    <div className="utr">
                        <h3>Enter UTR number after scan</h3>
                        <input type="number" placeholder='Enter the UTR Number' onChange={(e) => setUtr(e.target.value)} />
                        <button onClick={confirmAndAdd}>Confirm</button>
                    </div>

                </div>
                    : null
            }

        </div>
    )
}

export default AddMoney
