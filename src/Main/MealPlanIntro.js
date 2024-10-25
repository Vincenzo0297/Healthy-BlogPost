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
            <div className="meal-plan-container">
            <h2>Discover Personalized Meal Plans</h2>
            <p>
                At NutriTrack, our certified dietitians offer tailored meal plans to meet your specific health goals. Whether you're
                aiming to lose weight, build muscle, or just maintain a healthy lifestyle, our meal plans are designed to provide balanced nutrition
                that fits your preferences and lifestyle.
            </p>
            <p>
                Each meal plan is curated based on your dietary needs, whether you're vegan, keto, or anything in between. By signing up, 
                you'll gain access to meal plans that are simple to follow, nutritionally balanced, and delicious.
            </p>
            <p>
                Sign up today and get started with a meal plan that's perfect for you, created by experts to help you stay on track with your health goals.
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