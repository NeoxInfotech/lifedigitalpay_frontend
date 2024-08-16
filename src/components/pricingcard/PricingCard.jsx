import React, { useState } from 'react'
import "./styles.scss"
import { Link } from 'react-router-dom'


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
                <Link className="button" to={"/register"} >Get this package</Link>
            </div>
            {e.actv ? <div className="active-stat">
                <h3>{e.actv}</h3>
            </div> : null}
        </div>
    )
}

export default PricingCard
