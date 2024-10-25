import React, { useEffect } from 'react';
import {  Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';
import '../Functionalities/ViewUserProfile.css';
import pic2 from '../Images/pic2.jfif';
import pic3 from '../Images/pic3.png';
import pic5 from '../Images/pic5.png';

function UserProfileManagement() {
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
                    <li className="nav-item"><a href="/Main" className="nav-link">Home</a></li>
                    <li className="nav-item"><a href="/RecipesIntro" className="nav-link">Recipes</a></li>
                    <li className="nav-item"><a href="/MealPlanIntro" className="nav-link">Meal Plans</a></li>
                    <li className="nav-item"><a href="/LearningContentIntro" className="nav-link">Educational Content</a></li>
                    <li className="nav-item"><a href="/Login" className="nav-link">Login</a></li>                             
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
              <h2 class="UserAccount-title padd-15">Sign In Your Account</h2>
                <div class="project-items row">
                    <div class="project-item padd-15" data-category="coding">
                        <div class="project-item-inner">
                            <div class="project-item-thumbnail">
                            <Link to="/UserAccount">
                                <img src={pic2} alt="Pic2" />
                            </Link>
                            </div>
                              <span class="term">User</span>     
                         </div>
                    </div>

                    <div class="project-item padd-15" data-category="coding">
                        <div class="project-item-inner">
                              <div class="project-item-thumbnail">
                              <Link to="/BusinessUserAccount">
                                  <img src={pic5} alt="Pic5" />
                              </Link>
                              </div>
                                  <span class="term">Business User</span>
                        </div>
                    </div>

                    <div class="project-item padd-15" data-category="others">
                        <div class="project-item-inner">
                            <div class="project-item-thumbnail">
                              <Link to="/DietitiansUserAccount">
                                  <img src={pic3} alt="Pic3" />
                              </Link>
                              </div>
                                <span class="term">Dietitians</span>
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

export default UserProfileManagement;