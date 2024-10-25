import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore and Storage instances
import { UserContext } from '../UserContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const login = async () => {
        const dbref = collection(db, 'Auth');
        try {
            const match = query(dbref, where('Email', '==', email), where('Password', '==', password));
            const snapshot = await getDocs(match);
            const matchingUsers = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            if (matchingUsers.length > 0) {
                const user = matchingUsers[0];

                if (user.status === 'suspended') {
                    alert('Your account has been suspended. Please contact support.');
                    return;
                }

                if (user.UserType === 'BusinessUser' && user.status !== 'verified') {
                    alert('Your account is pending verification.');
                    return;
                }

                if (user.UserType === 'DietitiansUser' && user.status !== 'verified') {
                    alert('Your account is pending verification.');
                    return;
                }

                setUser(user);
                console.log('User logged in:', user);
                alert('Login Successfully');
                navigateToUserTypePage(user.UserType);
            } else {
                alert('Check Your Email and Password or create an account');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigateToUserTypePage = (userType) => {
        switch (userType) {
            case 'SystemAdmin':
                navigate('/SystemAdminMainAcc');
                break;
            case 'PremiumUser':
                navigate('/FreemiumUser');
                break;
            case 'BusinessUser':
                navigate('/BusinessUser');
                break;
            case 'DietitiansUser':
                navigate('/DietitiansUser');
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
                    <h2>Login</h2>
                    <div className='box'>
                        <input type='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='box'>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span className='toggle-password' onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Font Awesome icons */}
                        </span>
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
};

export default Login;
