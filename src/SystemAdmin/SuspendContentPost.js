import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore and Storage instances
import { UserContext } from '../UserContext';
import '../BusinessUser/ContentPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../Main/Script';

function SuspendContentPost() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
    handleNavToggle(); // Call the function from script.js after component mounts
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let sortedPosts;
    if (sortBy === 'newest') {
      sortedPosts = filtered.sort((a, b) => b.datecreated.getTime() - a.datecreated.getTime());
    } else {
      sortedPosts = filtered.sort((a, b) => a.datecreated.getTime() - b.datecreated.getTime());
    }

    setFilteredPosts(sortedPosts);
  }, [searchQuery, posts, sortBy]);

  const fetchPosts = async () => {
    try {
      const postsRef = collection(db, 'posts');
      const querySnapshot = await getDocs(postsRef);
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data(), datecreated: doc.data().datecreated.toDate() });
      });
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBackClick = () => {
    navigate('/SystemAdminMainAcc');
  };

  const handleButtonClick = () => {
    setUser(null); // Clear user context
    navigate('/login', { replace: true }); // Redirect to login and replace history
  };

  const handleView = (post) => {
    if (post.suspended) {
      alert("This post is suspended and cannot be viewed.");
    } else {
      navigate(`/ViewContentPost/${post.id}`);
    }
  };

  const handleSuspend = async (postId, isSuspended) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, { suspended: !isSuspended });
      fetchPosts();
    } catch (error) {
      console.error('Error suspending post:', error);
    }
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

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

      <div className='user-account-management'>
        <h1>Content Post</h1>
        <div className="toolbar">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="sort-select">
            <label htmlFor="sort-select">Sort by:</label>
            <select id="sort-select" value={sortBy} onChange={handleSortByChange}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        <div className="posts-container">
          {filteredPosts.length > 0 ? (
            <table className="posts-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Publish By</th>
                  <th>Date Created</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.publishby}</td>
                    <td>{post.datecreated.toLocaleDateString()}</td>
                    <td>{post.category}</td>
                    <td>
                      <button className="button-button" onClick={() => handleView(post)}>View</button>
                      <button className="button-button" onClick={() => handleSuspend(post.id, post.suspended)}>
                        {post.suspended ? 'Unsuspend' : 'Suspend'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No posts found.</p>
          )}
        </div>
        <button className="button-button" onClick={handleBackClick}>Back</button>
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

export default SuspendContentPost;
