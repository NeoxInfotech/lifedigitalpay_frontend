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
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ratione cupiditate. Perspiciatis dolores veniam exercitationem saepe placeat distinctio eveniet consectetur porro sit possimus provident, sapiente minima numquam facere esse itaque nulla! Deleniti voluptate facilis id tempore blanditiis sit, enim ex maxime officia totam fuga numquam ipsum quia illo harum! Rerum, veniam? Voluptatibus unde, rerum vitae eaque ipsa magnam et sequi omnis aliquam libero ratione minus adipisci? Nobis consectetur maiores placeat exercitationem, odit officiis delectus enim quae rem repellat ipsam veniam!
                        </span>
                        <ul className='points'>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa similique corporis illo doloremque quisquam?</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa similique corporis illo doloremque quisquam?</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa similique corporis illo doloremque quisquam?</li>
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
