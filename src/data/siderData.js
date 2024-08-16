import wallet from "../assets/walletmanage.png"
import margin from "../assets/marginmanage.png"
import user from "../assets/usermanage.png"
import uti from "../assets/uti.png"
import nsdl from "../assets/nsdl.png"
import web from "../assets/webmanage.png"
import recharge from "../assets/recharge.png"

export const siderContent = [
    {
        id: 1,
        ico: margin,
        cat: "Margin management",
        children: [
            {
                id: 1,
                subcat: "Margin List",
                link: "/marginlist",
            },
            {
                id: 2,
                subcat: "Margin slab",
                link: "/marginslab",
            },
        ],

    },
    {
        id: 2,
        ico: wallet,
        cat: "Manage Wallet",
        children: [
            {
                id: 1,
                subcat: "Add Money",
                link: "/addmoney",
            },
            {
                id: 2,
                subcat: "Transaction History",
                link: "/wallethistory",
            },
        ],

    },
    {
        id: 3,
        ico: uti,
        cat: "UTI Pan Service",
        children: [
            {
                id: 1,
                subcat: "Portal Login",
                link: "/utiekyc",
            },
            {
                id: 2,
                subcat: "Uti History",
                link: "/utihistory",
            },
        ],

    },
    {
        id: 4,
        ico: nsdl,
        cat: "NSDL Pan Service",
        children: [
            {
                id: 1,
                subcat: "E-KYC PAN Card",
                link: "/nsdlekyc",
            },
            {
                id: 2,
                subcat: "E-KYC History",
                link: "/nsdlhistory",
            },
            {
                id: 3,
                subcat: "PAN Status",
                link: "/nsdlstatus",
            },
        ],

    },
    {
        id: 5,
        ico: recharge,
        cat: "Recharge Service",
        children: [
            {
                id: 1,
                subcat: "Mobile Recharge",
                link: "/mobilerecharge",
            },
            {
                id: 2,
                subcat: "DTH Recharge",
                link: "/dthrecharge",
            },
            {
                id: 3,
                subcat: "Recharge History",
                link: "/rechargehistory",
            },
        ],

    },

]




export const AdminContent = [
    {
        id: 1,
        cat: "Margin management",
        ico: margin,
        children: [
            {
                id: 1,
                subcat: "Margin List",
                link: "/marginlist",
            },
            {
                id: 2,
                subcat: "Margin slab",
                link: "/marginslab",
            },
        ],

    },
    {
        id: 2,
        cat: "User Manage",
        ico: user,
        children: [
            {
                id: 1,
                subcat: "Add user",
                link: "/adduseradmin",
            },
            {
                id: 2,
                subcat: "User List",
                link: "/alluserlist",
            },
        ],

    },
    {
        id: 3,
        cat: "Manage Wallet",
        ico: wallet,
        children: [
            {
                id: 1,
                subcat: "Add Money",
                link: "/addmoney",
            },
            {
                id: 2,
                subcat: "Transaction History",
                link: "/wallethistory",
            },
        ],

    },
    {
        id: 4,
        cat: "UTI Pan Service",
        ico: uti,
        children: [
            {
                id: 1,
                subcat: "Portal Login",
                link: "/utiekyc",
            },
            {
                id: 2,
                subcat: "Uti History",
                link: "/utihistory",
            },
        ],

    },
    {
        id: 5,
        cat: "NSDL Pan Service",
        ico: nsdl,
        children: [
            {
                id: 1,
                subcat: "E-KYC PAN Card",
                link: "/nsdlekyc",
            },
            {
                id: 2,
                subcat: "E-KYC History",
                link: "/nsdlhistory",
            },
            {
                id: 3,
                subcat: "PAN Status",
                link: "/nsdlstatus",
            },
        ],

    },
    {
        id: 6,
        cat: "Recharge Service",
        ico: recharge,
        children: [
            {
                id: 1,
                subcat: "Mobile Recharge",
                link: "/mobilerecharge",
            },
            {
                id: 2,
                subcat: "DTH Recharge",
                link: "/dthrecharge",
            },
            {
                id: 3,
                subcat: "Recharge History",
                link: "/rechargehistory",
            },
        ],

    },

    {
        id: 7,
        cat: "Web Management",
        ico: web,
        // children: [
        //     {
        //         id: 1,
        //         subcat: "E-KYC PAN Card",
        //         link: "/nsdlekyc",
        //     },
        //     {
        //         id: 2,
        //         subcat: "E-KYC History",
        //         link: "/nsdlhistory",
        //     },
        //     {
        //         id: 3,
        //         subcat: "PAN Status",
        //         link: "/nsdlstatus",
        //     },
        // ],

    },

]

export const distributorContent = [
    {
        id: 1,
        cat: "Margin management",
        ico: margin,
        children: [
            {
                id: 1,
                subcat: "Margin List",
                link: "/marginlist",
            },
            {
                id: 2,
                subcat: "Margin slab",
                link: "/marginslab",
            },
        ],

    },
    {
        id: 2,
        cat: "User Manage",
        ico: user,
        children: [
            {
                id: 1,
                subcat: "Add user",
                link: "/adddistuser",
            },
            {
                id: 2,
                subcat: "User List",
                link: "/distuserlist",
            },
        ],

    },
    {
        id: 3,
        cat: "Manage Wallet",
        ico: wallet,
        children: [
            {
                id: 1,
                subcat: "Add Money",
                link: "/addmoney",
            },
            {
                id: 2,
                subcat: "Transaction History",
                link: "/wallethistory",
            },
        ],

    },
    {
        id: 4,
        cat: "UTI Pan Service",
        ico: uti,
        children: [
            {
                id: 1,
                subcat: "Portal Login",
                link: "/utiekyc",
            },
            {
                id: 2,
                subcat: "Uti History",
                link: "/utihistory",
            },
        ],

    },
    {
        id: 5,
        cat: "NSDL Pan Service",
        ico: nsdl,
        children: [
            {
                id: 1,
                subcat: "E-KYC PAN Card",
                link: "/nsdlekyc",
            },
            {
                id: 2,
                subcat: "E-KYC History",
                link: "/nsdlhistory",
            },
            {
                id: 3,
                subcat: "PAN Status",
                link: "/nsdlstatus",
            },
        ],

    },
    {
        id: 6,
        cat: "Recharge Service",
        ico: recharge,
        children: [
            {
                id: 1,
                subcat: "Mobile Recharge",
                link: "/mobilerecharge",
            },
            {
                id: 2,
                subcat: "DTH Recharge",
                link: "/dthrecharge",
            },
            {
                id: 3,
                subcat: "Recharge History",
                link: "/rechargehistory",
            },
        ],

    },



]