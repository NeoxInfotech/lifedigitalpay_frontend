import React from 'react'
import DashboarBox from '../../components/client/dashboardbox/DashboarBox'
import "./styles.scss"
import { dashboardconstant, retaildashboard } from '../../data/dashboardData'
import { useNavigate } from 'react-router-dom'



const Dashboard = () => {
    const navigateTo = useNavigate()
    return (
        <div className='dashboard'>
            {
                dashboardconstant.map((content) => (
                    <DashboarBox bgColor={"#fff"} text={content.text} src={content.img} onClick={() => navigateTo(content.linkto)} />
                ))
            }
            <div className="dashboard">
                {
                    retaildashboard.map((c) => (
                        <DashboarBox
                            key={c.id}
                            color={"#fff"}
                            bgColor={c.bg}
                            text={c.text}
                            text2={c.text2}
                            onClick={(e) => e.preventDefault()}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Dashboard
