import React, { useState } from 'react'
import "./styles.scss"


const PricingCard = ({ e, types }) => {

    return (
        <div className="price-card">
            <h2 className='type'>{e.type}</h2>
            <div className="serv">
                {
                    types.map((e) => (
                        <span key={e}>{e}</span>
                    ))
                }
            </div>
            <div className="price">
                <h2>Rs - {e.price}/-</h2>
                <button >Get this package</button>
            </div>
        </div>
    )
}

export default PricingCard
