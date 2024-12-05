// import React from 'react';
// import '../../../styles/Details.scss';

// const DetailsPage = () => {
//     return (
//         <div className="details-page">
//             {/* Header Section */}
//             <div className="header">
//                 <img
//                     src="https://via.placeholder.com/100"
//                     alt="User Profile"
//                     className="profile-img"
//                 />
//                 <div className="info">
//                     <h2>Grace Effiom</h2>
//                     <p>User's Tier</p>
//                     <p className="balance">₦200,000.00</p>
//                     <p>3912545678/Providus Bank</p>
//                 </div>
//             </div>

//             {/* Tab Navigation */}
//             <div className="tabs">
//                 <nav>
//                     <button className="active">General Details</button>
//                     <button>Documents</button>
//                     <button>Bank Details</button>
//                     <button>Loans</button>
//                     <button>Savings</button>
//                     <button>App and System</button>
//                 </nav>
//             </div>

//             {/* Details Section */}
//             <div className="details-section">
//                 <h3>Personal Information</h3>
//                 <div className="grid">
//                     <p>
//                         <strong>Full Name:</strong> Grace Effiom
//                     </p>
//                     <p>
//                         <strong>Phone Number:</strong> 07060780922
//                     </p>
//                     <p>
//                         <strong>Email Address:</strong> grace@gmail.com
//                     </p>
//                     <p>
//                         <strong>BVN:</strong> 07060780922
//                     </p>
//                     <p>
//                         <strong>Gender:</strong> Female
//                     </p>
//                     <p>
//                         <strong>Marital Status:</strong> Single
//                     </p>
//                     <p>
//                         <strong>Children:</strong> None
//                     </p>
//                     <p>
//                         <strong>Type of Residence:</strong> Parent's Apartment
//                     </p>
//                 </div>
//             </div>

//             <div className="details-section">
//                 <h3>Education and Employment</h3>
//                 <div className="grid">
//                     <p>
//                         <strong>Level of Education:</strong> B.Sc
//                     </p>
//                     <p>
//                         <strong>Employment Status:</strong> Employed
//                     </p>
//                     <p>
//                         <strong>Sector of Employment:</strong> FinTech
//                     </p>
//                     <p>
//                         <strong>Duration of Employment:</strong> 2 years
//                     </p>
//                     <p>
//                         <strong>Monthly Income:</strong> ₦200,000.00 - ₦400,000.00
//                     </p>
//                     <p>
//                         <strong>Loan Repayment:</strong> ₦40,000
//                     </p>
//                 </div>
//             </div>

//             <div className="details-section">
//                 <h3>Socials</h3>
//                 <div className="grid">
//                     <p>
//                         <strong>Twitter:</strong> @grace_effiom
//                     </p>
//                     <p>
//                         <strong>Facebook:</strong> Grace Effiom
//                     </p>
//                     <p>
//                         <strong>Instagram:</strong> @grace_effiom
//                     </p>
//                 </div>
//             </div>

//             <div className="details-section">
//                 <h3>Guarantor</h3>
//                 <div className="grid">
//                     <p>
//                         <strong>Full Name:</strong> Debby Ogana
//                     </p>
//                     <p>
//                         <strong>Phone Number:</strong> 07060780922
//                     </p>
//                     <p>
//                         <strong>Email Address:</strong> debby@gmail.com
//                     </p>
//                     <p>
//                         <strong>Relationship:</strong> Sister
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DetailsPage;

import React from "react";
import "../../../styles/Dashboard.scss"; // Assuming you have a SCSS file for styles

import Sidebar from "../../../components/Sidebar";
import Header from "../../Dashboard/header";
import DetailsPage from "./DetailsPage";

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <div className="app">
                <Sidebar />
                <div className="main-content">
                    <Header />
                    <DetailsPage />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;