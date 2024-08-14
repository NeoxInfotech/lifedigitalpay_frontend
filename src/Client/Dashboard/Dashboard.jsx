import React, { useContext, useEffect, useState } from 'react'
import DashboarBox from '../../components/client/dashboardbox/DashboarBox'
import "./styles.scss"
import { dashboardconstant, retaildashboard } from '../../data/dashboardData'
import { useNavigate } from 'react-router-dom'
import { server } from '../../main'
import axios from 'axios'
import { UserContext } from '../../context/userContext'






const Dashboard = () => {
    const [nsdltoday, setNsdlToday] = useState([])
    const [utitoday, setUtiToday] = useState([])
    const [rechargetoday, setRechargeToday] = useState([])
    const [retails, setRetails] = useState([])
    const [dist, setDist] = useState([])
    const { user } = useContext(UserContext)
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1; // months from 1-12
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    // Using padded values, so that 2023/1/7 becomes 2023/01/07
    const pMonth = month.toString().padStart(2, "0");
    const pDay = day.toString().padStart(2, "0");
    const newPaddedDate = `${year}-${pMonth}-${pDay}`;
    const userdate = user?.createdAt.slice(0, 10)


    const navigateTo = useNavigate()

    const nsdlRecords = async () => {
        const res = await axios.get(`${server}/nsdl/history/${user?.username}`, { withCredentials: true })
        const filtered = res.data.response.filter(e => e.createdAt.slice(0, 10) === newPaddedDate)
        setNsdlToday(filtered)
    }
    const utiRecords = async () => {
        const res = await axios.get(`${server}/uti/utihistory/${user?.username}`, { withCredentials: true })
        const filtered = res.data.response.filter(e => e.createdAt.slice(0, 10) === newPaddedDate)
        setUtiToday(filtered)

    }
    const rechargeRecords = async () => {
        const res = await axios.get(`${server}/recharge/rechargehistory/${user?.username}`, { withCredentials: true })
        const filtered = res.data.response.filter(e => e.createdAt.slice(0, 10) === newPaddedDate)
        setRechargeToday(filtered)

    }


    const getClients = async () => {
        if (user?.acctype === "Admin") {
            const res = await axios.get(`${server}/user/allusers`, { withCredentials: true })
            const retailers = res.data.message.filter(e => e?.acctype === "Retailer")
            const distributors = res.data.message.filter(e => e?.acctype === "Distributor")
            setRetails(retailers)
            setDist(distributors)
        } else {
            const res = await axios.get(`${server}/user/distusers/${user?.username}`, { withCredentials: true })
            const retailers = res.data.message.filter(e => e?.acctype === "Retailer")
            const distributors = res.data.message.filter(e => e?.acctype === "Distributor")
            setRetails(retailers)
            setDist(distributors)
        }

    }


    useEffect(() => {
        nsdlRecords()
    }, [])
    useEffect(() => {
        utiRecords()
    }, [])
    useEffect(() => {
        rechargeRecords()
    }, [])
    useEffect(() => {
        getClients()
    }, [])

    console.log(utitoday)
    return (
        <div className='dashboard'>
            {
                dashboardconstant.map((content) => (
                    <DashboarBox bgColor={"#fff"} text={content.text} src={content.img} onClick={() => navigateTo(content.linkto)} />
                ))
            }
            <div className="dashboard">
                <div className='dashboard-box' style={{ background: "#fc4242", color: "#fff" }}>
                    <h4>NSDL KYC TODAY</h4>
                    <span>{nsdltoday.length}</span>
                </div>
                <div className='dashboard-box' style={{ background: "#5151ff", color: "#fff" }}>
                    <h4>UTI Onboarding Today</h4>
                    <span>{utitoday.length}</span>
                </div>
                <div className='dashboard-box' style={{ background: "#bf51ff", color: "#fff" }}>
                    <h4>Recharge Today</h4>
                    <span>{rechargetoday.length}</span>
                </div>
            </div>
            {
                user?.acctype === "Admin" || user?.acctype === "Distributor" ? <div className="dashboard">
                    <div className='dashboard-box' style={{ background: "#fc4242", color: "#fff" }}>
                        <h4>Total Retailers</h4>
                        <span>{retails.length}</span>
                    </div>
                    <div className='dashboard-box' style={{ background: "#51ff5a", color: "#fff" }}>
                        <h4>Total Distributors</h4>
                        <span>{dist.length}</span>
                    </div>

                </div> : null
            }

        </div>
    )
}

export default Dashboard
