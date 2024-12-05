import React from "react";
import "../../styles/Dashboard.scss"; // Assuming you have a SCSS file for styles

import Sidebar from "../../components/Sidebar";
import Header from "./header";
import Statistics from "./Statistics";
import UserTable from "./UserTable";

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <div className="app">
                <Sidebar />
                <div className="main-content">
                    <Header />
                    <Statistics />
                    <UserTable />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;