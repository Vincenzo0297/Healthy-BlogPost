import React, { useState, useEffect } from 'react'; //Dont need this files
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore instance
import '../BusinessUser/ContentPost.css';

function FreemiumViewContentPost() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
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
    navigate('/FreemiumUser');
  };

  const handleView = (postId) => {
    navigate(`/FreemiumContentPost/${postId}`);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.publishby}</td>
                  <td>{post.datecreated.toLocaleDateString()}</td>
                  <td>
                    <button className="button-button" onClick={() => handleView(post.id)}>View</button>
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
  );
}

export default FreemiumViewContentPost;
