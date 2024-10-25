import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, addDoc, collection, where, query } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore and Storage instances
import '../Login&SignUp/styles.css';

const CreateUserProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [gender, setGender] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [dateError, setDateError] = useState('');
    const [userTypeError, setUserTypeError] = useState('');
    const [genderError, setGenderError] = useState('');

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

        if (userType.trim() === '') {
            setUserTypeError('User Type is required');
            isValid = false;
        } else {
            setUserTypeError('');
        }

        if (gender.trim() === '') {
            setGenderError('Gender is required');
            isValid = false;
        } else {
            setGenderError('');
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
                await addDoc(dbref, {
                    Name: name,
                    Email: email,
                    Password: password,
                    UserType: userType,
                    Gender: gender,
                    status: userType === 'BusinessUser' ? 'pending' : 'verified'
                });
                alert('Sign Up Successfully');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='login-container'>
            <div className='form'>
                <h2>Registration</h2>
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
                    <p>Only can Select System Admin</p>
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value='SystemAdmin'>System Administration</option>
                    </select>
                    {userTypeError && <p className='error'>{userTypeError}</p>}
                </div>

                <div className='box'>
                    <p>Select your Gender</p>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value=''>Select Genders</option>
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
                <p><Link to='/ViewUserProfile'>Back</Link></p>
                <button onClick={signup}>Create</button>
            </div>
        </div>
    );
};

export default CreateUserProfile;
