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
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [pan, setPan] = useState('')
    const [adhaar, setAdhaar] = useState('')
    const [agentId, setAgentId] = useState('')
    const [userdetails, setUserDetails] = useState(false)
    const [userutiagent, setUserUtiagent] = useState('')
    const [userutiurl, setUserUtiUrl] = useState('')

    const generateUti = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${server}/uti/onboard/${user?.username}`, { withCredentials: true });
            toast.success(res.data.message)
            console.log(res.data.response)
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error)
        }

    }

    const generateUserUti = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${server}/uti/onboardauser/${user?.username}`, { name, mobile, email, address, state, city, pincode, pan, adhaar }, { withCredentials: true });
            toast.success(res.data.message)
            console.log(res.data.response)
            setAgentId(res.data.order)
            setUserDetails(true)
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error)
        }
    }

    const getuserPass = async () => {
        try {
            const res = await axios.post(`${server}/uti/utiloginuser/${agentId}`, { withCredentials: true })
            setUserUtiUrl(res.data.url)
        } catch (error) {
            console.log(error)
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
        getLoginLink();
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
                            <h2>Your UTI Details : -</h2>
                            <h4>PSA Login ID - {user?.username}</h4>
                            <h4>PSA Login Password - {user?.username}</h4>
                            <h4>PSA Login Link - <a href={url}>Link</a></h4>
                        </div>
                        <div className="add-user">
                            <img src={utipan} alt="" className='utipanadd' />
                            <h2>Onboard an agent :-</h2>
                            <form onSubmit={generateUserUti}>
                                <div className='divide-input'>
                                    <input type="text" placeholder='Name of user' onChange={(e) => setName(e.target.value)} />
                                    <input type="text" placeholder='Mobile Number' onChange={(e) => setMobile(e.target.value)} />
                                </div>
                                <div className='divide-input'>
                                    <input type="email" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} />
                                    <input type="text" placeholder='Enter Your Address' onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className='divide-input'>
                                    <input type="text" placeholder='Enter State' onChange={(e) => setState(e.target.value)} />
                                    <input type="text" placeholder='Enter City' onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div className='divide-input'>
                                    <input type="number" placeholder='Enter PinCode' onChange={(e) => setPincode(e.target.value)} />
                                    <input type="text" placeholder='Enter Pan' onChange={(e) => setPan(e.target.value)} />
                                    <input type="text" placeholder='Enter Aadhaar' onChange={(e) => setAdhaar(e.target.value)} />
                                </div>
                                <button>Submit</button>
                            </form>
                            {
                                userdetails ? <div className="user-details">
                                    <h2>Agent Details After submission - </h2>
                                    <span>PSA login Id-</span><span>{agentId}</span>
                                    <span>PSA login Password-</span><span>{agentId}</span>
                                    <span>PSA login Link-</span><a href={userutiurl}>Your UTI Login Link</a>
                                    <button onClick={getuserPass}>Get User Password</button>
                                </div> : null
                            }

                        </div>
                    </div>
            }

        </div>
    )
}

export default UtiCoupon
