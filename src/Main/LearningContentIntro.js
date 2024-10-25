import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';
import '../Functionalities/ViewUserProfile.css';

function MealPlanIntro() {
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

        <section>
            <div className="learning-content-container">
                <h2>Empower Yourself with Learning Content</h2>
                <p>
                    NutriTrack isn't just about food; it's about learning. Our platform offers expert-created educational content designed
                    to guide you through understanding the importance of nutrition, wellness, and healthy lifestyle choices.
                </p>
                <p>
                    Whether you're looking for advice on meal prep, understanding macronutrients, or learning the science behind healthy eating, 
                    our learning content is here to empower you with the knowledge you need to succeed in your health journey.
                </p>
                <p>
                    Unlock premium learning content by signing up today, and take control of your nutrition with the guidance of experts.
                </p>
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

export default MealPlanIntro;