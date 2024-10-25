import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import '../SystemAdmin/SystemAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faBook, faUser } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';
import pic1 from '../Images/pic1.webp';

function SystemAdminMainAcc() {
    useEffect(() => {
      handleNavToggle(); // Call the function from script.js after component mounts
    }, []);

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleButtonClick = () => {
        setUser(null); // Clear user context
        navigate('/login', { replace: true }); // Redirect to login and replace history
    };

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);

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
                            <li className="nav-item"><Link to="/SuspendBlogPost" className="nav-link">Suspend Blog</Link></li>
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

            <main className="about section" id="about">
                <div className="container">
                    <div className="row">
                        <div className="about-content padd-15">
                            <div className="row">
                                <div className="about-text padd-15">
                                    <h2>Welcome Back</h2>
                                    <p>
                                        A System Administrator plays a crucial role in maintaining and managing the IT infrastructure of an 
                                        organization. Responsible for ensuring the smooth operation of networks, servers, and computer systems, 
                                        they handle tasks such as configuring hardware and software, monitoring system performance, and troubleshooting 
                                        issues as they arise. Their expertise in security protocols and data backup strategies helps safeguard against 
                                        potential threats and ensures data integrity. With a keen eye for detail and problem-solving skills, System 
                                        Administrators are indispensable in keeping technology running efficiently to support the organization's daily 
                                        operations and long-term goals.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="about-img padd-15">
                            <img src={pic1} alt="Pic1" />
                        </div>
                    </div>
                </div>
            </main>

            <section className="experience" id="projects">
                <div className="container">
                    <h2 className="section-title padd-15">System Administrator Tools</h2>
                    <div className="experience-items row">

                        <div className="experience-item padd-15">
                            <div className="experience-item-inner">
                                <div className="experience-item-thumbnail">
                                    <FontAwesomeIcon icon={faBook} className="icon" />
                                </div>
                                <h3>User Verification</h3>
                                <button className='button-button' onClick={() => navigate('/UserVerification')}>View</button>
                            </div>
                        </div>

                        <div className="experience-item padd-15">
                            <div className="experience-item-inner">
                                <div className="experience-item-thumbnail">
                                    <FontAwesomeIcon icon={faBook} className="icon" />
                                </div>
                                <h3>Suspend Recipes</h3>
                                <button className='button-button' onClick={() => navigate('/SuspendRecipesPost')}>Suspend</button>
                            </div>
                        </div>

                        

                    </div>
                </div>
            </section>

            <footer>
                <h1>Foolish Developer</h1>
                <p className="description">
                    Foolish Developer is a blog website where you will find great tutorial on <br /> web design and development. 
                    Here each tutorial is beautifully described <br />step by step with the required source code and experience. 
                </p>
                <p className="copyright">Copyright &copy; 2024 All Rights Reserved</p>
            </footer>
        </div>
    );
}

export default SystemAdminMainAcc;
