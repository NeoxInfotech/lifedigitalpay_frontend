import React, { useContext } from 'react'
import "./styles.scss"
import utipan from "../../../../assets/utipan.png"
import { UserContext } from '../../../../context/userContext'

const UtiCoupon = () => {
    const { user } = useContext(UserContext)
    return (
        <div className='uti-coupon'>
            <div className="activation">
                <img src={utipan} alt="" />
                <h1>Generate Agent Id and Login to Uti Portal</h1>
                <button className="uti-gen">Generate Id</button>
            </div>
        </div>
    )
}

export default UtiCoupon
