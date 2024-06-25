import React, { useContext, useState } from 'react'
import axios from "axios"
import "./styles.scss"
import { UserContext } from '../../../context/userContext'
import { server } from '../../../main'
import toast from 'react-hot-toast'

const AddMoney = () => {
    const [amount, setAmount] = useState(0)
    const { user } = useContext(UserContext)
    const handleAddMoney = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${server}/wallet/addmoney/${user?._id}`, { amount }, { withCredentials: true })
            toast.success(res.data.message)
        } catch (error) {
            toast.error("Something went wrong")
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
        </div>
    )
}

export default AddMoney
