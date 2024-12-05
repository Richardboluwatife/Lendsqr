import React, { useEffect, useState } from "react";
import "../../styles/Statistics.scss";
import Icon from "../../assets/icon.png";
import Icon1 from "../../assets/icon1.png";
import Icon2 from "../../assets/icon2.png";
import Icon3 from "../../assets/icon3.png";

const statsTemplate = [
    { label: "Users", value: "0", icon: Icon }, // Dynamic value
    { label: "Active Users", value: "2,453", icon: Icon1 },
    { label: "Users with Loans", value: "12,453", icon: Icon2 },
    { label: "Users with Savings", value: "102,453", icon: Icon3 },
];

const Statistics: React.FC = () => {
    const [stats, setStats] = useState(statsTemplate);

    useEffect(() => {
        // Fetch data from the backend
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://674f1ff2bb559617b26e20c4.mockapi.io/api/v1/lendsqr/users");
                const data = await response.json();
                const totalUsers = data.length * 5; // Multiply the fetched number by 5

                // Update the stats with the new value
                setStats((prevStats) =>
                    prevStats.map((stat) =>
                        stat.label === "Users" ? { ...stat, value: totalUsers.toLocaleString() } : stat
                    )
                );
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="statistics-container">
            <div className="header">
                <h3>Users</h3>
            </div>
            <div className="statistics">
                {stats.map((stat, index) => (
                    <div className="stat-card" key={index}>
                        <div className="icon">
                            <img src={stat.icon} alt={`${stat.label} Icon`} />
                        </div>
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Statistics;