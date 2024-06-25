import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import toast from 'react-hot-toast'
import axios from 'axios'
import { server } from '../../../main'
import { UserContext } from '../../../context/userContext'


const CommissionList = () => {
    const { user } = useContext(UserContext)
    const operators = ["Vodafone", "Jio", "Bsnl", "Airtel", "Idea", "UTI Pan", "NSDL Pan"]
    const [allcomm, setAllComm] = useState([])
    const getCommissionList = async () => {
        try {
            const res = await axios.get(`${server}/commission/getcommission/${user?.username}`, { withCredentials: true })
            setAllComm(res.data.message)
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    useEffect(() => {
        getCommissionList();

    }, [])
    const commissions = [
        {
            name: "Vodafone",
            comm: `${allcomm.vodafone}%`,
            status: "Success",
        },
        {
            name: "Jio",
            comm: `${allcomm.jio}%`,
            status: "Success",
        },
        {
            name: "Bsnl",
            comm: `${allcomm.bsnl}%`,
            status: "Success",
        },
        {
            name: "Airtel",
            comm: `${allcomm.airtel}%`,
            status: "Success",
        },
        {
            name: "Idea",
            comm: `${allcomm.idea}%`,
            status: "Success",
        },
        {
            name: "UTI Pan",
            comm: allcomm.uti,
            status: "Success",
        },
        {
            name: "NSDL Pan",
            comm: allcomm.nsdl,
            status: "Success",
        },
    ]
    return (
        <div className='commission-list'>
            <h3>My Commission</h3>
            <div className="table">
                <table>
                    <tr>
                        <th>Operator</th>
                        <th>Commission</th>
                        <th>Status</th>
                    </tr>
                    {
                        commissions.map((c) => (
                            <tr>
                                <td>{c.name}</td>
                                <td>{c.comm}</td>
                                <td>{c.status}</td>
                            </tr>
                        ))
                    }


                </table>
            </div>
        </div>
    )
}

export default CommissionList
