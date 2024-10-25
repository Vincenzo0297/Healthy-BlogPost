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

const UpdateRecipesPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    datecreated: new Date(),
    category: '',
    imageUrl: '',
    cookingTime: '',
    dietaryPreference: '',
    mealType: '',
    steps: [], // Initialize as an array
    instructions: '',
    nutritionalInfo: {
      calories: '',
      carbohydrates: '',
      protein: '',
      fat: '',
      fibre: '',
      sodium: '',
    }, // Initialize as an object
    ingredients: [], // Initialize as an array
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    handleNavToggle();
    fetchPost();
  }, [postId]);

  const handleButtonClick = () => {
    setUser(null);
    navigate('/login', { replace: true });
  };

  const fetchPost = async () => {
    try {
      const postDoc = await getDoc(doc(db, 'RecipesPost', postId));
      if (postDoc.exists()) {
        const postData = postDoc.data();
        setFormData({
          title: postData.title || '',
          description: postData.description || '',
          category: postData.category || '',
          datecreated: postData.datecreated ? postData.datecreated.toDate() : new Date(),
          imageUrl: postData.imageUrl || '',
          cookingTime: postData.cookingTime || '',
          dietaryPreference: postData.dietaryPreference || '',
          mealType: postData.mealType || '',
          steps: postData.steps || [], // Ensure it's an array
          instructions: postData.instructions || '',
          nutritionalInfo: postData.nutritionalInfo || {
            calories: '',
            carbohydrates: '',
            protein: '',
            fat: '',
            fibre: '',
            sodium: '',
          }, // Ensure it's an object
          ingredients: postData.ingredients || [], // Ensure it's an array
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

  const handleIngredientsChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData(prevData => ({ ...prevData, ingredients: updatedIngredients }));
};

const addIngredient = () => {
    setFormData(prevData => ({ ...prevData, ingredients: [...prevData.ingredients, ''] }));
};

const handleStepsChange = (index, value) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = value;
    setFormData(prevData => ({ ...prevData, steps: updatedSteps }));
};

const addStep = () => {
    setFormData(prevData => ({ ...prevData, steps: [...prevData.steps, ''] }));
};

const handleNutritionalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        nutritionalInfo: { ...prevData.nutritionalInfo, [name]: value }
    }));
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
      const postRef = doc(db, 'RecipesPost', postId);
      await updateDoc(postRef, {
        ...formData,
        datecreated: Timestamp.fromDate(new Date(formData.datecreated)),
        imageUrl
      });
      console.log('Post updated successfully');
      navigate('/RecipesPost');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleCancel = () => {
    navigate('/RecipesPost');
  };

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
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
        <h2>Update Recipes Post</h2>
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
                <label>Dietary Preference:</label>
                <select name="dietaryPreference" value={formData.dietaryPreference} onChange={handleChange} required>
                    <option value="">Select Preference</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                    <option value="Keto">Keto</option>
                </select>
            </div>

            <div className="form-group">
                <label>Meal Type:</label>
                <select name="mealType" value={formData.mealType} onChange={handleChange} required>
                    <option value="">Select Meal Type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
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
                <label>Cooking Time (in minutes):</label>
                <input type="number" name="cookingTime" value={formData.cookingTime} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Serving Size:</label>
                <input type="number" name="servingSize" value={formData.servingSize} onChange={handleChange} required />
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
                <label>Ingredients:</label>
                {formData.ingredients && formData.ingredients.map((ingredient, index) => (
                    <input
                    key={index}
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientsChange(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    required
                    />
                ))}
                <button type="button" className="back-button" onClick={addIngredient}>Add Ingredient</button>
            </div>

            <div className="form-group">
                <label>Steps:</label>
                {formData.steps && formData.steps.map((step, index) => (
                    <input
                    key={index}
                    type="text"
                    value={step}
                    onChange={(e) => handleStepsChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    required
                    />
                ))}
                <button type="button" className="back-button" onClick={addStep}>Add Step</button>
            </div>


    
          <div className="form-group">
            <label>Image:</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <h3>Nutritional Information</h3>
            <label>Calories:</label>
            <input type="number" name="calories" value={formData.nutritionalInfo.calories} onChange={handleNutritionalChange} required />
                        
            <label>Carbohydrates (g):</label>
            <input type="number" name="carbohydrates" value={formData.nutritionalInfo.carbohydrates} onChange={handleNutritionalChange} required />
                        
            <label>Protein (g):</label>
            <input type="number" name="protein" value={formData.nutritionalInfo.protein} onChange={handleNutritionalChange} required />
                        
            <label>Fat (g):</label>
            <input type="number" name="fat" value={formData.nutritionalInfo.fat} onChange={handleNutritionalChange} required />
                        
            <label>Fibre (g):</label>
            <input type="number" name="fibre" value={formData.nutritionalInfo.fibre} onChange={handleNutritionalChange} required />
                        
            <label>Sodium (mg):</label>
            <input type="number" name="sodium" value={formData.nutritionalInfo.sodium} onChange={handleNutritionalChange} required />
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
          Foolish Developer is a blog website where you will find great tutorials on <br /> web design and development. 
          Here each tutorial is beautifully described <br /> step by step with the required source code and experience.
        </p>
        <p>© Copyright: Foolish Developer</p>
      </footer>
    </div>
  );
};

export default UpdateRecipesPost;
