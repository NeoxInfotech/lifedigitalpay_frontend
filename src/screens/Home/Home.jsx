import React, { useState } from 'react'
import "./styles.scss"
import hero from "../../assets/hero.jpg"
import about from "../../assets/about.jpg"
import { ServiceCard } from '../../data/servicecard'
import Card from '../../components/cards/Card'
import { Link } from 'react-router-dom'
import ContactForm from '../../components/forms/contactForm/ContactForm'
import { PriceData } from '../../data/priceCard'
import PricingCard from '../../components/pricingcard/PricingCard'

const Home = () => {
    const [showService, setShowService] = useState(4)
    return (
        <section className='home'>
            <section className='hero'>
                <div className="left">
                    <h1>All Pancard and recharge Services in one Step</h1>
                    <span>Get pan service, recharge services, Uti pan service, complaint box and many featured services. </span>
                    <button>
                        Explore Services
                    </button>
                </div>
                <div className="right">
                    <img src={hero} alt="" />
                </div>
            </section>
            <section className='services'>
                <h1>Services We Provide</h1>
                <div className="service-cards">
                    {
                        ServiceCard.map((e) => (
                            <Card key={e.id} e={e} />
                        )).slice(0, showService)
                    }

                </div>
                <div className="service-page-button">
                    <button className='button' onClick={() => setShowService(8)}>Explore More </button>
                </div>
            </section>
            <section className='about-us'>
                <h1>About Us</h1>
                <div className="about-sec">
                    <div className="img">
                        <img src={about} alt="" />
                    </div>
                    <div className="content">
                        <span>
                            Life Digital Pay is your trusted partner for comprehensive PAN services and digital recharge solutions. We are committed to offering a seamless experience for managing your financial and digital needs. Our platform is designed to be simple, reliable, and accessible, whether you’re applying for a PAN card, recharging your mobile or D2H, or managing your online accounts. With Life Digital Pay, convenience and efficiency are always at your fingertips.
                        </span>
                        <ul className='points'>
                            <li>PAN Card Services: Assistance with applying for new PAN cards, corrections, and updates through UTI and NSDL.</li>
                            <li> Instant and secure top-up options for all major mobile networks.Hassle-free recharge solutions for D2H services, ensuring uninterrupted entertainment</li>
                            <li>Tailored strategies to help you manage and optimize financial margins. And Tools to manage your digital presence and financial transactions efficiently.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="contact">
                <div className="head">
                    <h1>Contact us</h1>
                </div>
                <ContactForm />
            </section>
            <div className='pricing'>
                <h1 className='pricing-head'>Our Pricing</h1>
                <div className="pricing-list">
                    {
                        PriceData.map((e) => (
                            <PricingCard key={e.id} e={e} types={e.services} />
                        ))
                    }


                </div>
            </div>
        </section>
    )
}

export default Home
