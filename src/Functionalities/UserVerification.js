import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getDocs, collection, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore and Storage instances
import { UserContext } from '../UserContext';
import './UserVerification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';

function UserVerification() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [businessUsers, setBusinessUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        handleNavToggle(); // Call the function from script.js after component mounts
      }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
        } else {
            fetchBusinessUsers();
        }
    }, [user, navigate]);

    const fetchBusinessUsers = async () => {
        const dbref = collection(db, 'Auth');
        const q = query(dbref,  where('UserType', 'in', ['BusinessUser', 'DietitiansUser']), where('status', '==', 'pending'));
        const snapshot = await getDocs(q);
        const usersArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBusinessUsers(usersArray);
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const verifyUser = async (id) => {
        const userRef = doc(db, 'Auth', id);
        await updateDoc(userRef, { status: 'verified' });
        fetchBusinessUsers();
    };

    const handleButtonClick = () => {
        setUser(null); // Clear user context
        navigate('/login', { replace: true }); // Redirect to login and replace history
    };

    // Filter business users based on search term
    const filteredUsers = businessUsers.filter((user) => 
        user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.Email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <header className="header" id="header">
                {/* ==== NAV ===*/}
                <nav className="nav container">
                    <a href="#" className="nav-logo"> <h2>NutriTrack</h2> </a>
                    {/* ==== NAV MENU ===*/}
                    <div className="nav-menu" id="nav-menu">
                        {/* ==== NAV LIST ===*/}
                        <ul className="nav-list">
                            <li className="nav-item"><Link to="/SystemAdminMainAcc" className="nav-link">DashBoard</Link></li>
                            <li className="nav-item"><Link to="/ViewUserProfile" className="nav-link">User Profile</Link></li>
                            <li className="nav-item"><Link to="/SuspendBlogPost" className="nav-link">Suspend Post</Link></li>
                            <li className="nav-item"><Link to="/SuspendContentPost" className="nav-link">Suspend Content</Link></li>

                            {/* User Icon with Dropdown */}
                            <li className="nav-item nav-user">
                                <a href="#" className="nav-link">
                                    <FontAwesomeIcon icon={faUser} />
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item" onClick={() => navigate('/ViewAccount')}>My Account</li>
                                    <li className="dropdown-item" onClick={handleButtonClick}>Log Out</li>
                                </ul>
                            </li>
                        </ul>

                        {/* ==== NAV CLOSE ===*/}
                        <div className="nav-close" id="nav-close">
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>

                    {/* ==== NAV BUTTON ===*/}
                    <div className="nav-btn">
                        {/* ==== TOGGLE BUTTON ===*/}
                        <div className="nav-toggle" id="nav-toggle">
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    </div>
                </nav>
            </header>

            <div className='centered-items'>
                <h2 className='UserVer'>Business User Verification</h2>
                <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchInputChange} className="search-input" />
                <button className="button-button" onClick={() => navigate('/SystemAdminMainAcc')}>Back</button>

                {/* Conditional Rendering Based on Search Results */}
                {filteredUsers.length > 0 ? (
                    <table className='verification-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>UserType</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.Name}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.Date}</td>
                                    <td>{user.UserType}</td>
                                    <td>
                                        <button className="button-button" onClick={() => verifyUser(user.id)}>Verify</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No user found</p> // Display this when no users match the search term
                )}
            </div>
        </div>
    );
}

export default UserVerification;
