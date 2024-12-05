import React from "react";
import "../styles/Sidebar.scss";
import Logo from "../assets/Logo.png";
import Home from "../assets/home.png";
import Briefcase from "../assets/briefcase.png";
import UserFriend from "../assets/user-friends.png";
import Users from "../assets/users.png";
import Vector from "../assets/Vector.png";
import PiggyBank from "../assets/piggy-bank.png";
import Group from "../assets/Group.png";
import UserCheck from "../assets/user-check.png";
import UserTimes from "../assets/user-times.png";
import Loan from "../assets/Loan.png";
import Group4 from "../assets/Group4.png";
import CoinsSolid from "../assets/CoinsSolid.png";
import icon4 from "../assets/icon4.png";
import galaxy from "../assets/galaxy.png";
import Usercog from "../assets/Usercog.png";
import Scroll from "../assets/scroll.png";
import ChartBar from "../assets/ChartBar.png";
import sliders from "../assets/sliders.png";
import badgepercent from "../assets/badgepercent.png";
import clipboardlist from "../assets/clipboardlist.png";


const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <img src={Logo} alt="Company Logo" className="logo" />
            <nav className="menu">
                <h4> <img src={Briefcase} alt="" /> Switch Organization</h4>
                <h4> <img src={Home} alt="" />Dashboard</h4>
                <h4>Customers</h4>
                <ul>
                    <li className="active"> <img src={UserFriend} alt="" />Users</li>
                    <li> <img src={Users} alt="" />Guarantors</li>
                    <li> <img src={Loan} alt="" />Loans</li>
                    <li> <img src={Vector} alt="" />Decision Models</li>
                    <li> <img src={PiggyBank} alt="" />Savings</li>
                    <li> <img src={Group} alt="" className="imgs" />Loan Requests </li>
                    <li> <img src={UserCheck} alt="" />Whitelist</li>
                    <li> <img src={UserTimes} alt="" />Karma</li>
                </ul>
                <h4>Businesses</h4>
                <ul>
                    <li> <img src={Briefcase} alt="" />Organization</li>
                    <li> <img src={Group} alt="" className="imgs" />Loan Products </li>
                    <li> <img src={Group4} alt="" />Savings Products</li>
                    <li> <img src={CoinsSolid} alt="" />Fees and Charges</li>
                    <li> <img src={icon4} alt="" />Transactions</li>
                    <li> <img src={galaxy} alt="" />Services</li>
                    <li> <img src={Usercog} alt="" />Service Account</li>
                    <li> <img src={Scroll} alt="" />Settlements</li>
                    <li> <img src={ChartBar} alt="" />Reports</li>
                </ul>
                <h4>Settings</h4>
                <ul>
                    <li> <img src={sliders} alt="" />Preferences</li>
                    <li> <img src={badgepercent} alt="" />Fees and Pricing</li>
                    <li> <img src={clipboardlist} alt="" />Audit Logs</li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;