import React, { useState } from 'react'
import "./styles.scss"
import { Link } from 'react-router-dom'

const ContactForm = () => {
    return (
        <div className="contact-form">
            <div className="left">
                <h2>Contact Us for More details and enquiry</h2>
                <span>Fill up the form and we will get in touch with you within 24 hours.</span>
                <Link className='butt' to={"/register"} >Directly Register for Partnership</Link>

            </div>
            <div className='right'>
                <form action="#">
                    <input type="text" placeholder='Enter Your Name' />
                    <input type="number" placeholder='Enter Your Phone Number' />
                    <textarea id="" cols="30" rows="10" placeholder='Enter Your Message'></textarea>
                    <button>Contact</button>
                </form>

            </div>
        </div>
    )
}

export default ContactForm
