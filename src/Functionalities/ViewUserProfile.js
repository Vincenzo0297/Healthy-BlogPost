import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import './ViewUserProfile.css';
import { handleNavToggle } from '../Main/Script';
import pic2 from '../Images/pic2.jfif';
import pic3 from '../Images/pic3.png';
import pic5 from '../Images/pic5.png';


function UserProfileManagement() {
  const navigate = useNavigate();
  const {setUser } = useContext(UserContext);

  const handleButtonClick = () => {
    setUser(null); // Clear user context
    navigate('/login', { replace: true }); // Redirect to login and replace history
};

  const handleCreateUserProfileClick = () => {
    navigate('/CreateUserProfile');
  };

  useEffect(() => {
    handleNavToggle(); // Call the function from script.js after component mounts
  }, []);

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

      <section class="project" id="projects">
          <div class="container">
              <h2 class="UserAccount-title padd-15">User Profile Management</h2>
                <div class="project-items row">
                    <div class="project-item padd-15" data-category="coding">
                        <div class="project-item-inner">
                            <div class="project-item-thumbnail">
                            <Link to="/UserAccountManagement">
                                <img src={pic2} alt="Pic2" />
                            </Link>
                            </div>
                              <span class="term">User</span>     
                         </div>
                    </div>

                    <div class="project-item padd-15" data-category="coding">
                        <div class="project-item-inner">
                              <div class="project-item-thumbnail">
                              <Link to="/UserAccountManagement2">
                                  <img src={pic5} alt="Pic5" />
                              </Link>
                              </div>
                                  <span class="term">Business User</span>
                        </div>
                    </div>

                    <div class="project-item padd-15" data-category="others">
                        <div class="project-item-inner">
                            <div class="project-item-thumbnail">
                                  <a href="#"> <img src={pic3} alt="Pic3" /></a>
                            </div>
                                <span class="term">Nutritionist</span>
                        </div>
                    </div>
                    <button class="button-button" onClick={handleCreateUserProfileClick}>Create System Administrator Profile</button>
                </div>
            </div>
        </section>

        <footer>
            <h1>Foolish Developer</h1>
            <p class="description">
                Foolish Developer is a blog website where you will find great tutorial on <br></br> web design and development. 
                Here each tutorial is beautifully described <br></br>step by step with the required source code and experience. 
              </p>
            <p>© Copyright: Foolish Developer</p>
        </footer>
    </div>
    
  );
}

export default UserProfileManagement;