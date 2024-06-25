import upiwallet from "../assets/upiwallet.jpg"
import utipan from "../assets/utipan.png"
import nsdlinstant from "../assets/nsdlinstant.png"
import mrecharge from "../assets/mrechargeservice.jpg"
import dthr from "../assets/dthr.png"

export const dashboardconstant = [
    {
        id: 1,
        img: upiwallet,
        text: "Add Money",
        linkto: "/addmoney",
    },
    {
        id: 2,
        img: utipan,
        text: "UTI Coupon Purchase",
        linkto: "/utiekyc",
    },
    {
        id: 3,
        img: nsdlinstant,
        text: "Instant e-KYC PAN",
        linkto: "/nsdlekyc",
    },
    {
        id: 4,
        img: mrecharge,
        text: "Mobile Recharge",
        linkto: "/mobilerecharge",
    },
    {
        id: 5,
        img: dthr,
        text: "DTH Recharge",
        linkto: "/dthrecharge",
    },
]

export const retaildashboard = [
    {
        id: 1,
        text: "E-KYC PAN Pending",
        bg: "#fc4242",
        text2: 0,
    },
    {
        id: 2,
        text: "E-KYC PAN Today",
        bg: "#5151ff",
        text2: 0,
    },
    {
        id: 3,
        text: "UTI Coupon Today",
        bg: "#bf51ff",
        text2: 0,
    },
    {
        id: 4,
        bg: "#51ff5a",
        text: "Recharge Today",
        text2: 0,
    }
]