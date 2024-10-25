import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import '../Main/Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons'; // Import the FontAwesome icons
import { handleNavToggle } from '../Main/Script';
import pic1 from '../Images/pic1.webp';

function DietitiansUser() {
    useEffect(() => {
      handleNavToggle(); // Call the function from script.js after component mounts
    }, []);

    const navigate = useNavigate();
    const { user, setUser} = useContext(UserContext);

    const handleButtonClick = () => {
      setUser(null); // Clear user context
      navigate('/login', { replace: true }); // Redirect to login and replace history
  }

  const handleClick = (route) => {
    navigate(`/${route}`);
  }

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
                      <li className="nav-item"><Link to="/DietitiansUser" className="nav-link">DashBoard</Link></li>
                      <li className="nav-item"><Link to="#" className="nav-link">Meal Plans</Link></li>

                      {/* User Icon with Dropdown */}
                      <li className="nav-item nav-user">
                          <a href="#" className="nav-link">
                              <FontAwesomeIcon icon={faUser} />
                          </a>
                          <ul className="dropdown-menu">
                              <li className="dropdown-item" onClick={() => handleClick('./DietitiansViewAccount')}>My Account</li>
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

      <main class="about section" id="about">
        <div class="container">
            <div class="row">
                <div class="about-content padd-15">
                    <div class="row">
                        <div class="about-text padd-15">    
                            <h2>Welcome Back</h2>
                            <p>
                                Creating content posts are instrumental in shaping their organization's online presence and communication 
                                strategy. They craft compelling social media updates, informative blog articles, and engaging marketing 
                                materials tailored to resonate with their audience. By leveraging creativity and strategic insights, 
                                they drive engagement, enhance brand visibility, and support key business objectives effectively.
                            </p>
                        </div>
                    </div>
                  </div>

                  <div class="about-img padd-15">
                      <img src={pic1} alt="Pic1" />
                  </div>
                </div>
            </div>
        </main>

      <section class="experience" id="projects">
          <div class="container">
            <h2 class="section-title padd-15">Dietitians Tools</h2>
              <div class="experience-items row">
                <div class="experience-item padd-15">
                  <div class="experience-item-inner">
                    <div class="experience-item-thumbnail">
                      <FontAwesomeIcon icon={faCode} className="icon" />
                    </div>
                    <h3>Meal Plans Management</h3>
                    <button className='button-button' onClick={() => handleClick("DietitiansPost")}>View</button>
                  </div>
                </div>
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

export default DietitiansUser;
