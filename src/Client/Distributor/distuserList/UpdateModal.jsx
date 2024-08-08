import React, { useEffect, useState } from 'react'
import "./styles.scss"
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';
import { server } from '../../../main';
import toast from 'react-hot-toast';

const UpdateModal = ({ updateUser, setUpdateModal }) => {
    console.log(updateUser)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [nsdl, setNsdl] = useState(90)
    const [uti, setUti] = useState(65)
    const fetchUser = () => {
        setUsername(updateUser?.username)
        setName(updateUser.name)
        setEmail(updateUser.email)
        setMobile(updateUser.mobile)
    }
    const Handleupdate = async () => {
        try {
            const res = await axios.put(`${server}/user/profile/${updateUser._id}`, {
                username,
                name,
                email,
                mobile
            }, { withCredentials: true })
            toast.success("User Has been successfully updated")
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    const updateMargin = async () => {
        try {
            const res = await axios.put(`${server}/commission/updatemargin/${updateUser.username}`, { nsdl, uti }, { withCredentials: true })
            toast.success(res.data.message)
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <div className="update-user">
            <div className='cross-div'>
                <RxCross1 className='cross' onClick={() => setUpdateModal(false)} />
            </div>
            <h2>Update User - {updateUser.name}</h2>
            <div className="details">
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder='FullName' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder='Mobile' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                <button onClick={Handleupdate}>Save Chagnes</button>
            </div>
            <div className="details">
                <input type="text" placeholder='Nsdl Rate' onChange={(e) => setNsdl(e.target.value)} />
                <input type="text" placeholder='Uti Rate' onChange={(e) => setUti(e.target.value)} />
                <button onClick={updateMargin}>Save Changes</button>
            </div>
        </div>
    )
}

export default UpdateModal
