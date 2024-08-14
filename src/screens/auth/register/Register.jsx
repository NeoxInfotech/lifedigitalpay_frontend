import React, { useState } from 'react'
import axios from "axios"
import "./styles.scss"
import { server } from '../../../main'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [accprice, setAccPrice] = useState('')
    const [acctype, setAccType] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [state, setState] = useState('')
    const [company, setComany] = useState('')
    const [adhaar, setAdhaar] = useState('')
    const [pan, setPan] = useState('')
    const [under, setUnder] = useState('')
    const [username, setUserName] = useState('')
    const usernamecreate = "RT-" + (Math.floor(Math.random() * (900000 - 10000 + 1)) + 10000);
    const upiPayment = "Upi Payment Only"
    const navigateTo = useNavigate()
    const accData = [
        {
            type: "Retailer",
            price: "599"
        },
        {
            type: "Distributor",
            price: "899"
        },
        //   reserved for super distributor
    ]
    const handleType = (m) => {
        setAccPrice(m.price)
        setAccType(m.type)
        setUnder("admin")
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${server}/auth/register`, {
                name,
                username,
                password: username,
                address,
                pincode,
                mobile,
                email,
                state,
                company,
                adhaar,
                pan,
                acctype,
                accprice,
                under
            }, { withCredentials: true })
            toast.success(res.data.message)
            navigateTo("/")
            window.location.reload()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className='register'>
            <div className="head">
                <h1>Welcome to Life Digital Pay</h1>
                <span>Create account according to your prefered account types and get started</span>
            </div>
            <form className='form' onSubmit={handleRegister}>
                <div className="input-flex">
                    <input type="text" placeholder='FullName' onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder='UserName' value={username} onChange={() => setUserName(usernamecreate)} />
                </div>
                <div className="input-flex">
                    <input type="text" placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
                    <input type="text" placeholder='PinCode' onChange={(e) => setPincode(e.target.value)} />
                </div>
                <div className="input-flex">
                    <input type="text" placeholder='Mobile Number' onChange={(e) => setMobile(e.target.value)} />
                    <input type="text" placeholder='Email ID' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-flex">
                    <input type="text" placeholder='State' onChange={(e) => setState(e.target.value)} />
                    <input type="text" placeholder='Company Name' onChange={(e) => setComany(e.target.value)} />
                </div>
                <div className="input-flex">
                    <input type="text" placeholder='Aadhar' onChange={(e) => setAdhaar(e.target.value)} />
                    <input type="text" placeholder='PAN' onChange={(e) => setPan(e.target.value)} />
                </div>
                <div className="input-drops-flex">
                    <div className="drop">
                        <input type="text" placeholder='Select Account Type' defaultValue={acctype} />
                        <div className="links">
                            {
                                accData.map((m) => (
                                    <span onClick={() => handleType(m)} key={m.type}>{m.type}</span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="drop">
                        <input type="text" className='reg-input-auto' placeholder='Registration Charge' defaultValue={accprice} />
                    </div>
                    <div className="drop">
                        <input type="text" placeholder='Select Payment Type' defaultValue={upiPayment} />
                    </div>

                </div>
                <button className="button">Pay and Submit</button>
            </form>

        </div>
    )
}

export default Register
