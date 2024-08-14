import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { server } from '../../main'
import axios from 'axios'
import { RxCross1 } from "react-icons/rx";
import { UserContext } from '../../context/userContext'


const AddAdminUser = () => {
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
    const [openPopUp, setOpenPopUp] = useState(false)
    const [afterSubText, setAfterSubText] = useState(false)
    const [uti, setUti] = useState(0)
    const [nsdl, setNsdl] = useState(0)
    const [slablist, setSlabList] = useState([])
    const [slabid, setSlabId] = useState([])
    const usernamecreate = "RT-" + (Math.floor(Math.random() * (900000 - 10000 + 1)) + 10000);
    const upiPayment = "Upi Payment Only"
    const navigateTo = useNavigate()
    const { user } = useContext(UserContext)
    const accData = [
        {
            type: "Retailer",
            price: "599"
        },
        {
            type: "Distributor",
            price: "899"
        },
        // Reserve for superdistributor
    ]
    const handleType = (m) => {
        setAccPrice(m.price)
        setAccType(m.type)
        setUnder("admin")
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${server}/auth/secondaryregister`, {
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
            setAfterSubText(true)
            setOpenPopUp(true)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const handleMargins = async () => {
        try {
            const res = await axios.put(`${server}/commission/updatemargin/${username}`, { nsdl, uti }, { withCredentials: true })
            toast.success(res.data.message)
            setOpenPopUp(false)
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }

    const getslabs = async () => {
        try {
            const res = await axios.get(`${server}/commission/slabs/${user?.username}`, { withCredentials: true })
            console.log(res.data.response)
            setSlabList(res.data.response)

        } catch (error) {
            console.log(error)
        }
    }

    const addSlab = async () => {
        try {
            const res = await axios.put(`${server}/commission/updateslab/${username}`, {
                userId: username,
                slab: slabid.slab,
                vodafone: slabid.vodafone,
                jio: slabid.jio,
                bsnl: slabid.bsnl,
                airtel: slabid.airtel,
                idea: slabid.idea,
                uti: slabid.uti,
                nsdl: slabid.nsdl,

            }, { withCredentials: true })
            toast.success(res.data.message)
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }

    useEffect(() => {
        getslabs()
    }, [])

    return (
        <div className='add-admin-user'>
            {
                openPopUp ? <div className="commission-update">
                    <div className="cross">
                        <RxCross1 onClick={() => setOpenPopUp(false)} />
                    </div>
                    <h1>Manage Your Margins</h1>
                    <div className='comm-form'>
                        <input type="number" placeholder='NSDL Pan Rate' onChange={(e) => setNsdl(e.target.value)} />
                        <input type="number" placeholder='UTI Pan Rate' onChange={(e) => setUti(e.target.value)} />
                        <button onClick={handleMargins}>ADD MARGINS</button>
                        <span>OR</span>
                        <div className='slab'>
                            <label>Select Margin Slab :</label>
                            <div className="buttons">
                                {
                                    slablist.map((e) => (
                                        <button className='slab-butt' onClick={() => setSlabId(e)}>{e?.slab}</button>
                                    ))
                                }

                            </div>
                        </div>
                        <div className="buttons">
                            <button onClick={addSlab}>ADD SLAB</button>
                            <button onClick={() => setOpenPopUp(false)}>Set As Default</button>
                        </div>
                    </div>
                </div> : null
            }

            <h1>Create Users</h1>
            <div className="formsec">
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
                    {
                        afterSubText ? <div className="reg-detail">
                            <h2>New User UserName - {username}</h2>
                            <h2>New User Password - {username}</h2>
                            <h4>***Change the password after Login</h4>
                        </div> : null
                    }

                </form>
            </div>
        </div>
    )
}

export default AddAdminUser
