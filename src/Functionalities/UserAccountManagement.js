import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../UserContext';
import Modal from 'react-modal';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import './UserAccountManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';

Modal.setAppElement('#root');

function UserAccountManagement() {
  useEffect(() => {
    handleNavToggle(); // Call the function from script.js after component mounts
  }, []);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'Auth');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const filteredUserList = userList.filter(user => user.UserType === 'PremiumUser');
        setUsers(filteredUserList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users: ", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = () => {
    setUser(null); // Clear user context
    navigate('/login', { replace: true }); // Redirect to login and replace history
  };

  const handleSuspendClick = async (userId) => {
    const user = users.find(user => user.id === userId);
    const newStatus = user.status === 'suspended' ? 'active' : 'suspended';

    try {
      const userRef = doc(db, 'Auth', userId);
      await updateDoc(userRef, { status: newStatus });
      setUsers(users.map(user => (user.id === userId ? { ...user, status: newStatus } : user)));
      alert(`User has been ${newStatus}`);
    } catch (error) {
      alert('Failed to update user status: ' + error.message);
    }
  };

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user =>
    user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.Date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.Gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.UserType.toUpperCase().includes(searchTerm.toUpperCase())
  );

  return (
    <div>
      <header className="header" id="header">
        <nav className="nav container">
          <a href="#" className="nav-logo"><h2>NutriTrack</h2></a>
          <div className="nav-menu" id="nav-menu">
            <ul className="nav-list">
              <li className="nav-item"><Link to="/SystemAdminMainAcc" className="nav-link">DashBoard</Link></li>
              <li className="nav-item"><Link to="/ViewUserProfile" className="nav-link">User Profile</Link></li>
              <li className="nav-item"><Link to="/SuspendBlogPost" className="nav-link">Suspend Post</Link></li>
              <li className="nav-item"><Link to="/SuspendContentPost" className="nav-link">Suspend Content</Link></li>

              <li className="nav-item nav-user">
                <a href="#" className="nav-link">
                  <FontAwesomeIcon icon={faUser} />
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={() => navigate('/ViewAccount')}>My Account</li>
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

      <div className="user-account-management">
        <h2>All Premium User Accounts</h2>
        <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchInputChange} className="search-input" />
        <button className='button-button' onClick={() => navigate(-1)}>Back</button>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {filteredUsers.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.Name}</td>
                      <td>{user.Email}</td>
                      <td>{user.Date}</td>
                      <td>{user.Gender}</td>
                      <td>
                        <button className='button-button' onClick={() => handleViewClick(user)}>
                          View
                        </button>
                        <button className='button-button' onClick={() => handleSuspendClick(user.id)}>
                          {user.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users found.</p>
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="User Information"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedUser && (
          <div className="modal-content">
                <label>Name:</label>
                <input type="text" value={selectedUser.Name} readOnly />
           
                <label>Email:</label>
                <input type="text" value={selectedUser.Email} readOnly />
            
                <label>Date of Birth:</label>
                <input type="text" value={selectedUser.Date} readOnly />
              
                <label>Gender:</label>
                <input type="text" value={selectedUser.Gender} readOnly />

                <label>Dietary Preference:</label>
                <input type="text" value={selectedUser.DietaryPreference} readOnly />

                <label>Allergies:</label>
                <input type="text" value={selectedUser.Allergies} readOnly />

                <label>Health Goal:</label>
                <input type="text" value={selectedUser.HealthGoal} readOnly />
              
              <button type="button" className="btn-button" onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>

      <footer>
        <h1>Foolish Developer</h1>
        <p className="description">
          Foolish Developer is a blog website where you will find great tutorial on <br /> web design and development. 
          Here each tutorial is beautifully described <br /> step by step with the required source code and experience.
        </p>
        <p>© Copyright: Foolish Developer</p>
      </footer>
    </div>
  );
}

export default UserAccountManagement;
