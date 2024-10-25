import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Navigate, Link } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { UserContext } from '../UserContext'; // Import UserContext to get current user
import './ContentPost.css';
import { handleNavToggle } from '../Main/Script';

function ViewRecipesPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [usernames, setUsernames] = useState({});
  const { user } = useContext(UserContext); // Get the current user
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    handleNavToggle(); // Call the function from script.js after component mounts
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const postDoc = await getDoc(doc(db, 'RecipesPost', postId));
      if (postDoc.exists()) {
        const postData = postDoc.data();
        if (postData.comments && postData.comments.length > 0) {
          await fetchUsernames(postData.comments);
        }
        setPost(postData);
      } else {
        console.error('Blog Post not found');
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
    }
  };

  const fetchUsernames = async (comments) => {
    const userIds = comments.map(comment => comment.userId);
    const uniqueUserIds = [...new Set(userIds)];
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usernamesMap = {};

    usersSnapshot.forEach((doc) => {
      if (uniqueUserIds.includes(doc.id)) {
        usernamesMap[doc.id] = doc.data().username; // Assuming your user document has a 'username' field
      }
    });

    setUsernames(usernamesMap);
  };

  const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page in the browser history
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
};

const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const postRef = doc(db, 'RecipesPost', postId);
        await updateDoc(postRef, {
            comments: arrayUnion({
                comment,
                rating,
                date: new Date()
            })
        });
        setComment('');
        fetchPost(); // Refresh the post data to include the new comment
    } catch (error) {
        console.error('Error submitting comment:', error);
    }
};

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="blog-post">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-content">{post.content}</p>
        <p className="post-date"><strong>Date Created:</strong> {post.datecreated.toDate().toLocaleDateString()}</p>
        <p className="post-category"><strong>Category:</strong> {post.category}</p>
        <p className="post-dietary-preference"><strong>Dietary Preference:</strong> {post.dietaryPreference}</p>
        <p className="post-meal-type"><strong>Meal Type:</strong> {post.mealType}</p>
        {post.imageUrl && (
          <div className="post-image">
            <img src={post.imageUrl} alt={post.title} />
          </div>
        )}
        <p className="post-description"><strong>Description:</strong> {post.description}</p>
        <p className="post-cooking-time"><strong>Cooking Time:</strong> {post.cookingTime}</p>
        <p className="post-serving-size"><strong>Serving Size:</strong> {post.servingSize}</p>
        <p className="post-instructions"><strong>Instructions:</strong> {post.description}</p>
        <div className="post-ingredients">
          <h3>Ingredients:</h3>
          <ul>
            {post.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="post-steps">
          <h3>Steps:</h3>
          <ul>
            {post.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="post-nutritional-info">
          <h3>Nutritional Information:</h3>
          <p><strong>Calories:</strong> {post.nutritionalInfo.calories}</p>
          <p><strong>Carbohydrates:</strong> {post.nutritionalInfo.carbohydrates}g</p>
          <p><strong>Protein:</strong> {post.nutritionalInfo.protein}g</p>
          <p><strong>Fat:</strong> {post.nutritionalInfo.fat}g</p>
          <p><strong>Fibre:</strong> {post.nutritionalInfo.fibre}g</p>
          <p><strong>Sodium:</strong> {post.nutritionalInfo.sodium}mg</p>
        </div>

        <form onSubmit={handleSubmit} className="comment-form">
                <div className="form-group">
                    <label htmlFor="comment" className="form-label">Comment:</label>
                    <textarea 
                        id="comment" 
                        className="form-input" 
                        value={comment} 
                        onChange={handleCommentChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Rating:</label>
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <span
                                key={num}
                                className={num <= rating ? "star-filled" : "star-empty"}
                                onClick={() => handleRatingChange(num)}
                            >
                                &#9733; {/* Unicode character for star */}
                            </span>
                        ))}
                    </div>
                </div>
                <button type="submit" className="button-button" >Submit</button>
          </form>

        <div className="comments-section">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((c, index) => (
              <div key={index} className="comment">
                <strong>Annoymous</strong>
                <p><strong>Rating:</strong> 
                  {[...Array(c.rating)].map((_, i) => (
                    <span key={i} className="star-filled">&#9733;</span>
                  ))}
                </p>
                <p><em>{new Date(c.date.seconds * 1000).toLocaleDateString()}</em></p>
                <p>{c.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
        <button className="back-button" onClick={handleBackClick}>Back</button>
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

export default ViewRecipesPost;
