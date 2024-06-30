import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { server } from '../../main'
import toast from 'react-hot-toast'

const Profile = () => {
    const { user } = useContext(UserContext)
    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [state, setState] = useState('')
    const [company, setCompany] = useState('')
    const [initpassword, setInitPassword] = useState('')
    const [password, setPassword] = useState('')
    const fetchUser = () => {
        setName(user?.name);
        setUserName(user?.username);
        setAddress(user?.address);
        setMobile(user?.mobile);
        setEmail(user?.email);
        setState(user?.state);
        setPincode(user?.pincode);
        setCompany(user?.company);
    }
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${server}/user/profile/${user?._id}`, { name, address, pincode, mobile, email, state, company }, { withCredentials: true })
            await toast.success("Updated Successfully")
        } catch (error) {
            toast.error("Something Went Wrong")
        }

    }
    useEffect(() => {
        fetchUser()
    }, [])
    const handlePasswordUpdate = async () => {
        try {
            if (initpassword != password) {
                toast.error("Sorry Passwords Dosen't Match, please try again")
            } else {
                await axios.put(`${server}/user/${user?._id}`, { password }, { withCredentials: true });
                toast.success("Password has been successfully updated")
            }
        } catch (error) {
            toast.error("Something Went Wrong")
        }

    }
    return (
        <div className='profile'>
            <h1>{user?.name}'s Profile</h1>
            <div className="allform">
                <div className='form' >
                    <div className='form-row'>
                        <input
                            type="text"
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className='form-row'>
                        <input t
                            ype="text"
                            placeholder='PinCode'
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Mobile Number'
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                    <div className='form-row'>
                        <input
                            type="email"
                            placeholder='Email Id'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='State'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div className='form-row'>
                        <input
                            type="text"
                            placeholder='Comapany Name'
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='UserName (Cannot be Updated)'
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <button className='update-button' onClick={handleProfileUpdate}>Update Profile</button>
                </div>
                <div className='form'>
                    <div className='form-row'>
                        <input type="password" placeholder='Password' onChange={(e) => setInitPassword(e.target.value)} />
                        <input type="password" placeholder='Confirm Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='update-button' onClick={handlePasswordUpdate}>
                        Update Password
                    </button>
                </div>
            </div >
        </div >
    )
}

export default Profile
