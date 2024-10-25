import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage methods
import { db, storage } from '../firebase'; // Import Firestore and Storage instances
import './CreateContentPost.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../UserContext';
import { handleNavToggle } from '../Main/Script';

function CreateContentPost() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        publishby: '',
        description: '',
        datecreated: Timestamp.now(),
        imageUrl: '',
        category: '' // Add category to formData
    });
    const [imageFile, setImageFile] = useState(null); // State to hold the image file
    const [titleError] = useState('');
    const [descriptionError] = useState('');
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        handleNavToggle(); // Call the function from script.js after component mounts
      }, []);

      const handleButtonClick = () => {
        setUser(null); // Clear user context
        navigate('/login', { replace: true }); // Redirect to login and replace history
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.title.length > 80 || formData.description.length > 1000) {
            console.error("Form contains errors.");
            return;
        }

        try {
            let imageUrl = '';
            if (imageFile) {
                const imageRef = ref(storage, `images/${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            const postsRef = collection(db, 'posts');
            await addDoc(postsRef, { ...formData, imageUrl });
            console.log('New post added successfully');
            navigate('/ContentPost');
        } catch (error) {
            console.error('Error adding new post:', error);
        }
    };

    const handleCancel = () => {
        navigate('/ContentPost');
    };

    const formatDate = (timestamp) => {
        const date = timestamp.toDate();
        return date.toLocaleDateString();
    };

    return (
        <div>
            <header className="header" id="header">
                <nav className="nav container">
                <a href="#" className="nav-logo"><h2>NutriTrack</h2></a>
                <div className="nav-menu" id="nav-menu">
                    <ul className="nav-list">
                        <li className="nav-item"><Link to="/BusinessUser" className="nav-link">DashBoard</Link></li>
                        <li className="nav-item"><Link to="#" className="nav-link">Recipes</Link></li>
                        <li className="nav-item"><a href="#" className="nav-link">Blogs</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Learning Contents</a></li>

                    <li className="nav-item nav-user">
                        <a href="#" className="nav-link">
                        <FontAwesomeIcon icon={faUser} />
                        </a>
                        <ul className="dropdown-menu">
                        <li className="dropdown-item" onClick={() => navigate('./BusinessViewAccount')}>My Account</li>
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

            <div className="create-content-form-page">
                <h2>Create Content</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            maxLength="80" 
                            placeholder="Title (Max 80 Characters)" 
                            required 
                        />
                        {titleError && <p className="error-message">{titleError}</p>}
                    </div>
                    <div className="form-group">
                        <label>Publish By:</label>
                        <input 
                            type="text" 
                            name="publishby" 
                            value={formData.publishby} 
                            placeholder="Author Name (Max 80 Characters)" 
                            maxLength="80" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Date Created:</label>
                        <input type="text" value={formatDate(formData.datecreated)} disabled />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="">Select Category</option>
                            <option value="Health">Health</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Nutrition">Nutrition</option>
                            <option value="Wellness">Wellness</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            maxLength="1000" 
                            placeholder="Describe Content Post here (Max 1000 characters)" 
                            required 
                        />
                        {descriptionError && <p className="error-message">{descriptionError}</p>}
                    </div>
                    <div className="form-group">
                        <label>Upload Image:</label>
                        <input type="file" onChange={handleImageChange} />
                    </div>
                    <button type="submit" className="button-button">Submit</button>
                    <button type="button" className="button-button" onClick={handleCancel}>Cancel</button>
                </form>
            </div>

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

export default CreateContentPost;
