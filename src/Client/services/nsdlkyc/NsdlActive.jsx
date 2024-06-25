import axios from 'axios'
import React, { useContext } from 'react'
import { server } from '../../../main'
import { UserContext } from '../../../context/userContext'
import toast from 'react-hot-toast'
import "./styles.scss"

const NsdlActive = ({ setActivePage }) => {
    const { user } = useContext(UserContext)
    const activeService = async () => {
        try {
            const res = await axios.post(`${server}/nsdl/activation/${user?.username}`, { withCredentials: true })
            toast.success(res.data.message)
            setActivePage(false)

        } catch (error) {
            toast.error("Something Went Wrong , Please Check wallet balance or contact service provide", { duration: 4000 })
        }
    }
    return (
        <div className='nsdl-active'>
            <h2>Please Active your Nsdl Services</h2>
            <span>Pay Rs-199 as a registration charge</span>
            <button className='active' onClick={activeService}>Active</button>
        </div>
    )
}

export default NsdlActive
