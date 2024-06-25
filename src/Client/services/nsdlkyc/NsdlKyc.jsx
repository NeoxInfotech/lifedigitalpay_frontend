import React, { useContext, useState } from 'react'
import "./styles.scss"
import axios from "axios"
import nsdlinstant from "../../../assets/nsdlinstant.png"
import { UserContext } from '../../../context/userContext'
import toast from 'react-hot-toast'
import { server } from '../../../main'
import NsdlActive from './NsdlActive'

const NsdlKyc = () => {
    const [panType, setPanType] = useState('')
    const [panMode, setPanMode] = useState('')
    const [panNeed, setPanNeed] = useState('')
    const [gender, setGender] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [activepage, setActivePage] = useState(true)
    const [dob, setDob] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [pan, setPan] = useState('')
    const { user } = useContext(UserContext)



    const handleNsdl = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${server}/nsdl/nsdlkyc/${user?.username}`, {
                type: panType,
                mode: panMode,
                need: panNeed,
                firstname,
                lastname,
                gender,
                dob,
                mobile,
                email,
                pan,
            }, { withCredentials: true })
            toast.success(res.data.message)
            const myForm = document.createElement('form');
            myForm.method = 'POST';
            myForm.action = res.data.form.url;
            myForm.target = "_blank";
            const myInput = document.createElement('input');
            myInput.type = 'hidden';
            myInput.name = 'req';
            myInput.value = res.data.form.enc_data;
            myForm.appendChild(myInput);
            document.body.appendChild(myForm);
            myForm.submit();
            // window.location.replace(res.data.form.url)
            console.log(res.data.form)
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error)
        }
    }
    return (
        <div className='nsdl'>
            <h1>Nsdl E-Kyc Instant Pan</h1>
            {
                activepage && !user?.nsdlactive ? <NsdlActive setActivePage={setActivePage} /> :
                    <div className="mid-sec">
                        <img src={nsdlinstant} alt="" />
                        <form onSubmit={handleNsdl}>
                            <div className='pan-select'>
                                <span>Enter Pan Card Type - </span>
                                <div
                                    onClick={() => setPanType('NEW')}
                                    className={panType === 'NEW' ? "button-selected" : 'button'}
                                >
                                    New
                                </div>
                                <div
                                    onClick={() => setPanType('CR')}
                                    className={panType === 'CR' ? 'button-selected' : "button"}
                                >
                                    Correction
                                </div>
                            </div>
                            <div className='pan-select'>
                                <span>Enter Pan Card Mode - </span>
                                <div
                                    onClick={() => setPanMode('K')}
                                    className={panMode === 'K' ? 'button-selected' : "button"}>
                                    For E-KYC
                                </div>
                                <div
                                    onClick={() => setPanMode('E')}
                                    className={panMode === 'E' ? 'button-selected' : "button"}>
                                    For Scan Based Application
                                </div>
                            </div>
                            <div className='pan-select'>
                                <span>Enter Pan Card Need - </span>
                                <div
                                    onClick={() => setPanNeed('Y')}
                                    className={panNeed === 'Y' ? 'button-selected' : "button"}>
                                    Physically Needed
                                </div>
                                <div
                                    onClick={() => setPanNeed('N')}
                                    className={panNeed === 'N' ? 'button-selected' : "button"}
                                >E-Pan only</div>
                            </div>
                            <input type="text" placeholder='Enter Your First Name' onChange={(e) => setFirstName(e.target.value)} />
                            <input type="text" placeholder='Enter Your Last Name' onChange={(e) => setLastName(e.target.value)} />
                            <input type="txet" placeholder='dd/mm/yy' onChange={(e) => setDob(e.target.value)} />
                            <div className='pan-select'>
                                <span>Enter Your Gender- </span>
                                <div
                                    onClick={() => setGender('M')}
                                    className={gender === 'M' ? 'button-selected' : "button"}>
                                    Male
                                </div>
                                <div
                                    onClick={() => setGender('F')}
                                    className={gender === 'F' ? 'button-selected' : "button"}
                                >Female</div>
                            </div>
                            <input type="number" placeholder='Enter Mobile Number' onChange={(e) => setMobile(e.target.value)} />
                            <input type="email" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
                            <input type="text" placeholder='Enter Your Pan (If Required)' onChange={(e) => setPan(e.target.value)} />
                            <button>Submit</button>
                            <span className='alert'>*For Nsdl eKYC - platform charge is Rs 110</span>
                        </form>
                    </div>
            }


        </div>
    )
}

export default NsdlKyc
