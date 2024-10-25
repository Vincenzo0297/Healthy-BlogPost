import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { doc, updateDoc, query, collection, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import '../Functionalities/ViewAccount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';

function FreemiumViewAccount() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    Name: user.Name,
    Email: user.Email,
    Password: '',
    Gender: user.Gender,
    UserType: user.UserType,
    DietaryPreference: user.DietaryPreference || '',
    AllergiesRestrictions: user.AllergiesRestrictions || '',
    HealthGoal: user.HealthGoal || '',
    Weight: user.Weight || '',
  });
  const [errors, setErrors] = useState({});

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleButtonClick = () => {
    setUser(null);
    navigate('/login', { replace: true });
  };

  const handleClick = (route) => {
    navigate(`/${route}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!updatedUser.Name.trim()) {
      newErrors.Name = 'Name is required';
    } else if (updatedUser.Name.trim().length < 6) {
      newErrors.Name = 'Name must be 6 characters or longer';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(updatedUser.Email)) {
      newErrors.Email = 'Email is not valid';
    }

    if (updatedUser.Password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/.test(updatedUser.Password)) {
      newErrors.Password = 'Password must contain at least one lowercase letter, one uppercase letter, one special character, and be at least 6 characters long';
    }

        // DietaryPreference validation
    if (!updatedUser.DietaryPreference) {
        newErrors.DietaryPreference = 'Dietary preference is required';
    }
    
    // AllergiesRestrictions validation
    if (!updatedUser.AllergiesRestrictions) {
        newErrors.AllergiesRestrictions = 'Allergies and restrictions are required';
    }
    
    // Weight validation
    if (!updatedUser.Weight) {
        newErrors.Weight = 'Weight is required';
    } else if (isNaN(updatedUser.Weight) || updatedUser.Weight <= 0) {
        newErrors.Weight = 'Weight must be a positive number';
    }
    
    // HealthGoal validation
    if (!updatedUser.HealthGoal.trim()) {
        newErrors.HealthGoal = 'Health goal is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    if (!user.id) {
      alert('User ID is missing');
      return;
    }

    if (!validate()) {
      return;
    }

    try {
      const userRef = doc(db, 'Auth', user.id);

      const emailQuery = query(collection(db, 'Auth'), where('Email', '==', updatedUser.Email));
      const emailSnapshot = await getDocs(emailQuery);

      if (emailSnapshot.docs.length > 0 && emailSnapshot.docs[0].id !== user.id) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          Email: 'This email address is already in use',
        }));
        return;
      }

      const updatedUserData = { ...updatedUser };
      if (!updatedUserData.Password) {
        delete updatedUserData.Password;
      }
      await updateDoc(userRef, updatedUserData);
      setUser({ ...user, ...updatedUser, Password: '' });
      setIsEditing(false);
      alert('Account updated successfully');
    } catch (error) {
      alert('Failed to update account: ' + error.message);
    }
  };

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

      <div className="view-account">
        <h2>Your Account as User Personal Details</h2>
        {user ? (
          <>
            {isEditing ? (
              <form>
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>
                        <input type="text" name="Name" value={updatedUser.Name} onChange={handleInputChange} />
                        {errors.Name && <span className="error">{errors.Name}</span>}
                      </td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>
                        <input type="email" name="Email" value={updatedUser.Email} onChange={handleInputChange} />
                        {errors.Email && <span className="error">{errors.Email}</span>}
                      </td>
                    </tr>
                    <tr>
                      <th>Password</th>
                      <td>
                        <input type="password" name="Password" value={updatedUser.Password} onChange={handleInputChange} />
                        {errors.Password && <span className="error">{errors.Password}</span>}
                      </td>
                    </tr>
                    <tr>
                    <th>Dietary Preference</th>
                        <td>
                            <select name="DietaryPreference" value={updatedUser.DietaryPreference} onChange={handleInputChange}>
                                <option value="">Select Dietary Preference</option>
                                <option value="None">None</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Pescatarian">Pescatarian</option>
                                <option value="Paleo">Paleo</option>
                                <option value="Keto">Keto</option>
                                <option value="Omnivore">Omnivore</option>
                            </select>
                            {errors.DietaryPreference && <span className="error">{errors.DietaryPreference}</span>}
                        </td>
                    </tr>
                    <tr>
                        <th>Allergies & Restrictions</th>
                        <td>
                            <select name="AllergiesRestrictions" value={updatedUser.AllergiesRestrictions} onChange={handleInputChange}>
                                <option value="">Select Allergies/Restrictions</option>
                                <option value="None">None</option>
                                <option value="Gluten-Free">Gluten-Free</option>
                                <option value="Dairy-Free">Dairy-Free</option>
                                <option value="Nut-Free">Nut-Free</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Keto">Keto</option>
                            </select>
                            {errors.AllergiesRestrictions && <span className="error">{errors.AllergiesRestrictions}</span>}
                        </td>
                    </tr>
                    <tr>
                        <th>Health Goal</th>
                        <td>
                            <select name="HealthGoal" value={updatedUser.HealthGoal} onChange={handleInputChange}>
                                <option value="">Select Health Goal</option>
                                <option value="Weight Loss">Weight Loss</option>
                                <option value="Muscle Gain">Muscle Gain</option>
                                <option value="Maintain Weight">Maintain Weight</option>
                                <option value="Improve Fitness">Improve Fitness</option>
                                <option value="Increase Energy">Increase Energy</option>
                                <option value="Manage Diabetes">Manage Diabetes</option>
                            </select>
                            {errors.HealthGoal && <span className="error">{errors.HealthGoal}</span>}
                        </td>
                    </tr>
                    <tr>
                      <th>Weight</th>
                      <td>
                        <input type="number" name="Weight" value={updatedUser.Weight} onChange={handleInputChange} />
                        {errors.Weight && <span className="error">{errors.Weight}</span>}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="button-button" onClick={handleUpdateClick}>Save</button>
              </form>
            ) : (
              <>
                <table>
                  <tbody>
                    <tr>
                      <th>User Type</th>
                      <td>{user.UserType}</td>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <td>{user.Name}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{user.Email}</td>
                    </tr>
                    <tr>
                      <th>Date of Birth</th>
                      <td>{user.Date}</td>
                    </tr>
                    <tr>
                      <th>Dietary Preference</th>
                      <td>{user.DietaryPreference}</td>
                    </tr>
                    <tr>
                        <th>Allergies & Restriction</th>
                        <td>{user.Allergies}</td>
                    </tr>
                    <tr>
                        <th>Health Goal</th>
                        <td>{user.HealthGoal}</td>
                    </tr>
                    <tr>
                        <th>Weight</th>
                        <td>{user.Weight}</td>
                    </tr>
                  </tbody>
                </table>
                <button className="button-button" onClick={handleEditClick}>Update</button>
                <button className="button-button" onClick={handleBackClick}>Back</button>
              </>
            )}
          </>
        ) : (
          <p>No user data available</p>
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

export default FreemiumViewAccount;
