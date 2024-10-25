import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDocs, addDoc, collection, where, query } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore and Storage instances
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';
import './styles.css';

function BusinessUserAccount() {
    useEffect(() => {
        handleNavToggle(); // Call the function from script.js after component mounts
    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [date, setDate] = useState('');
    const [gender, setGender] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [uen, setUen] = useState('')
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
    const [dateError, setDateError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [contactNumberError, setContactNumberError] = useState('');
    const [uenError, setUenError] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');
    const [companyAddressError, setCompanyAddressError] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');

    const navigate = useNavigate();

    const validate = () => {
        let isValid = true;

        // Name validation
        if (name.trim() === '') {
            setNameError('Name is required');
            isValid = false;
        } else if (name.length < 6) {
            setNameError('Name must be at least 6 characters');
            isValid = false;
        } else {
            setNameError('');
        }

        // Email validation
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

        // Password validation
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

        // Repeat password validation
        if (password !== repeatPassword) {
            setRepeatPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setRepeatPasswordError('');
        }

        // Date validation
        if (date.trim() === '') {
            setDateError('Date of Birth is required');
            isValid = false;
        } else {
            setDateError('');
        }

        // Gender validation
        if (gender.trim() === '') {
            setGenderError('Gender is required');
            isValid = false;
        } else {
            setGenderError('');
        }

        // Contact number validation
        const phonePattern = /^[0-9]{8}$/; // Pattern to match exactly 8 digits
        if (contactNumber.trim() === '') {
            setContactNumberError('Contact Number is required');
            isValid = false;
        } else if (!phonePattern.test(contactNumber)) {
            setContactNumberError('Invalid Contact Number');
            isValid = false;
        } else {
            setContactNumberError('');
        }

           // UEN validation
        if (uen.trim() === '') {
            setUenError('UEN is required');
            isValid = false;
        } else if (uen.length < 9 || uen.length > 10) {
            setUenError('UEN must be 9 or 10 characters');
            isValid = false;
        } else {
            setUenError('');
        }
    
        // Company name validation
        if (companyName.trim() === '') {
            setCompanyNameError('Company Name is required');
            isValid = false;
        } else {
            setCompanyNameError('');
        }

        // Company address validation
        if (companyAddress.trim() === '') {
            setCompanyAddressError('Company Address is required');
            isValid = false;
        } else {
            setCompanyAddressError('');
        }

        // Postal code validation
        if (postalCode.trim() === '') {
            setPostalCodeError('Postal Code is required');
            isValid = false;
        } else if (!/^\d{5}$/.test(postalCode)) {
            setPostalCodeError('Invalid Postal Code');
            isValid = false;
        } else {
            setPostalCodeError('');
        }

        return isValid;
    };

    const login = async () => {
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
                const userType = 'BusinessUser'; // Set userType to PremiumUser directly
                await addDoc(dbref, {
                    Name: name,
                    Email: email,
                    Password: password,
                    Date: date,
                    Gender: gender,
                    uen: uen,
                    ContactNumber: contactNumber,
                    CompanyName: companyName,
                    CompanyAddress: companyAddress,
                    PostalCode: postalCode,
                    status: 'pending', // Set to 'pending'
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
            case 'BusinessUser':
                navigate('/BusinessUser');
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

            <div className='login-container'>
                <div className='form'>
                    <h2 className='UserAccount-title'>Sign In As a Business User</h2>
                    
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
                        <p>Password</p>
                        <input type='password' placeholder='Add your password' onChange={(e) => setPassword(e.target.value)} />
                        {passwordError && <p className='error'>{passwordError}</p>}
                    </div>

                    <div className='box'>
                        <p>Repeat Password</p>
                        <input type='password' placeholder='Repeat your password' onChange={(e) => setRepeatPassword(e.target.value)} />
                        {repeatPasswordError && <p className='error'>{repeatPasswordError}</p>}
                    </div>

                    <div className='box'>
                        <p>Date of Birth</p>
                        <input type='date' placeholder='Add your Date of Birth' onChange={(e) => setDate(e.target.value)} />
                        {dateError && <p className='error'>{dateError}</p>}
                    </div>

                    <div className='box'>
                        <p>Gender</p>
                        <select onChange={(e) => setGender(e.target.value)}>
                            <option value=''>Select your Gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>
                        {genderError && <p className='error'>{genderError}</p>}
                    </div>

                    <div className='box'>
                        <p>Contact Number</p>
                        <input type='tel' placeholder='Add your Contact Number' onChange={(e) => setContactNumber(e.target.value)} />
                        {contactNumberError && <p className='error'>{contactNumberError}</p>}
                    </div>

                    <div className='box'>
                        <p>UEN (Unique Entity Number)</p>
                        <input type='text' placeholder='Add your UEN' onChange={(e) => setUen(e.target.value)} />
                        {uenError && <p className='error'>{uenError}</p>}
                    </div>

                    <div className='box'>
                        <p>Company Name</p>
                        <input type='text' placeholder='Add your Company Name' onChange={(e) => setCompanyName(e.target.value)} />
                        {companyNameError && <p className='error'>{companyNameError}</p>}
                    </div>

                    <div className='box'>
                        <p>Company Address</p>
                        <input type='text' placeholder='Add your Company Address' onChange={(e) => setCompanyAddress(e.target.value)} />
                        {companyAddressError && <p className='error'>{companyAddressError}</p>}
                    </div>

                    <div className='box'>
                        <p>Postal Code</p>
                        <input type='text' placeholder='Add your Postal Code' onChange={(e) => setPostalCode(e.target.value)} />
                        {postalCodeError && <p className='error'>{postalCodeError}</p>}
                    </div>
                    <button onClick={login}>Sign In Your Account</button>
                    <p>Don't Have An Account?<Link to='/CreateAccount'>Create Account</Link></p>
       
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
}

export default BusinessUserAccount;
