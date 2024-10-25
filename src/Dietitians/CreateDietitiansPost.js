import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import '../BusinessUser/CreateContentPost.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../UserContext';
import { handleNavToggle } from '../Main/Script';

function CreateDietitiansPost() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        datecreated: Timestamp.now(),
        imageUrl: '',
        category: '',
        instructions: '',
        mainContent: '',
        conclusion: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        handleNavToggle();
    }, []);

    const handleButtonClick = () => {
        setUser(null);
        navigate('/login', { replace: true });
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

            const postsRef = collection(db, 'DietitiansPost');
            await addDoc(postsRef, { ...formData, imageUrl });
            console.log('New post added successfully');
            navigate('/DietitiansPost');
        } catch (error) {
            console.error('Error adding new post:', error);
        }
    };

    const formatDate = (timestamp) => {
        const date = timestamp.toDate();
        return date.toLocaleDateString();
    };

    const handleCancel = () => {
        navigate('/DietitiansPost');
    };

    return (
        <div>
            <header className="header" id="header">
                <nav className="nav container">
                <a href="#" className="nav-logo"><h2>NutriTrack</h2></a>
                <div className="nav-menu" id="nav-menu">
                    <ul className="nav-list">
                        <li className="nav-item"><Link to="/DietitiansUser" className="nav-link">DashBoard</Link></li>
                        <li className="nav-item"><Link to="#" className="nav-link">Meal Plans</Link></li>


                    <li className="nav-item nav-user">
                        <a href="#" className="nav-link">
                        <FontAwesomeIcon icon={faUser} />
                        </a>
                        <ul className="dropdown-menu">
                        <li className="dropdown-item" onClick={() => navigate('/DietitansViewAccount')}>My Account</li>
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
                <h2>Create Meal Plans</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            maxLength={80}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category:</label>
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="">Select Category</option>
                            <option value="Appetizer">Appetizer</option>
                            <option value="Main Course">Main Course</option>
                            <option value="Dessert">Dessert</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            maxLength={1000}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date Created:</label>
                        <input type="text" value={formatDate(formData.datecreated)} disabled />
                    </div>
                   
                    <div className="form-group">
                        <label>Instructions:</label>
                        <textarea
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                            maxLength={1000}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Main Content:</label>
                        <textarea
                            name="mainContent"
                            value={formData.mainContent}
                            onChange={handleChange}
                            maxLength={1000}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Conclusion:</label>
                        <textarea
                            name="conclusion"
                            value={formData.conclusion}
                            onChange={handleChange}
                            maxLength={1000}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Upload Image:</label>
                        <input type="file" onChange={handleImageChange} />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="button-button">Submit</button>
                        <button type="button" className="button-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>

            <footer>
                <h1>Foolish Developer</h1>
                <p className="description">
                Foolish Developer is the author of this system. Do not share the
                source code.
                </p>
            </footer>
        </div>
    );
}

export default CreateDietitiansPost;
