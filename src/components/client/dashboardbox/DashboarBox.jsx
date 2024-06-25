import React from 'react'
import "./styles.scss"

const DashboarBox = ({ src, text, text2, bgColor, onClick, color }) => {
    return (
        <div className='dashboard-box' onClick={onClick} style={{ backgroundColor: bgColor, color: color }}>
            {src ? <img src={src} className='img' alt="" /> : null}
            <h4>{text}</h4>
            <span>{text2}</span>
        </div>
    )
}

export default DashboarBox
