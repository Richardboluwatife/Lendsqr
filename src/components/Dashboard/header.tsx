import React from "react";
import { FaSearch } from "react-icons/fa";
import Bell from "../../assets/Bell.png";
import ProfilePic from "../../assets/ProfilePic.png";
import "../../styles/Header.scss";
import { IoMdArrowDropdown } from "react-icons/io";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="search-bar">
                <input type="text" placeholder="Search for anything" />
                <FaSearch className="search-icon" /> 
            </div>
            <div className="header-right">
                <h4><u>Docs</u></h4>
                <img src={Bell} alt="Notifications" className="bell-icon" />
                <div className="profile">
                    <img src={ProfilePic} alt="Profile" />
                </div>
                <div className="">
                    <span>Adedeji</span>
                </div>
                <IoMdArrowDropdown className="dropdown-icon" />
            </div>
        </header>
    );
};

export default Header;