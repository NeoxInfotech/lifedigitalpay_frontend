import React, { useContext, useState } from 'react'
import hero from "../../../assets/hero.jpg"
import "./styles.scss"
import axios from 'axios'
import { server } from '../../../main'
import toast from 'react-hot-toast'
import { UserContext } from '../../../context/userContext'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigateTo = useNavigate();
    const { user } = useContext(UserContext)

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${server}/auth/login`, { username, password }, { withCredentials: true });
            toast.success("Logged in successfully");
            if (user?.active === false) {
                navigateTo("/registerpay")
            } else {
                navigateTo("/")
            }

            window.location.reload()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <div className='login'>
            <div className="left">
                <img src={hero} alt="" />
            </div>
            <div className="right">
                <h1>Login to your partner account</h1>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder='Partner mail id' onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder='Partner Password' onChange={(e) => setPassword(e.target.value)} />
                    <button>Login</button>
                </form>
                <span>Dosen't have account <Link to={"/register"}>Register</Link></span>
            </div>
        </div>
    )
}

export default Login
