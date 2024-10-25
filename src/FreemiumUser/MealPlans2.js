import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { UserContext } from '../UserContext';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 
import '../Main/Styles.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';

function MealPlans2() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [selectedCategory, setSelectedCategory] = useState(""); // Category filter state
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    handleNavToggle();

    const fetchBlogPosts = async () => {
      try {
        const blogPostsCollection = collection(db, 'DietitiansPost');
        const blogPostsSnapshot = await getDocs(blogPostsCollection);
        const blogPostsList = blogPostsSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(post => !post.suspended);

        setBlogPosts(blogPostsList);
      } catch (error) {
        console.error("Error fetching Meal Plan posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Handle Search and Filter Logic
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = searchTerm ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const handleClick = (route) => navigate(`/${route}`);
  
  const handleBackClick = () => navigate(-1);
  
  const handleButtonClick = () => {
    setUser(null);
    navigate('/login', { replace: true });
  }

  if (loading) {
    return <div>Loading Dietitian posts...</div>;
  }

  return (
    <div>
      <header className="header" id="header">
        <nav className="nav container">
          <a href="#" className="nav-logo"><h2>NutriTrack</h2></a>
          <div className="nav-menu" id="nav-menu">
            <ul className="nav-list">
              <li className="nav-item"><Link to="#" className="nav-link">About Us</Link></li>
              <li className="nav-item"><Link to="/RecipesPost2" className="nav-link">Recipes</Link></li>
              <li className="nav-item"><Link to="/MealPlans2" className="nav-link">Meal Plan</Link></li>
              <li className="nav-item"><Link to="/LearningContentPost" className="nav-link">Learnning Content</Link></li>
              <li className="nav-item"><Link to="/BlogPosts2" className="nav-link">Blogs</Link></li>

              <li className="nav-item nav-user">
                <a href="#" className="nav-link">
                  <FontAwesomeIcon icon={faUser} />
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={() => handleClick('./FreemiumViewAccount')}>My Account</li>
                  <li className="dropdown-item" onClick={() => handleClick('./FreemiumTrackBodyWeight')}>Track Weight Measurements</li>
                  <li className="dropdown-item" onClick={() => handleClick('./FreemiumBMICalculate')}>BMI Calculator</li>
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

      <div className="blog-posts-container">
        <h2> Meal Plan</h2>

        {/* Search and Filter UI */}
        <div className="search-filter">
            <div className="toolbar">
                <input
                    type="text"
                    placeholder="Search Meal Plan posts..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />

            <div className="sort-select">
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                    {/* Add more categories as needed */}
                </select>
            </div>
        </div>     
    </div>

        <div className="card-grid">
          {filteredPosts.length === 0 ? (
            <p>No blog posts found.</p>
          ) : (
            filteredPosts.map((post) => (
              <Link to={`/ViewDietitiansPost/${post.id}`} key={post.id} className="card-link">
                <div className="card">
                  <div className="card-header">
                    <h3>{post.title}</h3>
                    <p>{post.category}</p>
                  </div>
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="card-image" />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}
                  <div className="card-body">
                    <p>{post.description.substring(0, 100)}...</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <button className="back-button" onClick={handleBackClick}>Back</button>
      </div>

      <footer>
        <h1>Foolish Developer</h1>
        <p className="description">
          Foolish Developer is a blog website where you will find great tutorials on
          web design and development. Each tutorial is beautifully described
          step by step with the required source code and experience.
        </p>
        <p>© Copyright: Foolish Developer</p>
      </footer>
    </div>
  );
};

export default MealPlans2;
