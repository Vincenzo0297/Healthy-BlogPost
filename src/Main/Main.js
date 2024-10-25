import React, { useEffect } from 'react';
import './Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { FaArrowUp } from 'react-icons/fa'; // Import the arrow from react-icons
import { faCode, faBook, faFootballBall  } from '@fortawesome/free-solid-svg-icons'; // Import the FontAwesome icons
import { handleNavToggle } from '../Main/Script'; // Ensure this path is correct
import pic1 from '../Images/pic1.webp'; // Adjust the path based on your project structure

function Main() {
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

      <main className="about section" id="#">
        <div className="container">
            <div className="row">
                <div className="about-content padd-15">
                    <div className="row">
                        <div className="about-text padd-15">    
                            <h2>Welcome to NutriTrack</h2>
                            <p>
                              NutriTrack is an innovative health and wellness platform designed to help individuals 
                              monitor and improve their nutritional intake. By providing personalized meal plans, tracking 
                              daily food consumption, and offering insights based on dietary preferences and health goals. 
                              NutriTrack empowers users to make informed choices about their nutrition. Whether aiming for 
                              weight loss, muscle gain, or simply a healthier lifestyle, NutriTrack combines cutting-edge 
                              technology with expert nutritional advice to support users on their journey to optimal health.
                            </p>
                            <div className="center">
                                <a href="./CreateAccount" target="" class="btn btn-default">Get Started</a>
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="about-img padd-15">
                      <img src={pic1} alt="Pic1" />
                  </div>
                </div>
            </div>
        </main>

        <section className="experience" id="experience">
          <div className="container">
            <h2 className="section-title padd-15">About NutriTrack</h2>
              <div className="experience-items row">

                <div className="experience-item padd-15">
                  <div className="experience-item-inner">
                    <div className="experience-item-thumbnail">
                      <FontAwesomeIcon icon={faCode} className="icon" />
                    </div>
                    <h1>Our Team</h1>
                    <p>
                      Our team is composed of experienced nutritionists, health experts, 
                      and tech innovators who are deeply committed to your well-being. We bring together 
                      diverse expertise to create a comprehensive platform that supports your nutritional 
                      journey and helps you achieve your health goals.
                    </p>
                  </div>
                </div>

                <div className="experience-item padd-15">
                  <div className="experience-item-inner">
                    <div className="experience-item-thumbnail">
                      <FontAwesomeIcon icon={faBook} className="icon" />
                    </div>
                    <h1>Our Mission</h1>
                    <p>
                      Our mission is to empower individuals to lead healthier, more fulfilling lives 
                      through personalized nutrition guidance and cutting-edge tracking tools. We strive to make healthy 
                      eating accessible and enjoyable, providing the resources and support you need to make informed 
                      dietary choices and sustain long-term wellness.
                    </p>
                  </div>
                </div>

                <div className="experience-item padd-15">
                  <div className="experience-item-inner">
                    <div className="experience-item-thumbnail">
                      <FontAwesomeIcon icon={faFootballBall} className="icon" />
                    </div>
                    <h1>Contact Us</h1>
                    <p>
                      We'd love to hear from you! Whether you have questions, feedback, or need assistance, our team is here 
                      to help.
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </section>
     
     
        <section class="contact" id="contact">
            <div class="container">
                <h2 class="section-title padd-15">Please give us your feedback</h2>
                <div class="row">
                    <div class="contact-box padd-15">
                        <div class="contact-data">
                         
                            <div class="contact-information">
                                <h3 class="contact-subtitle">Contact Us</h3>
                                <span class="contact-description"><i class="lni lni-phone contact-icon"></i> (123) 456-7890 </span>
                            </div>

                          
                            <div class="contact-information">
                                <h3 class="contact-subtitle">Email</h3>
                                <span class="contact-description"><i class="lni lni-user contact-icon"></i>support@nutritrack.com</span>
                            </div>

                         
                            <div class="contact-information">
                                <h3 class="contact-subtitle">Home Address</h3>
                                <span class="contact-description"><i class="lni lni-home contact-icon"></i>NutriTrack Inc., 123 Wellness Way, Healthytown, HT 45678</span>
                            </div>
                        </div>
                    </div>

                    <form action="https://formspree.io/f/mlekrjgd" method="POST" className="contact-form">
                      <div className="contact-inputs">
                        <div className="contact-content">
                          <input type="name" name="Name" className="contact-input" required />
                          <label htmlFor="" className="contact-label">Enter Your Name</label>  
                        </div>
                        
                        <div className="contact-content">
                          <input type="email" name="Email" className="contact-input" required />
                          <label htmlFor="" className="contact-label">Enter Your Email</label>
                        </div>

                        <div className="contact-content contact-area">
                          <textarea name="Message" cols="30" rows="10" className="contact-input" required></textarea>
                          <label htmlFor="" className="contact-label">Drop Your Message</label>
                        </div>
                      </div>
                      <button type="submit" className="button-button">Send</button>
                      <button type="reset" className="button-button">Reset</button>
                    </form>
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

        <a href="#" className="top">
          <FaArrowUp />
        </a>
    </div>
    
  );
}

export default Main;
