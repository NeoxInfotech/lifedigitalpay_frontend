import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { FaUserTie } from 'react-icons/fa'
import "./styles.scss"

const Menu = ({ setMenu }) => {
    const user = false
    return (
        <>
            {
                user ? <div className="menu-items" onClick={() => setMenu(false)}>
                    <Link className='link' to={"/"}>Dashboard</Link>
                    <Link className='link' to={"/services"}>Services</Link>
                    <div className="profile-sec">
                        <FaUserTie className='user-pic' />
                        <Link className='link' to={"/profile"}>name</Link>
                    </div>
                </div> :
                    <div className="menu-items" onClick={() => setMenu(false)}>
                        <Link className='link' to={"/"}>Home</Link>
                        <Link className='link' to={"/allservice"}>Services</Link>
                        <Link className='link' to={"/pricing"}>Pricing</Link>
                        <Link className='link link-butt' to="/login" onClick={() => window.scrollTo(0)}>Login</Link>
                        <Link className='link link-butt' to="/Register" onClick={() => window.scrollTo(0)}>Register</Link>
                    </div>
            }

        </>
    )
}

export default Menu
