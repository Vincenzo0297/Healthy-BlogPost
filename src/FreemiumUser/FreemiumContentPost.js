import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../firebase'; // Import Firestore instance

function FreemiumContentPost() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const postDoc = await getDoc(doc(db, 'posts', postId));
            if (postDoc.exists()) {
                setPost(postDoc.data());
            } else {
                console.error('Post not found');
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        }
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
            const postRef = doc(db, 'posts', postId);
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

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div className="blog-post">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-content">{post.content}</p>
            <p className="post-author"><strong>Publish By:</strong> {post.publishby}</p>
            <p className="post-date"><strong>Date Created:</strong> {post.datecreated.toDate().toLocaleDateString()}</p>
            <p className="post-description"><strong>Description:</strong> {post.description}</p>
            {post.imageUrl && (
              <div className="post-image">
                <img src={post.imageUrl} alt={post.title} />
              </div>
            )}
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
                <button className="back-button" onClick={() => navigate('/FreemiumViewContentPost')}>Back</button>
            </form>

            <div className="comments-section">
                <h2>Comments</h2>
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((c, index) => (
                        <div key={index} className="comment">
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
        </div>
    );
}

export default FreemiumContentPost;
