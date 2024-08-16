import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import axios from "axios"
import { server } from '../../../main'
import { UserContext } from '../../../context/userContext'

const WalletHistory = () => {
    const { user } = useContext(UserContext)
    const [historydata, setHistoryData] = useState([])
    const [search, setSearch] = useState('')
    const [currentpage, setCurrentPage] = useState(1)
    const fetchRechargeHistory = async () => {
        const res = await axios.get(`${server}/recharge/rechargehistory/${user?.username}`, { withCredentials: true })
        setHistoryData(res.data.response)
    }
    const searchByUser = () => {
        const filteredhistory = historydata.filter(f => f.createdAt.slice(0, 10) === search)
        setHistoryData(filteredhistory)
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
        fetchRechargeHistory();
    }, [search])
    return (
        <div className='wallet-history'>
            <h1>YOUR RECHARGE HISTORY</h1>
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
                            <th>Operator</th>
                            <th>Amount</th>
                            <th>Balance</th>
                            <th>Ref Id</th>
                            <th>Status</th>
                        </tr>
                        {
                            historydata.map((h) => (
                                <tr className={`${h.status === 'failure' ? 'fail' : ""}`}>
                                    <td className='udetail'><span>{h.userdetails}</span>{h.createdAt.slice(0, 10)}</td>
                                    <td>{h.orderId}</td>
                                    <td>{h.number}</td>
                                    <td>{h.operator}</td>
                                    <td>{h.amount}</td>
                                    <td>{h.balance}</td>
                                    <td>{h.refid}</td>
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
        </div>
    )
}

export default WalletHistory

