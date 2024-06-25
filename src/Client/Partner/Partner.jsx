import React, { useContext } from 'react'
import "./styles.scss"
import Sider from '../../components/client/sider/Sider'
import { AdminContent, distributorContent, siderContent } from '../../data/siderData'
import Dashboard from '../Dashboard/Dashboard'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AddMoney from '../services/AddMoney/Addmoney'
import { FaUserCog } from "react-icons/fa";
import { UserContext } from '../../context/userContext'
import Profile from '../profile/Profile'
import MobileRecharge from '../services/MobileRecharge/MobileRecharge'
import WalletHistory from '../servicerecords/wallethistory/WalletHistory'
import RechargeHistory from '../servicerecords/rechargehistory/RechargeHistory'
import CommissionList from '../margins/commssionlist/CommissionList'
import OneTimePayment from '../onetimepayment/OneTimePayment'
import NsdlKyc from '../services/nsdlkyc/NsdlKyc'
import NsdlHistory from '../servicerecords/nsdlhistory/NsdlHistory'
import AddAdminUser from '../../Admin/addAdminUsers/AddAdminUser'
import AdminUserList from '../../Admin/adminUserList/AdminUserList'
import UtiCoupon from '../services/uti/UtiCoupon/UtiCoupon'


const Partner = () => {
    const { user } = useContext(UserContext)
    const navigateTo = useNavigate()
    return (
        <div className='partner'>

            {
                user?.active ? <div className="left">
                    <Sider items={user?.acctype === "Retailer" ? siderContent : user?.acctype === "Admin" ? AdminContent : distributorContent} />
                </div> : <div className='left'><h1>LifeDigitalPay</h1></div>
            }
            <div className="right">
                <div className="prof-header">
                    <h4>Your Wallet Balance - {user?.wallet}</h4>
                    <div className="prof">
                        <FaUserCog className='ico' onClick={() => navigateTo("/profile")} />
                        <div className='prof-tag'>
                            <span>{user?.name}</span>
                            <span className='type'>({user?.acctype})</span>
                        </div>



                    </div>
                </div>
                {
                    !user?.active ?
                        <Routes>
                            <Route path='/' element={<OneTimePayment />} />
                        </Routes> :
                        <Routes>
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/addmoney' element={<AddMoney />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/mobilerecharge' element={<MobileRecharge />} />
                            <Route path='/wallethistory' element={<WalletHistory />} />
                            <Route path='/rechargehistory' element={<RechargeHistory />} />
                            <Route path='/marginlist' element={<CommissionList />} />
                            <Route path='/nsdlekyc' element={<NsdlKyc />} />
                            <Route path='/nsdlhistory' element={<NsdlHistory />} />
                            <Route path='/utiekyc' element={<UtiCoupon />} />
                            {user?.acctype === "Admin" ? <Route path='/adduseradmin' element={<AddAdminUser />} /> : null}
                            {user?.acctype === "Admin" ? <Route path='/alluserlist' element={<AdminUserList />} /> : null}
                        </Routes>
                }



            </div>
        </div>
    )
}

export default Partner
