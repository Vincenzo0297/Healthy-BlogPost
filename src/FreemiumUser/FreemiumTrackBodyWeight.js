import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';

function FreemiumTrackBodyWeight() {
  const navigate = useNavigate();
  const [weight, setWeight] = useState('');
  const [weightHistory, setWeightHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const { user, setUser } = useContext(UserContext); // Use the logged-in user info

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

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  // Save current weight to the database with user ID
  const handleSaveWeight = async () => {
    const parsedWeight = parseFloat(weight);
    
    if (isNaN(parsedWeight) || parsedWeight < 35) {
      alert('Please enter a valid weight (35kg or more).');
      return;
    }

    try {
      const weightData = {
        weight: parsedWeight,
        date: new Date().toLocaleDateString(),
        userId: user.id, // Add the logged-in user's ID to the record
      };
      await addDoc(collection(db, 'WeightHistory'), weightData);
      setWeight(''); // Clear the input field after saving
      alert('Weight recorded successfully!');
      fetchWeightHistory(); // Refresh the weight history after saving
    } catch (error) {
      console.error('Error saving weight: ', error);
      alert('Failed to save weight.');
    }
  };

  // Fetch weight history for the logged-in user
  const fetchWeightHistory = async () => {
    try {
      const q = query(collection(db, 'WeightHistory'), where('userId', '==', user.id)); // Fetch records only for the logged-in user
      const querySnapshot = await getDocs(q);
      const history = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id // Save the document ID for later deletion
      }));
      setWeightHistory(history);
    } catch (error) {
      console.error('Error fetching weight history: ', error);
    }
  };

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory) {
      fetchWeightHistory();
    }
  };

  // Function to delete a weight record
  const handleDeleteRecord = async (id) => {
    try {
      await deleteDoc(doc(db, 'WeightHistory', id));
      setWeightHistory(weightHistory.filter(entry => entry.id !== id)); // Remove from state
      alert('Record deleted successfully!');
    } catch (error) {
      console.error('Error deleting record: ', error);
      alert('Failed to delete the record.');
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
        <div>
            <h2>Track Your Body Weight</h2>
            <label>Current Weight (kg): </label>
            <input
            type="number"
            value={weight}
            onChange={handleWeightChange}
            placeholder="Enter your weight"
            />
            <button onClick={handleSaveWeight}>Save</button>
        </div>

        <div>
            <button onClick={handleShowHistory}>
            {showHistory ? 'Hide History' : 'Show History'}
            </button>
            {showHistory && (
            <div>
                <h3>Weight History</h3>
                <ul>
                {weightHistory.length > 0 ? (
                    weightHistory.map((entry, index) => (
                    <li key={index}>
                        {entry.weight} kg on {entry.date}
                        <button onClick={() => handleDeleteRecord(entry.id)} style={{ marginLeft: '10px' }}>Delete</button>
                    </li>
                    ))
                ) : (
                    <p>No weight records found.</p>
                )}
                </ul>
            </div>
            )}
        </div>
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

export default FreemiumTrackBodyWeight;
