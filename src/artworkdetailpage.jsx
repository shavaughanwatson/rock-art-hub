import './artworkdetailpage.css'; // You can define your styles in this file
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from './util.js';
import { useState, useContext, useEffect } from 'react';
import CommentList from './components/comment_list';
import UnAuthCommentList from './components/un_auth_comment_list';
import CommentForm from './components/comment_form';
import api from './api';
import { MainHeaderContext } from './RootLayout';

const ArtworkDetail = () => {
  const artwork = useLoaderData();
  const user = useContext(MainHeaderContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/thoughts?filters[artwork][id][$eq]=${artwork.id}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        console.log(response.data.data);

        setComments(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('An error occurred while fetching the comments.');
        setLoading(false);
      }
    };

    fetchComments();
  }, [artwork.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="artwork-detail-wrapper">
        <div className="artwork-info">
          <div className="artwork-image">
            <img
              src={`http://localhost:1337${artwork.attributes.Media.data.attributes.url}`}
              alt="geology artwork"
            />
          </div>

          <div className="artwork-specs">
            <h2>{artwork.attributes.title}</h2>
            <p className="author">Made by {artwork.attributes.author}</p>
            <p>Posted at {artwork.attributes.createdAt}</p>

            <p>{artwork.attributes.description}</p>
          </div>
        </div>

        {user.user ? (
          <div className="comment-section">
            <h3 className="comment-heading">Submit a Comment</h3>
            <CommentForm
              artworkId={artwork.id}
              user={user.user.user}
              setComments={setComments}
              comments={comments}
            />
            <CommentList
              setComments={setComments}
              comments={comments}
              user={user.user.user}
            />
          </div>
        ) : (
          <div className="comment-section">
            <h1>Need to login in to comment</h1>
            <UnAuthCommentList setComments={setComments} comments={comments} />
          </div>
        )}
      </div>
    </>
  );
};

export async function loader({ params }) {
  const response = await api.get(`/artworks/${params.id}?populate=*`);
  const data = response.data.data;
  console.log(response);
  console.log(data); // Adjust according to Strapi response format

  return data;
}
export default ArtworkDetail;
