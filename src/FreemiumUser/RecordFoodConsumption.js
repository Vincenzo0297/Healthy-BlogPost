import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function RecordFoodConsumption() {
  const navigate = useNavigate();
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [servingUnit, setServingUnit] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fats, setFats] = useState('');
  const [foodHistory, setFoodHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const { user, setUser } = useContext(UserContext);

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

  const handleFoodNameChange = (e) => {
    setFoodName(e.target.value);
  };

  const handleCaloriesChange = (e) => {
    setCalories(e.target.value);
  };

  const handleServingUnitChange = (e) => {
    setServingUnit(e.target.value);
  };

  const handleCarbsChange = (e) => {
    setCarbs(e.target.value);
  };

  const handleProteinChange = (e) => {
    setProtein(e.target.value);
  };

  const handleFatsChange = (e) => {
    setFats(e.target.value);
  };

  const handleSaveFood = async () => {
    const parsedCalories = parseFloat(calories);
    const parsedCarbs = parseFloat(carbs);
    const parsedProtein = parseFloat(protein);
    const parsedFats = parseFloat(fats);

    if (isNaN(parsedCalories) || parsedCalories <= 0 || isNaN(parsedCarbs) || isNaN(parsedProtein) || isNaN(parsedFats)) {
      alert('Please enter valid data for all fields.');
      return;
    }

    try {
      const foodData = {
        foodName,
        calories: parsedCalories,
        servingUnit,
        carbs: parsedCarbs,
        protein: parsedProtein,
        fats: parsedFats,
        date: new Date().toLocaleDateString(),
        userId: user.id,
      };
      await addDoc(collection(db, 'FoodHistory'), foodData);
      setFoodName('');
      setCalories('');
      setServingUnit('');
      setCarbs('');
      setProtein('');
      setFats('');
      alert('Food consumption recorded successfully!');
      fetchFoodHistory();
    } catch (error) {
      console.error('Error saving food consumption: ', error);
      alert('Failed to save food consumption.');
    }
  };

  const fetchFoodHistory = async () => {
    try {
      const q = query(collection(db, 'FoodHistory'), where('userId', '==', user.id));
      const querySnapshot = await getDocs(q);
      const history = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFoodHistory(history);
    } catch (error) {
      console.error('Error fetching food history: ', error);
    }
  };

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory) {
      fetchFoodHistory();
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      await deleteDoc(doc(db, 'FoodHistory', id));
      setFoodHistory(foodHistory.filter(entry => entry.id !== id));
      alert('Record deleted successfully!');
    } catch (error) {
      console.error('Error deleting record: ', error);
      alert('Failed to delete the record.');
    }
  };

  // Pie chart data for macronutrients breakdown
  const totalCarbs = foodHistory.reduce((sum, item) => sum + item.carbs, 0);
  const totalProtein = foodHistory.reduce((sum, item) => sum + item.protein, 0);
  const totalFats = foodHistory.reduce((sum, item) => sum + item.fats, 0);
  const totalMacronutrients = totalCarbs + totalProtein + totalFats;

  const pieChartData = {
    labels: ['Carbs', 'Protein', 'Fats'],
    datasets: [
      {
        label: 'Macronutrients',
        data: [
          totalCarbs,
          totalProtein,
          totalFats
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            const percentage = totalMacronutrients > 0 ? ((value / totalMacronutrients) * 100).toFixed(2) : 0;
            return `${label}: ${value}g (${percentage}%)`;
          },
        },
      },
    },
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
          <h2>Record Your Food Consumption</h2>
          <label>Food Name: </label>
          <input
            type="text"
            value={foodName}
            onChange={handleFoodNameChange}
            placeholder="Enter food name"
          />
          <label>Calories: </label>
          <input
            type="number"
            value={calories}
            onChange={handleCaloriesChange}
            placeholder="Enter calories"
          />
          <label>Serving Unit: </label>
          <input
            type="text"
            value={servingUnit}
            onChange={handleServingUnitChange}
            placeholder="Enter serving unit (e.g., grams, pieces)"
          />
          <label>Carbs (g): </label>
          <input
            type="number"
            value={carbs}
            onChange={handleCarbsChange}
            placeholder="Enter carbs in grams"
          />
          <label>Protein (g): </label>
          <input
            type="number"
            value={protein}
            onChange={handleProteinChange}
            placeholder="Enter protein in grams"
          />
          <label>Fats (g): </label>
          <input
            type="number"
            value={fats}
            onChange={handleFatsChange}
            placeholder="Enter fats in grams"
          />
          <button onClick={handleSaveFood}>Save</button>
        </div>

        <div>
            <div>
              <h3>Food Consumption History</h3>
              <ul>
                {foodHistory.length > 0 ? (
                  foodHistory.map((entry, index) => (
                    <li key={index}>
                      {entry.foodName}: {entry.calories} kcal, {entry.carbs}g carbs, {entry.protein}g protein, {entry.fats}g fats on {entry.date}
                      <button onClick={() => handleDeleteRecord(entry.id)} style={{ marginLeft: '10px' }}>Delete</button>
                    </li>
                  ))
                ) : (
                  <p>No food records found.</p>
                )}
              </ul>
            </div>
        </div>

        {/* Pie Chart Section */}
        {foodHistory.length > 0 && (
          <div>
            <h3>Macronutrient Breakdown</h3>
            <Pie data={pieChartData} options={pieChartOptions} />
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

export default RecordFoodConsumption;
