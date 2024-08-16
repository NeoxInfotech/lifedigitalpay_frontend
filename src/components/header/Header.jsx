import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import Menu from './Menu'
import { CgMenu } from "react-icons/cg";
import { FaUserTie } from "react-icons/fa";
import "./styles.scss"
import ldp from "../../assets/LOGO.png"


const Header = () => {
    const [menu, setMenu] = useState(false)
    const user = false
    return (
        <div className='navbar'>
            <div className="logo">
                <img src={ldp} alt="" />
            </div>
            {
                user ? <div className="items">
                    <Link className='link' to={"/"}>Dashboard</Link>
                    <Link className='link' to={"/services"}>Services</Link>
                    <div className="profile-sec">
                        <FaUserTie className='user-pic' />
                        <Link className='link' to={"/profile"}>name</Link>
                    </div>
                </div> :
                    <div className="items">
                        <Link className='link' to={"/"}>Home</Link>
                        <Link className='link' to={"/allservice"}>Services</Link>
                        <Link className='link' to={"/pricing"}>Pricing</Link>
                        <Link className='link link-butt' to="/login" onClick={() => window.scrollTo(0)}>Login</Link>
                        <Link className='link link-butt' to="/register" onClick={() => window.scrollTo(0)}>Register</Link>
                    </div>
            }

            <div className="ham-ico">
                <CgMenu className='ico' onClick={() => setMenu(!menu)} />
            </div>
            {menu ? <Menu setMenu={setMenu} /> : null}
        </div>
    )
}

export default Header
