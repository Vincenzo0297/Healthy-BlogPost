import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function FreemiumBMICalculate() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [advice, setAdvice] = useState('');
  const navigate = useNavigate();
  const {setUser } = useContext(UserContext); // Use the logged-in user info

  useEffect(() => {
    handleNavToggle();
  }, []);

  const handleClick = (route) => {
    navigate(`/${route}`);
  };

  const handleButtonClick = () => {
    setUser(null); 
    navigate('/login', { replace: true }); 
  };

  // Calculate BMI
  const calculateBMI = () => {
    const heightInMeters = height / 100; // Convert height from cm to meters
    const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2); // BMI formula
    setBmi(calculatedBmi);
    determineHealthRange(calculatedBmi); // Set advice based on the BMI value
  };

  // Determine health range and give advice
  const determineHealthRange = (calculatedBmi) => {
    if (calculatedBmi < 18.5) {
      setAdvice('Underweight. It’s important to eat a balanced diet and consider consulting a healthcare provider.');
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
      setAdvice('Healthy weight. Keep up the good work with a balanced diet and regular exercise.');
    } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
      setAdvice('Overweight. Consider adopting healthier eating habits and increasing physical activity.');
    } else {
      setAdvice('Obese. It’s recommended to consult a healthcare provider for guidance.');
    }
  };

  return (
    <div>
        <header className="header" id="header">
        <nav className="nav container">
            <a href="#" className="nav-logo"> <h2>NutriTrack</h2> </a>
            <div className="nav-menu" id="nav-menu">
                <ul className="nav-list">
                    <li className="nav-item"><Link to="#" className="nav-link">About Us</Link></li>
                    <li className="nav-item"><Link to="/RecipesPost2" className="nav-link">Recipes</Link></li>
                    <li className="nav-item"><Link to="/MealPlans2" className="nav-link">Meal Plan</Link></li>
                    <li className="nav-item"><Link to="/LearningContentPost" className="nav-link">Learnning Content</Link></li>
                    <li className="nav-item"><Link to="/BlogPosts2" className="nav-link">Blogs</Link></li>

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
                <div className="nav-close" id="nav-close">
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>

            <div className="nav-btn">
                <div className="nav-toggle" id="nav-toggle">
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
        </nav>
    </header>

    <div className='view-account'>
        <h2>BMI Calculator</h2>
        <div>
            <label>Height (cm): </label>
            <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
            />
        </div>
        <div>
            <label>Weight (kg): </label>
            <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
            />
        </div>
        <button onClick={calculateBMI}>Calculate</button>

        {bmi && (
            <div>
            <h3>Your BMI: {bmi}</h3>
            <p>{advice}</p>
            </div>
        )}
        </div>

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

export default FreemiumBMICalculate;
