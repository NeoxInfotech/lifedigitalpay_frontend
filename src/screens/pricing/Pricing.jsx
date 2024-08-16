import React from 'react'
import { PriceData } from '../../data/priceCard'
import PricingCard from '../../components/pricingcard/PricingCard'
import logo from "../../assets/lifedigipay.png"
import "./styles.scss"

const Pricing = () => {
    return (
        <div className='pricing'>
            <div className="logo">
                <img src={logo} alt="" className='logoimg' />
            </div>
            <h1 className='pricing-head'>Our Pricing</h1>
            <div className="pricing-list">
                {
                    PriceData.map((e) => (
                        <PricingCard key={e.id} e={e} types={e.services} />
                    ))
                }


            </div>
        </div>
    )
}

export default Pricing
