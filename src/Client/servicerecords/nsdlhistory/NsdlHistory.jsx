import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import axios from "axios"
import { server } from '../../../main'
import { UserContext } from '../../../context/userContext'
import NsdlActive from '../../services/nsdlkyc/NsdlActive'
import toast from 'react-hot-toast'

const NsdlHistory = () => {
    const { user } = useContext(UserContext)
    const [historydata, setHistoryData] = useState([])
    const [activepage, setActivePage] = useState(true)
    const [search, setSearch] = useState('')
    const [currentpage, setCurrentPage] = useState(1)
    const fetchNsdlHistory = async () => {
        const res = await axios.get(`${server}/nsdl/history/${user?.username}`, { withCredentials: true })
        setHistoryData(res.data.message)
    }
    const searchByUser = () => {
        const filteredhistory = historydata.filter(f => f.createdAt.slice(0, 10) === search)
        setHistoryData(filteredhistory)
    }

    const checkAck = async (order) => {
        console.log(order)
        try {
            const res = await axios.post(`${server}/nsdl/ackgenerate/${user?.usename}`, { order }, { withCredentials: true })
            toast(res.data.message)
        } catch (error) {
            toast.error("Error: Something Went Wrong")
        }
    }



    const recordsPerPage = 5;
    const lastIndex = currentpage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = historydata.slice(firstIndex, lastIndex)
    const npage = Math.ceil(historydata.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const prevPage = () => {
        if (currentpage !== firstIndex) {
            setCurrentPage(currentpage - 1)
        }

    }
    const changeCPage = (id) => {
        setCurrentPage(id)
    }
    const nextPage = () => {
        if (currentpage !== lastIndex) {
            setCurrentPage(currentpage + 1)
        }
    }
    useEffect(() => {
        fetchNsdlHistory();
    }, [])
    return (
        <div className='wallet-history'>
            <h1>YOUR NSDL HISTORY</h1>
            {
                !user?.nsdlactive ? <NsdlActive setActivePage={setActivePage} /> :
                    <div className="table">
                        <div className="search">
                            <input type="date" placeholder='Date' onChange={(e) => setSearch(e.target.value)} />
                            <button onClick={searchByUser} >Enter</button>
                        </div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>User Details</th>
                                    <th>OrderId</th>
                                    <th>Number</th>
                                    <th>Name</th>
                                    <th>Ref- Id</th>
                                    <th>Ack No.</th>
                                    <th>Balance</th>
                                    <th>Status</th>
                                </tr>
                                {

                                    historydata.map((h) => (
                                        <tr className={`${h.status === 'Failure' ? 'fail' : ""}`}>
                                            <td className='udetail'><span>{h.userId}</span><span>{h.createdAt.slice(0, 10)}</span></td>
                                            <td>{h.order}</td>
                                            <td>{h.mobile}</td>
                                            <td>{h.firstname} {h.lastname}</td>
                                            <td>{h.ref}</td>
                                            <td>{h.ack.length === 0 ? <button onClick={() => checkAck(h.order)}>Check</button> : h.ack}</td>
                                            <td>{h.balance}</td>
                                            <td>{h.status}</td>
                                        </tr>
                                    )).slice(firstIndex, lastIndex)
                                }

                            </tbody>
                        </table>
                        <div className="pagination">
                            <div className="prev">
                                <span onClick={prevPage}>Previous</span>
                            </div>
                            {
                                numbers.map((n, i) => (
                                    <span key={i} className={`page-item ${currentpage === n ? 'active' : ''}`} onClick={() => changeCPage(n)}>
                                        {n}
                                    </span>
                                ))
                            }
                            <div className="next">
                                <span onClick={nextPage}>Next</span>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default NsdlHistory

