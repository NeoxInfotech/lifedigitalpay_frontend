import React from 'react'
import "./styles.scss"
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <div className='footer'>
            <span>Pan service app pvt ltd © 2024 | All Rights Reserved</span>
            <div className='links'>
                <Link className='link' to={"/allservice"}>Services</Link>
                <Link className='link' to={"/pricing"}>Pricing</Link>
                <span>Contact - 7478434529</span>
            </div>


        </div>
    )
}

export default Footer
