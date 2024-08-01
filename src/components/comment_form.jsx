import { useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../util';
import './comment.css';

const CommentForm = ({ artworkId, user, setComments }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);
  //const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage

    if (!token) {
      console.error('User not authenticated. Please log in.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:1337/api/thoughts',
        {
          data: {
            content,
            author: user.id,
            artwork: artworkId,
            dateCreatedAt: new Date(),
            avatar: user.avatar,
            username: user.username,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response);

      if (response.status === 200 || response.status === 201) {
        //setContent('');
        //setSuccess('Comment submitted successfully!');
        setComments(comments => [response.data.data, ...comments]);
      } else {
        //setError('Failed to submit comment.');
        console.error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      //setError('An error occurred while submitting the comment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          className="comment-box"
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />

        <button type="submit" disabled={loading} className="comment-submitbtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
