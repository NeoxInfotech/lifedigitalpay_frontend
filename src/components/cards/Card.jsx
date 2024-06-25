import React from 'react'
import "./styles.scss"


const Card = ({ e }) => {
    return (
        <div className="card">
            <img src={e.ico} alt="" />
            <h2>{e.title}</h2>
            <span>{e.desc}</span>
        </div>
    )
}

export default Card
