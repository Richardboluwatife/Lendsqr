import React, { useEffect, useRef, useState } from "react";
import "../../styles/UserTable.scss";
import Pagination from "./Pagination";
import Filter from "../../assets/filter.png";
import { HiDotsVertical } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ActivateUser from '../../assets/ActivateUser.png'
import Eye from '../../assets/Eye.png'
import Blacklist from '../../assets/Blacklist.png'
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const statuses = ["Inactive", "Pending", "Blacklisted", "Active"];

interface User {
    id: string;
    organization: string;
    username: string;
    email: string;
    phone: string;
    createdAt: string;
    status: string;
}


const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(""); // Track search input
    const [filterDropdown, setFilterDropdown] = useState<string | null>(null); // Tracks active dropdown
    const navigate = useNavigate();
    const [filterInputs, setFilterInputs] = useState({
        organization: "",
        username: "",
        email: "",
        phone: "",
        date: null as Date | null,
        status: "",
    });

    const [dropdownVisible, setDropdownVisible] = useState<string | null>(null); // For managing individual dropdowns

    const itemsPerPage = 20;
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let allUsers: User[] = [];
                for (let i = 0; i < 5; i++) {
                    const response = await fetch(
                        "https://674f1ff2bb559617b26e20c4.mockapi.io/api/v1/lendsqr/users"
                    );
                    const data: User[] = await response.json();
                    console.log('====================================');
                    console.log(data);
                    console.log('====================================');
                    // Concatenate each batch of data to the allUsers array
                    allUsers = allUsers.concat(data);
                }

                // Map the users to include a random status and formatted createdAt date
                const updatedUsers = allUsers.map((user) => ({
                    ...user,
                    status: statuses[Math.floor(Math.random() * statuses.length)],
                    createdAt: new Date(user.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                    }),
                }));

                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setFilterDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const toggleDropdown = (column: string) => {
        setFilterDropdown((prev) => (prev === column ? null : column));
    };

    const handleAction = (action: string, id: string) => {
        switch (action) {
            case "view-details":
                // alert(`Viewing details for ${username}`);
                break;
            case "blacklist-user":
                alert(`Blacklisting ${id}`);
                break;
            case "activate-user":
                alert(`Activating ${id}`);
                break;
            default:
                break;
        }
        setDropdownVisible(null); // Close the dropdown after action
    };

    const handleFilterChange = (field: string, value: string | Date | null) => {
        setFilterInputs((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetFilters = () => {
        setFilterInputs({
            organization: "",
            username: "",
            email: "",
            phone: "",
            date: null,
            status: "",
        });
        setFilteredUsers(users);
    };

    const applyFilters = () => {
        const { organization, username, email, phone, date, status } = filterInputs;

        const filtered = users.filter((user) => {
            const userDate = new Date(user.createdAt); // Convert the user.createdAt to a Date object
            const filterDate = date ? new Date(date) : null;

            return (
                (organization === "" || user.organization.toLowerCase() === organization.toLowerCase()) &&
                (username === "" || user.username.toLowerCase().includes(username.toLowerCase())) &&
                (email === "" || user.email.toLowerCase().includes(email.toLowerCase())) &&
                (phone === "" || user.phone.includes(phone)) &&
                (date === null || (userDate.getFullYear() === filterDate?.getFullYear() &&
                    userDate.getMonth() === filterDate?.getMonth() &&
                    userDate.getDate() === filterDate?.getDate())) && // Compare only the date part
                (status === "" || user.status === status)
            );
        });

        setFilteredUsers(filtered);
        setFilterDropdown(null);
    };

    // Filter users by search query
    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const searchResults = users.filter(
            (user) =>
                user.organization.toLowerCase().includes(lowercasedQuery) ||
                user.username.toLowerCase().includes(lowercasedQuery) ||
                user.email.toLowerCase().includes(lowercasedQuery) ||
                user.phone.includes(lowercasedQuery) ||
                user.createdAt.toLowerCase().includes(lowercasedQuery) ||
                user.status.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredUsers(searchResults);
    }, [searchQuery, users]);

    const totalItems = filteredUsers.length;
    // const totalPages = Math.ceil(totalItems / itemsPerPage);
    const displayedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const uniqueOrganizations = Array.from(
        new Set(users.map((user) => user.organization))
    ).slice(0, 100); // Get unique organizations (max 100)

    return (
        <div className="user-table">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for anything"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="search-icon" />
            </div>
            <table>
                <thead>
                    <tr>
                        {[
                            { name: "Organization", field: "organization" },
                            { name: "Username", field: "username" },
                            { name: "Email", field: "email" },
                            { name: "Phone Number", field: "phone" },
                            { name: "Date Joined", field: "date" },
                            { name: "Status", field: "status" },
                        ].map((column) => (
                            <th key={column.field}>
                                {column.name}
                                <img
                                    src={Filter}
                                    alt="Filter"
                                    className="imgs"
                                    title={`Filter ${column.name}`}
                                    onClick={() => toggleDropdown(column.field)}
                                />
                                {filterDropdown === column.field && (
                                    <div
                                        ref={dropdownRef}
                                        className="dropdown"
                                        style={{ position: "absolute", zIndex: 100 }}
                                    >
                                        {column.field === "date" ? (
                                            <DatePicker
                                                selected={filterInputs.date}
                                                onChange={(date) =>
                                                    handleFilterChange("date", date)
                                                }
                                                placeholderText="Select Date"
                                                className="date-picker"
                                            />
                                        ) : column.field === "organization" ? (
                                            <select
                                                className="organization"
                                                value={filterInputs.organization}
                                                onChange={(e) =>
                                                    handleFilterChange("organization", e.target.value)
                                                }
                                            >
                                                <option value="">Select</option>
                                                {uniqueOrganizations.map((org, index) => (
                                                    <option key={index} value={org}>
                                                        {org}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : column.field === "status" ? (
                                            <select
                                                className="status"
                                                value={filterInputs.status}
                                                onChange={(e) =>
                                                    handleFilterChange("status", e.target.value)
                                                }
                                            >
                                                <option value="">Select</option>
                                                {statuses.map((status, index) => (
                                                    <option key={index} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                value={(filterInputs as any)[column.field] || ""}
                                                onChange={(e) =>
                                                    handleFilterChange(column.field, e.target.value)
                                                }
                                                placeholder={`${column.name}`}
                                            />
                                        )}
                                        <div className="dropdown-actions">
                                            <button onClick={resetFilters} className="reset">
                                                Reset
                                            </button>
                                            <button onClick={applyFilters} className="apply">
                                                Filter
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {displayedUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.organization}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.createdAt}</td>
                            <td>
                                <span className={`status ${user.status.toLowerCase()}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td>
                                <HiDotsVertical onClick={() => setDropdownVisible(user.id)} />
                                {dropdownVisible === user.id && (
                                    <div className="dropdown-menu">
                                        <ul>
                                            <li
                                                onClick={() => {
                                                    handleAction("view-details", user.id);
                                                    navigate(`/user-details/${user.id}`); // Replace with your desired route
                                                }}
                                            >
                                                <img src={Eye} alt="" className="img" />
                                                View Details
                                            </li>
                                            <li
                                                onClick={() => handleAction("blacklist-user", user.username)}
                                            >
                                                <img src={Blacklist} alt="" className="img" />
                                                Blacklist User
                                            </li>
                                            <li
                                                onClick={() => handleAction("activate-user", user.username)}
                                            >
                                                <img src={ActivateUser } alt="" className="img" />
                                                Activate User
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default UserTable;