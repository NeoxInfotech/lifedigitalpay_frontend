import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import axios from 'axios'
import { server } from '../../../main'
import { UserContext } from '../../../context/userContext'
import toast from 'react-hot-toast'

const MarginSlab = () => {
    const { user } = useContext(UserContext)
    const [slab, setSlab] = useState('')
    const [openlist, setOpenList] = useState(false)
    const [vodafone, setVodafone] = useState(2)
    const [jio, setJio] = useState(3)
    const [bsnl, setBsnl] = useState(2)
    const [airtel, setAirtel] = useState(2)
    const [idea, setIdea] = useState(1)
    const [uti, setUti] = useState(65)
    const [nsdl, setNsdl] = useState(90)
    const [userslabs, setUserSlabs] = useState([])
    const [serial, setSerial] = useState(0)
    const commissions = [
        {
            name: "Vodafone",
            comm: vodafone,
            setcomm: setVodafone,
            status: "Success",
        },
        {
            name: "Jio",
            comm: jio,
            setcomm: setJio,
            status: "Success",
        },
        {
            name: "Bsnl",
            comm: bsnl,
            setcomm: setBsnl,
            status: "Success",
        },
        {
            name: "Airtel",
            comm: airtel,
            setcomm: setAirtel,
            status: "Success",
        },
        {
            name: "Idea",
            comm: idea,
            setcomm: setIdea,
            status: "Success",
        },
        {
            name: "UTI Pan",
            comm: uti,
            setcomm: setUti,
            status: "Success",
        },
        {
            name: "NSDL Pan",
            comm: nsdl,
            setcomm: setNsdl,
            status: "Success",
        },
    ]
    const submitslab = async () => {
        try {
            const res = await axios.post(`${server}/commission/addslab/${user?.username}`, { slab, vodafone, jio, bsnl, airtel, idea, uti, nsdl }, { withCredentials: true })
            toast.success(res.data.message)
            setOpenList(false)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    const getslabs = async () => {
        try {
            const res = await axios.get(`${server}/commission/slabs/${user?.username}`, { withCredentials: true })
            console.log(res.data.response)
            setUserSlabs(res.data.response)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getslabs()
    }, [])
    return (
        <div className='marginslab'>
            <h2>Create Your margin slab</h2>
            <div className="slab-box">
                <div className="create-box">
                    <input type="text" placeholder='Enter The Slab Name' onChange={(e) => setSlab(e.target.value)} />
                    <button className='createbtn' onClick={() => setOpenList(true)}>Create Slab</button>
                </div>
                {
                    openlist ?
                        <div className='commission-list'>
                            <h3>{slab}</h3>
                            <div className="table">
                                <table>
                                    <tr>
                                        <th>Operator</th>
                                        <th>Commission</th>
                                    </tr>

                                    {
                                        commissions.map((r) => (
                                            <tr>
                                                <td>{r.name}</td>
                                                <td><input type="text" value={r.comm} onChange={(e) => r.setcomm(e.target.value)} /></td>
                                            </tr>
                                        ))
                                    }
                                </table>
                                <button onClick={submitslab}>Add Slab</button>
                            </div>
                        </div> : null
                }

                <div className="table-slab">
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>User</th>
                            <th>Slab Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                        {
                            userslabs.map((e) => (
                                <tr>
                                    <td>{e?.createdAt?.slice(0, 10)}</td>
                                    <td>{e?.userId}</td>
                                    <td>{e?.slab}</td>
                                    <td>{e ? "Success" : "Failure"}</td>
                                    <td>{<button disabled={e.slab === "Default" ? true : false}>Action</button>}</td>
                                </tr>
                            ))
                        }

                    </table>
                </div>
            </div>

        </div>
    )
}

export default MarginSlab
