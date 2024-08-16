import React from 'react'
import "./styles.scss"
import { ServiceCard } from '../../data/servicecard'
import Card from '../../components/cards/Card'
import logo from "../../assets/lifedigipay.png"
import { Link } from 'react-router-dom'

const Services = () => {
    return (
        <section className='services'>
            <div className="logo">
                <img src={logo} alt="" className='logoimg' />
            </div>
            <h1>Services We Provide</h1>
            <div className="service-cards">
                {
                    ServiceCard.map((e) => (
                        <Card key={e.id} e={e} />
                    ))
                }

            </div>
            <div className="service-page-button">
                <Link className='button' to={"/register"}>Join Now </Link>
            </div>
        </section>
    )
}

export default Services
