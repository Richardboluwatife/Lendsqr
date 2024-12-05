import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import '../../../styles/Details.scss'
import Star from '../../../assets/star.png'
import Star1 from '../../../assets/star1.png'
import Star2 from '../../../assets/star2.png'

// Type definitions for User
interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    bvn: string;
    random_number: string;
    gender: string;
    maritalStatus: string;
    children: string;
    residence: string;
    tier: string;
    balance: string;
    account_number: string;
    bank_name:string;
    education: {
        level: string;
        employmentStatus: string;
        sector: string;
        duration: string;
        officeEmail: string;
        monthlyIncome: string[];
        loanRepayment: string;
    };
    socials: {
        twitter: string;
        facebook: string;
        instagram: string;
    };
    guarantor: {
        fullName: string;
        phone: string;
        email: string;
        relationship: string;
    };
    avatar: string;
}

const DetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // User ID from route params
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Fetch users and store them in local storage
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "https://674f1ff2bb559617b26e20c4.mockapi.io/api/v1/lendsqr/users"
                );
                if (!response.ok) throw new Error("Failed to fetch users");
                const data: User[] = await response.json();

                // Store in local storage
                localStorage.setItem("users", JSON.stringify(data));

                // Find the user by ID and set state
                const selectedUser = data.find((user) => user.id === id);
                setUser(selectedUser || null);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [id]);

    if (!user) {
        return <p>Loading user details...</p>;
    }

    return (
        <div className="details-page">
            {/* Header Section */}
            <div className="header1">
                <div className="flex-icon" onClick={() => navigate(`/dashboard`)}>
                    <FaArrowLeft className="icon" />
                    <h4>Back to Users</h4>
                </div>
                <div className="flex">
                    <div className="">
                        <h2>User Details</h2>
                    </div>
                    <div>
                        <button className="btn-class">Blacklist User</button>
                        <button className="btn">Activate User</button>
                    </div>
                </div>
            </div>

            {/* User Overview Section */}
            <div className="header_s">
                <div className="header">
                    <img
                        src={user.avatar || "https://via.placeholder.com/100"}
                        alt="User Profile"
                        className="profile-img"
                    />
                    <div className="info">
                        <h2>{user.name}</h2>
                        <h3>{user.random_number}</h3>
                    </div>
                    <div className="user_info">
                        <p>User's Tier</p>
                        <img src={Star2} alt="" />
                        <img src={Star} alt="" />
                        <img src={Star1} alt="" />
                    </div>
                    <div>
                        <p className="balance">₦{user.balance}</p>
                        <p>{user.account_number || "N/A"} / {user.bank_name}</p> 
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="tabs">
                <nav>
                    <button className="active">General Details</button>
                    <button>Documents</button>
                    <button>Bank Details</button>
                    <button>Loans</button>
                    <button>Savings</button>
                    <button>App and System</button>
                </nav>
            </div>

            {/* Details Section */}
            <div className="details">
                {/* Personal Information */}
                <div className="details-section">
                    <h3>Personal Information</h3>
                    <div className="grid">
                        <div className="grid_flex">
                            <p>
                                <strong>Full Name:</strong>
                                <h4>{user.name}</h4>
                            </p>
                            <p>
                                <strong>Phone Number:</strong>
                                <h4>{user.phone}</h4>
                            </p>
                            <p>
                                <strong>Email Address:</strong>
                                <h4>{user.email}</h4>
                            </p>
                            <p>
                                <strong>BVN:</strong>
                                <h4>{user.bvn}</h4>
                            </p>
                            <p>
                                <strong>Gender:</strong>
                                <h4>{user.gender}</h4>
                            </p>
                        </div>
                        <div className="grid_flex">
                            <p>
                                <strong>Marital Status:</strong>
                                <h4>{user.maritalStatus || "N/A"}</h4>
                            </p>
                            <p>
                                <strong>Children:</strong>
                                <h4>{user.children}</h4>
                            </p>
                            <p>
                                <strong>Type of Residence:</strong>
                                <h4>{user.residence || "N/A"}</h4>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Education and Employment */}
                <div className="details-section">
                    <h3>Education and Employment</h3>
                    <div className="grid">
                        <div className="grid_flex">
                            <p>
                                <strong>Level of Education:</strong>
                                <h4>{user.name || "N/A"}</h4> {/* Optional chaining with fallback */}
                            </p>
                            <p>
                                <strong>Employment Status:</strong>
                                <h4>{user.education?.employmentStatus || "N/A"}</h4>
                            </p>
                            <p>
                                <strong>Sector of Employment:</strong>
                                <h4>{user.education?.sector || "N/A"}</h4>
                            </p>
                            <p>
                                <strong>Duration of Employment:</strong>
                                <h4>{user.education?.duration || "N/A"}</h4>
                            </p>
                        </div>
                        <div className="grid_flex">
                            <p>
                                <strong>Office Email:</strong>
                                <h4>{user.education?.officeEmail || "N/A"}</h4>
                            </p>
                            <p>
                                <strong>Monthly Income:</strong>
                                <h4>{user.education?.monthlyIncome?.join(" - ") || "N/A"}</h4>
                            </p>
                            <p>
                                <strong>Loan Repayment:</strong>
                                <h4>{user.education?.loanRepayment || "N/A"}</h4>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Socials */}
                <div className="details-section">
                    <div className="socials-section">
                        <h3>Social Media Handles</h3>
                        <div className="grid">
                            <div className="grid_flex">
                                <p>
                                    <strong>Twitter:</strong>
                                    <h4>{user.socials?.twitter || "Not Available"}</h4> {/* Optional chaining with fallback */}
                                </p>
                                <p>
                                    <strong>Facebook:</strong>
                                    <h4>{user.socials?.facebook || "Not Available"}</h4>
                                </p>
                                <p>
                                    <strong>Instagram:</strong>
                                    <h4>{user.socials?.instagram || "Not Available"}</h4>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guarantor */}
                <div className="details-section">
                    <h3>Guarantor</h3>
                    <div className="grid">
                        <div className="grid_flex">
                            <p>
                                <strong>Full Name:</strong>
                                <h4>{user?.guarantor?.fullName || "Not Available"}</h4>
                            </p>
                            <p>
                                <strong>Phone Number:</strong>
                                <h4>{user?.guarantor?.phone || "Not Available"}</h4>
                            </p>
                            <p>
                                <strong>Email Address:</strong>
                                <h4>{user?.guarantor?.email || "Not Available"}</h4>
                            </p>
                            <p>
                                <strong>Relationship:</strong>
                                <h4>{user?.guarantor?.relationship || "Not Available"}</h4>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DetailsPage;