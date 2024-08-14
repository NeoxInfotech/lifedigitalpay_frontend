import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { server } from '../../../main'
import { UserContext } from '../../../context/userContext'
import NsdlActive from '../../services/nsdlkyc/NsdlActive'
import toast from 'react-hot-toast'
import utipan from "../../../assets/utipan.png"
import { Link } from 'react-router-dom'
import "./styles.scss"

const UtiHistory = () => {
    const { user } = useContext(UserContext)
    const [historydata, setHistoryData] = useState([])
    const [activepage, setActivePage] = useState(true)
    const [search, setSearch] = useState('')
    const [currentpage, setCurrentPage] = useState(1)
    const fetchUtiHistory = async () => {
        const res = await axios.get(`${server}/uti/utihistory/${user?.username}`, { withCredentials: true })
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
        fetchUtiHistory();
    }, [search])
    return (
        <div className='wallet-history'>
            <h1>YOUR UTI HISTORY</h1>
            {
                !user?.utiactive ? <div className="activation">
                    <img src={utipan} alt="" />
                    <h1>Generate Agent Id and Login to Uti Portal</h1>
                    <Link to={"/utiekyc"} className="uti-gen">Generate Id</Link>
                </div> :
                    <div className="table">
                        <div className="search">
                            <input type="date" placeholder='Date' onChange={(e) => setSearch(e.target.value)} />
                            <button onClick={searchByUser} >Enter</button>
                        </div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>User Id</th>
                                    <th>Onboard User Details</th>
                                    <th>Address</th>
                                    <th>Full Address</th>
                                    <th>Pan No.</th>
                                    <th>Url Link</th>
                                    <th>User Balance</th>
                                    <th>Status</th>
                                </tr>
                                {

                                    historydata.map((h) => (
                                        <tr className={`${h?.status === 'Failure' ? 'fail' : ""}`}>
                                            <td>{h?.userId} <br /> {h?.createdAt.slice(0, 10)}</td>
                                            <td>{h?.name} <br /> {h?.mobile} <br /> {h?.email_id}</td>
                                            <td>{h?.address}, {h?.pincode}</td>
                                            <td>{h?.state} </td>
                                            <td>{h?.pan_no} </td>
                                            {h?.url ? <td><a href={h?.url}>URL Link</a></td> : <td>Not Created Yet</td>}
                                            <td> Rs -{h?.balance}/-</td>
                                            <td>{h?.status}</td>
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

export default UtiHistory

