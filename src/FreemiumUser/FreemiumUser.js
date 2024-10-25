import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';
import '../Main/Styles.css';
import pic1 from '../Images/pic1.webp';

function FreemiumUser() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    handleNavToggle(); // Call the function from script.js after component mounts
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true }); // Redirect to login if user is not authenticated
    }
  }, [user, navigate]);

  const handleButtonClick = () => {
    setUser(null); // Clear user context
    navigate('/login', { replace: true }); // Redirect to login and replace history
  };

  const handleClick = (route) => {
    navigate(`/${route}`);
  }

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
                    <li className="nav-item"><Link to="#" className="nav-link">About Us</Link></li>
                    <li className="nav-item"><Link to="/RecipesPost2" className="nav-link">Recipes</Link></li>
                    <li className="nav-item"><Link to="/MealPlans2" className="nav-link">Meal Plan</Link></li>
                    <li className="nav-item"><Link to="/LearningContentPost" className="nav-link">Learnning Content</Link></li>
                    <li className="nav-item"><Link to="/BlogPosts2" className="nav-link">Blogs</Link></li>


                    {/* User Icon with Dropdown */}
                    <li className="nav-item nav-user">
                        <a href="#" className="nav-link">
                            <FontAwesomeIcon icon={faUser} />
                        </a>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item" onClick={() => handleClick('./FreemiumViewAccount')}>My Account</li>
                            <li className="dropdown-item" onClick={() => handleClick('./FreemiumTrackBodyWeight')}>Track Weight Measurements</li>
                            <li className="dropdown-item" onClick={() => handleClick('./FreemiumBMICalculate')}>BMI Calculator</li>
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
            <h2 className="section-title padd-15">Record Food Consumption and calories</h2>
              <div className="experience-items row">

                <div className="experience-item padd-15">
                    <div className="experience-item-inner">
                        <div className="experience-item-thumbnail">
                            <FontAwesomeIcon icon={faBook} className="icon" />
                        </div>
                            <h3>User Verification</h3>
                        <button className='button-button' onClick={() => navigate('/RecordFoodConsumption')}>View</button>
                    </div>
                </div>


              </div>
          </div>
      </section>

      <footer>
        <h1>Foolish Developer</h1>
        <p className="description">
          Foolish Developer is a blog website where you will find great tutorial on <br></br> web design and development.
          Here each tutorial is beautifully described <br></br>step by step with the required source code and experience.
        </p>
        <p>© Copyright: Foolish Developer</p>
      </footer>
    </div>
  );
}

export default FreemiumUser;
