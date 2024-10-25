import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase'; // Import Firestore and Storage instances
import './CreateContentPost.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../UserContext';
import { handleNavToggle } from '../Main/Script';

const UpdateContentPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    publishby: '',
    description: '',
    datecreated: new Date(), // Set default as a Date object
    imageUrl: '' // Add imageUrl field to formData
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    handleNavToggle(); // Call the function from script.js after component mounts
    fetchPost();
  }, [postId]);

  const handleButtonClick = () => {
    setUser(null); // Clear user context
    navigate('/login', { replace: true }); // Redirect to login and replace history
  };

  const fetchPost = async () => {
    try {
      const postDoc = await getDoc(doc(db, 'posts', postId));
      if (postDoc.exists()) {
        const postData = postDoc.data();
        setFormData({
          title: postData.title,
          publishby: postData.publishby,
          description: postData.description,
          category: postData.category,
          datecreated: postData.datecreated.toDate(), // Ensure it is converted to a Date object
          imageUrl: postData.imageUrl || '' // Fetch imageUrl if exists
        });
      } else {
        console.error('Post not found');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formData.imageUrl;

    if (selectedFile) {
      const storageRef = ref(storage, `images/${postId}/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      try {
        await uploadTask;
        imageUrl = await getDownloadURL(storageRef);
        console.log('File uploaded successfully:', imageUrl);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        ...formData,
        datecreated: Timestamp.fromDate(new Date(formData.datecreated)), // Convert back to Firestore Timestamp
        imageUrl // Update the Firestore document with the new image URL
      });
      console.log('Post updated successfully');
      navigate('/ContentPost'); // Navigate back to the content page
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleCancel = () => {
    navigate('/ContentPost'); // Navigate back to the content page
  };

  // Format the date to show only the date part
  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString(); // This will format the date as "MM/DD/YYYY"
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
                        <li className="dropdown-item" onClick={() => navigate('/BusinessViewAccount')}>My Account</li>
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
        <h2>Update Content</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Publish By:</label>
            <input type="text" name="publishby" value={formData.publishby} onChange={handleChange} required />
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
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          {formData.imageUrl && (
            <div className="form-group">
              <img src={formData.imageUrl} alt="Post" style={{ maxWidth: '200px' }} />
            </div>
          )}
          <button type="submit" className="button-button">Update</button>
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
};

export default UpdateContentPost;
