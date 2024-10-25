import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDocs, addDoc, collection, where, query } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore and Storage instances
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';
import './styles.css';

function UserAccount() {
    useEffect(() => {
        handleNavToggle(); // Call the function from script.js after component mounts
      }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [date, setDate] = useState('');
    const [gender, setGender] = useState('');
    const [dietaryPreference, setDietaryPreference] = useState('');
    const [allergiesrestrictions='', setAllergiesRestriction] = useState('');
    const [healthGoal, setHealthGoal] = useState('');
    const [weight, setWeight] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
    const [dateError, setDateError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [dietaryPreferenceError, setDietaryPreferenceError] = useState('');
    const [allergiesrestrictionsError, setAllergiesrestrictionsError] = useState('');
    const [healthGoalError, setHealthGoalError] = useState('');
    const [weightError, setWeightError] = useState('');

    const navigate = useNavigate();

    const validate = () => {
        let isValid = true;

        if (name.trim() === '') {
            setNameError('Name is required');
            isValid = false;
        } else if (name.length < 6) {
            setNameError('Name must be at least 6 characters');
            isValid = false;
        } else {
            setNameError('');
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            setEmailError('Email is required');
            isValid = false;
        } else if (!emailPattern.test(email)) {
            setEmailError('Invalid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (date.trim() === '') {
            setDateError('Date of Birth is required');
            isValid = false;
        } else {
            setDateError('');
        }

        if (gender.trim() === '') {
            setGenderError('Gender is required');
            isValid = false;
        } else {
            setGenderError('');
        }

        if (dietaryPreference.trim() === '') {
            setDietaryPreferenceError('Dietary Preference is required');
            isValid = false;
        } else {
            setDietaryPreferenceError('');
        }

        if (allergiesrestrictions.trim() === '') {
            setAllergiesrestrictionsError('Allergies are required');
            isValid = false;
        } else {
            setAllergiesrestrictionsError('');
        }

        if (healthGoal.trim() === '') {
            setHealthGoalError('Health Goal is required');
            isValid = false;
        } else {
            setHealthGoalError('');
        }
        
        if (weight.trim() === '') {
            setWeightError('Weight is required');
            isValid = false;
        } else if (isNaN(weight) || weight <= 0) {
            setWeightError('Please enter a valid positive weight');
            isValid = false;
        } else if (weight < 10) {
            setWeightError('Weight cannot be a single digit');
            isValid = false;
        } else {
            setWeightError('');
        }      

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;
        if (password.trim() === '') {
            setPasswordError('Password is required');
            isValid = false;
        } else if (!passwordPattern.test(password)) {
            setPasswordError('Password not strong enough');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (password !== repeatPassword) {
            setRepeatPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setRepeatPasswordError('');
        }

        return isValid;
    };

    const signup = async () => {
        if (!validate()) {
            return;
        }

        const dbref = collection(db, 'Auth');
        const matchEmail = query(dbref, where('Email', '==', email));

        try {
            const snapshot = await getDocs(matchEmail);
            const emailMatchingArray = snapshot.docs.map((doc) => doc.data());

            if (emailMatchingArray.length > 0) {
                alert('This Email Address Already Exists');
            } else {
                const userType = 'PremiumUser'; // Set userType to PremiumUser directly
                await addDoc(dbref, {
                    Name: name,
                    Email: email,
                    Password: password,
                    Date: date,
                    Gender: gender,
                    DietaryPreference: dietaryPreference,
                    Allergies: allergiesrestrictions,
                    HealthGoal: healthGoal,
                    Weight: weight,
                    status: 'verified',
                    UserType: userType // Store the userType
                });
                alert('Sign Up Successfully');
                navigateToUserTypePage(userType); // Pass the userType
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const navigateToUserTypePage = (UserType) => {
        switch (UserType) {
            case 'PremiumUser':
                navigate('/FreemiumUser');
                break;
            default:
                navigate('/');
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
                            <li className="nav-item"><a href="/Main" className="nav-link">Home</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">About Us</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Recipes</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Meal Plans</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Educational Content</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Blogs</a></li>              
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

            <div className='login-container'>
                <div className='form'>
                    <h2 className='UserAccount-title'>Sign In As a User</h2>
                    <div className='box'>
                        <p>Name</p>
                        <input type='text' placeholder='Add your Fullname' onChange={(e) => setName(e.target.value)} />
                        {nameError && <p className='error'>{nameError}</p>}
                    </div>

                    <div className='box'>
                        <p>Email</p>
                        <input type='email' placeholder='Add your Email' onChange={(e) => setEmail(e.target.value)} />
                        {emailError && <p className='error'>{emailError}</p>}
                    </div>

                    <div className='box'>
                        <p>Date of Birth</p>
                        <input type='date' onChange={(e) => setDate(e.target.value)} />
                        {dateError && <p className='error'>{dateError}</p>}
                    </div>

                    <div className='box'>
                        <p>Select your Gender</p>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value=''>Select Gender</option>
                            <option value='M'>Male</option>
                            <option value='F'>Female</option>
                            <option value='NB'>Non-Binary</option>
                        </select>
                        {genderError && <p className='error'>{genderError}</p>}
                    </div>

                    <div className='box'>
                        <p>Password</p>
                        <input type='password' placeholder='Add your Password' onChange={(e) => setPassword(e.target.value)} />
                        {passwordError && <p className='error'>{passwordError}</p>}
                    </div>

                    <div className='box'>
                        <p>Repeat Password</p>
                        <input type='password' placeholder='Repeat your Password' onChange={(e) => setRepeatPassword(e.target.value)} />
                        {repeatPasswordError && <p className='error'>{repeatPasswordError}</p>}
                    </div>

                    <div className='box'>
                        <p>Dietary Preference</p>
                        <select value={dietaryPreference} onChange={(e) => setDietaryPreference(e.target.value)}>
                            <option value=''>Select Dietary Preference</option>
                            <option value='Vegan'>Vegan</option>
                            <option value='Vegetarian'>Vegetarian</option>
                            <option value='Pescatarian'>Pescatarian</option>
                            <option value='Omnivore'>Omnivore</option>
                            <option value='Nil'>Nil</option>
                        </select>
                        {dietaryPreferenceError && <p className='error'>{dietaryPreferenceError}</p>}
                    </div>

                    <div className='box'>
                        <p>Select Your Allergies & Restrictions</p>
                        <select value={allergiesrestrictions} onChange={(e) => setAllergiesRestriction(e.target.value)}>
                            <option value=''>Select Allergies & Restriction</option>
                            <option value='Nuts'>Nuts</option>
                            <option value='Dairy'>Dairy</option>
                            <option value='Gluten'>Gluten</option>
                            <option value='Shellfish'>Shellfish</option>
                            <option value='Nil'>Nil</option>
                        </select>
                        {allergiesrestrictionsError && <p className='error'>{allergiesrestrictionsError}</p>}
                    </div>

                    <div className='box'>
                        <p>Select Your Heath Goal</p>
                        <select value={healthGoal} onChange={(e) => setHealthGoal(e.target.value)}>
                            <option value=''>Select Health Goal</option>
                            <option value='Lose Weight'>Lose Weight</option>
                            <option value='Maintain Weight'>Maintain Weight</option>
                            <option value='Gain Muscle'>Gain Muscle</option>
                            <option value='Improve Overall Health'>Improve Overall Health</option>
                        </select>
                        {healthGoalError && <p className='error'>{healthGoalError}</p>}
                    </div>

                    <div className='box'>
                        <p>Weight</p>
                        <input type='text' placeholder='Add your Weight (kg)' onChange={(e) => setWeight(e.target.value)} />
                        {weightError && <p className='error'>{weightError}</p>}
                    </div>

                    <p><Link to='/CreateAccount'>Back</Link></p>
                    <button onClick={signup}>Create Account</button>
                    <p>Already Have An Account?<Link to='/login'>Login</Link></p>
                </div>
            </div>

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
};

export default UserAccount;
