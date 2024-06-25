import React, { useContext } from 'react'
import "./styles.scss"
import upi from "../../assets/upiwallet.jpg"
import axios from 'axios'
import { server } from '../../main'
import { UserContext } from '../../context/userContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const OneTimePayment = () => {
    const { user } = useContext(UserContext)
    const navigateTo = useNavigate()
    const updateAccountToActive = async () => {
        try {
            const res = await axios.post(`${server}/auth/registerpay/${user?._id}`, { withCredentials: true })
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
                <input type="number" placeholder='Enter Your Number' />
                <input type="text" placeholder='Enter Your Details' />
                <input type="text" placeholder='Enter Your Company' />
                <input type="username" placeholder='Enter Your UserName' />
                <button onClick={updateAccountToActive}>Add Money</button>
            </div>
        </div>
    )
}

export default OneTimePayment
