import React, { useContext, useState } from 'react'
import mrecharge from "../../../assets/mobile-recharge.png"
import toast from 'react-hot-toast'
import { proveiderData } from './provider'
import axios from 'axios'
import "./styles.scss"
import { server } from '../../../main'
import { UserContext } from '../../../context/userContext'



const MobileRecharge = () => {
    const data = [
        {
            id: 1,
            amount: 299,
            data: "2 Gb",
            val: 28,
            call: "Unlimited"
        },
        {
            id: 2,
            amount: 399,
            data: "2.5 Gb",
            val: 28,
            call: "Unlimited"
        }
    ]
    const { user } = useContext(UserContext)
    const [mobile, setMobile] = useState('')
    const [provider, setProvider] = useState('')
    const [amount, setAmount] = useState('')
    const [orderId, setOrderId] = useState('')
    const [viewplans, setViewPlan] = useState(false)
    const [rechargedetails, setRechargeDetails] = useState([])

    // ***View and select plans functions
    const handleViewPlans = (e) => {
        e.preventDefault()
        console.log(mobile, provider)
        if (mobile.length === 0 || provider.length === 0) {
            toast.error("Please Enter Valid details first")
        } else {
            setViewPlan(true)
        }

    }
    const handleSelectPlans = (amount) => {
        setAmount(amount);
        setViewPlan(false)
    }




    const handleRecharge = async (e) => {
        e.preventDefault()
        const companyIdStv = proveiderData.filter(e => e.name === provider)
        const id = companyIdStv.map((e) => e.id)
        const prvdname = companyIdStv.map((e) => e.name)
        const stv = companyIdStv.map((e) => e.isStv)
        try {

            const res = await axios.post(`${server}/recharge/mobilerecharge/${user?._id}`, {
                mobile,
                amount,
                provider: id[0],
                stv: stv[0],
                prvdname: prvdname[0],
                balance: user?.wallet,
                userdetail: user?.username,
            }, { withCredentials: true })

            toast.success(res.data.message.response)
            setRechargeDetails(res.data.message)


        } catch (error) {
            toast.error("Some error has been occured: recharge failed")
        }
        console.log(rechargedetails)


    }

    return (
        <div className="recharge-service">
            <h2>Mobile Recharge</h2>
            <div className="recharge-img">
                <img src={mrecharge} alt="" />
            </div>
            <form className='recharge-form' onSubmit={handleRecharge}>
                <input type="text" placeholder='Enter Your Mobile number' onChange={(e) => setMobile(e.target.value)} value={mobile} />
                <div className='provider'>
                    <input type="text" placeholder='Enter Your Provider' onChange={(e) => setProvider(e.target.value)} value={provider} />
                    <div className="provd-names">
                        {
                            proveiderData.map((prov) => (
                                <span onClick={() => setProvider(prov.name)}>{prov.name}</span>
                            ))
                        }
                    </div>
                </div>
                <input type="text" placeholder='Add Amount' onChange={(e) => setAmount(e.target.value)} value={amount} />
                <div className='butt'>
                    <button onClick={handleViewPlans}>View Plans</button>
                    <button>Recharge</button>
                </div>
            </form>
            {
                viewplans ? <div className="plans">
                    <h2>Searching on mobile no - {mobile}</h2>
                    <h2>{provider} Prepaid</h2>
                    {
                        data.map(e => (
                            <div key={e.id} className="plan-list" onClick={() => handleSelectPlans(e.amount)}>
                                <span>Rs {e.amount}</span>
                                <span>Data - {e.data} Per day</span>
                                <span>Val- {e.val}days</span>
                                <span>Calls-  {e.call}</span>
                            </div>
                        ))
                    }



                </div> : null
            }
            {
                rechargedetails.length != 0 ?
                    <div className='reciept'>
                        <span>{rechargedetails.status}</span>
                        <span>{rechargedetails.response}</span>
                        <span>{rechargedetails.mobile_no}</span>
                        <span>{rechargedetails.amount}</span>
                        <span>{rechargedetails.tnx_id}</span>
                    </div> : null

            }


        </div>
    )
}

export default MobileRecharge

