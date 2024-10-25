import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';
import '../Functionalities/ViewUserProfile.css';

function RecipesIntro() {
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
        <div className="recipes-intro-container">
            <h2>Welcome to NutriTrack Recipes</h2>
            <p>
                At NutriTrack, we believe that eating healthy doesn't have to be complicated. Our team of certified dietitians
                carefully creates and posts a variety of delicious, nutrient-packed recipes that cater to your health goals. Whether you're
                looking to lose weight, gain muscle, or simply maintain a balanced diet, our recipes are tailored to suit all types of nutritional needs.
            </p>
            <p>
                To access these expertly crafted recipes and start creating your personalized meal plans, simply sign up for a NutriTrack account.
                Once you're a member, you'll have full access to our growing library of healthy meal ideas, all designed to help you live your healthiest life.
            </p>
            <p>
                Join our community today and let our dietitians guide you with easy-to-follow recipes that make achieving your health goals enjoyable and sustainable.
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

export default RecipesIntro;