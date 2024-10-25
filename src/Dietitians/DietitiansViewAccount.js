import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { doc, updateDoc, query, collection, getDocs, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import '../Functionalities/ViewAccount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';

function DietitiansViewAccount() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    Name: user.Name,
    Email: user.Email,
    Password: '',
    Gender: user.Gender,
    UserType: user.UserType,
    CompanyName: user.CompanyName,
    CompanyAddress: user.CompanyAddress,
    PostalCode: user.PostalCode,
    ContactNumber: user.ContactNumber,
    VerificationDoc: user.VerificationDoc || '',
  });
  const [verificationDocFile, setVerificationDocFile] = useState(null);
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

  const handleFileChange = (e) => {
    setVerificationDocFile(e.target.files[0]); // Handle file selection
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

    if (!updatedUser.CompanyName.trim()) {
      newErrors.CompanyName = 'Company Name is required';
    }

    if (!updatedUser.CompanyAddress.trim()) {
      newErrors.CompanyAddress = 'Company Address is required';
    }

    if (!updatedUser.PostalCode.trim()) {
      newErrors.PostalCode = 'Postal Code is required';
    }

    if (!updatedUser.ContactNumber.trim()) {
      newErrors.ContactNumber = 'Contact Number is required';
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
  
      // Upload verification document if a new file was selected
      let verificationDocUrl = updatedUser.VerificationDoc;
      if (verificationDocFile) {
        const storage = getStorage();
        const fileRef = ref(storage, `verificationDocs/${user.id}-${verificationDocFile.name}`);
        await uploadBytes(fileRef, verificationDocFile);
        verificationDocUrl = await getDownloadURL(fileRef);
      }
  
      // Update Firestore with new data
      const updatedUserData = {
        ...updatedUser,
        VerificationDoc: verificationDocUrl, // Update verification doc URL
      };
  
      if (!updatedUserData.Password) {
        delete updatedUserData.Password; // Remove password if not being updated
      }
  
      await updateDoc(userRef, updatedUserData);
  
      // Update local user state
      setUser({
        ...user,
        ...updatedUser,
        VerificationDoc: verificationDocUrl, // Make sure the user context gets updated with the new URL
        Password: '',
      });
  
      setIsEditing(false);
      alert('Account updated successfully');
    } catch (error) {
      alert('Failed to update account: ' + error.message);
    }
  };

  return (
    <div>
      <header className="header" id="header">
        <nav className="nav container">
          <a href="#" className="nav-logo"> <h2>NutriTrack</h2> </a>
          <div className="nav-menu" id="nav-menu">
            <ul className="nav-list">
              <li className="nav-item"><Link to="/DietitiansUser" className="nav-link">DashBoard</Link></li>
              <li className="nav-item"><Link to="#" className="nav-link">Meal Plans</Link></li>

              <li className="nav-item nav-user">
                <a href="#" className="nav-link">
                  <FontAwesomeIcon icon={faUser} />
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={() => handleClick('./DietitiansViewAccount')}>My Account</li>
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

      <div className="view-account">
        <h2>Your Dietitians User Account</h2>
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
                      <th>Company Name</th>
                      <td>
                        <input type="text" name="CompanyName" value={updatedUser.CompanyName} onChange={handleInputChange} />
                        {errors.CompanyName && <span className="error">{errors.CompanyName}</span>}
                      </td>
                    </tr>
                    <tr>
                      <th>Company Address</th>
                      <td>
                        <input type="text" name="CompanyAddress" value={updatedUser.CompanyAddress} onChange={handleInputChange} />
                        {errors.CompanyAddress && <span className="error">{errors.CompanyAddress}</span>}
                      </td>
                    </tr>
                    <tr>
                      <th>Postal Code</th>
                      <td>
                        <input type="text" name="PostalCode" value={updatedUser.PostalCode} onChange={handleInputChange} />
                        {errors.PostalCode && <span className="error">{errors.PostalCode}</span>}
                      </td>
                    </tr>
                    <tr>
                      <th>Contact Number</th>
                      <td>
                        <input type="text" name="ContactNumber" value={updatedUser.ContactNumber} onChange={handleInputChange} />
                        {errors.ContactNumber && <span className="error">{errors.ContactNumber}</span>}
                      </td>
                    </tr>
                    <tr>
                      <th>Verification Document</th>
                      <td>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {user.VerificationDoc && (
                          <div>
                            <img src={user.VerificationDoc} alt="Verification Document" width="200" />
                          </div>
                        )}
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
                      <th>Company Name</th>
                      <td>{user.CompanyName}</td>
                    </tr>
                    <tr>
                      <th>Company Address</th>
                      <td>{user.CompanyAddress}</td>
                    </tr>
                    <tr>
                      <th>Postal Code</th>
                      <td>{user.PostalCode}</td>
                    </tr>
                    <tr>
                      <th>Contact Number</th>
                      <td>{user.ContactNumber}</td>
                    </tr>
                    
                        Verification Document
                        
                        {user.VerificationDoc ? (
                        <div>
                            <img src={user.VerificationDoc} alt="Verification Document" width="700" />
                        </div>
                        ) : (
                        <span>No document uploaded</span>
                        )}
                    
                  </tbody>
                </table>
                <button className="button-button" onClick={handleEditClick}>Update</button>
                <button className="button-button" onClick={handleBackClick}>Back</button>
              </>
            )}
          </>
        ) : (
          <p>No user information available</p>
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

export default DietitiansViewAccount;
