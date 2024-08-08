import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import axios from "axios"
import toast from 'react-hot-toast'
import UpdateModal from './UpdateModal'
import { server } from '../../../main'
import { UserContext } from '../../../context/userContext'

const DistUserList = () => {
    const [userData, setUserData] = useState([])
    const [updateModal, setUpdateModal] = useState(false)
    const [updateUser, setUpdateUser] = useState([])
    const [transferamount, setTransferAmount] = useState()
    const [activate, setActivate] = useState(true)
    const { user } = useContext(UserContext)

    const fetchUsers = async () => {
        try {
            const users = await axios.get(`${server}/user/distusers/${user?.username}`, { withCredentials: true })
            setUserData(users.data.message);
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    const HandleTransfer = async (u) => {
        try {
            const res = await axios.post(`${server}/user/transfermoney/${u}`, { transferamount }, { withCredentials: true })
            toast.success(res.data.message)
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error)
        }

    }
    const handleUpdate = (u) => {
        setUpdateModal(true)
        setUpdateUser(u)
    }

    const getChangesActions = (e) => {
        if (e === "Active") {
            setActivate(true)
        } else {
            setActivate(false)
        }
    }

    const handleActions = async (u) => {

        try {

            const res = await axios.post(`${server}/user/accountaction/${u}`, { activate }, { withCredentials: true })
            toast.success(res.data.message)
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error)
        }

    }

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <div className='admin-user-list'>
            <h1>List Of Users</h1>
            <div className='container'>
                <table>
                    <tr>
                        <th>VLE Details</th>
                        <th>ADDRESS</th>
                        <th>DOCUMENTS</th>
                        <th>TYPE/DATE</th>
                        <th>CREATED</th>
                        <th>NSDL ACTIVE</th>
                        <th>UTI REG CODE</th>
                        <th>BALANCE</th>
                        <th>TRANSFER</th>
                        <th>UPDATE</th>
                        <th>Action</th>
                    </tr>
                    {
                        userData?.map((user) => (
                            <tr >
                                <td>
                                    <p>{user.name}</p>
                                    <p>{user.username}</p>
                                    <p>{user.mobile}</p>
                                    <p>{user.email}</p>
                                </td>
                                <td>
                                    <p>{user.address}</p>
                                    <p>{user?.address2}</p>

                                </td>
                                <td>
                                    <p>{user.adhaar}</p>
                                    <p>{user.pan}</p>
                                </td>
                                <td>
                                    <p>{user.acctype}</p>
                                    <p style={{ backgroundColor: "#6789EF", color: "white", padding: 3 }}>Under - {user.under}</p>
                                    <p>{user.createdAt.slice(0, 10)}</p>
                                </td>
                                <td>
                                    <p>{user.under}</p>
                                </td>
                                <td>
                                    <p>{user.nsdlactive ? "Yes" : "No"}</p>
                                </td>
                                <td>
                                    <p>{user.utiactive ? "Active" : "Not-Active"}</p>
                                    <p>{user?.utireg}</p>
                                </td>
                                <td>
                                    <p>Rs . {user.wallet}</p>
                                </td>
                                <td>
                                    <input type="text" placeholder='Amount' onChange={(e) => setTransferAmount(e.target.value)} />
                                    <button onClick={() => HandleTransfer(user.username)}>Submit</button>
                                </td>
                                <td>
                                    <button onClick={() => handleUpdate(user)}>Update User</button>
                                </td>
                                <td>
                                    <div className="apprv">
                                        <select name="drops" defaultValue={user.active === true ? "Active" : "Inactive"} onChange={(e) => getChangesActions(e.target.value)}>
                                            <option>Active</option>
                                            <option >Inactive</option>

                                        </select>
                                    </div>

                                    <button onClick={() => handleActions(user.username)}>Submit</button>
                                </td>


                            </tr>
                        ))
                    }


                </table>
            </div>
            {
                updateModal ? <UpdateModal updateUser={updateUser} setUpdateModal={setUpdateModal} /> : null
            }

        </div>
    )
}

export default DistUserList
