import axios from 'axios';
import { API_KEY } from '../util';
import { useState } from 'react';
import './comment.css';
import { MdDeleteForever } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { useContext } from 'react';
import { MainHeaderContext } from '../RootLayout';

const CommentList = ({ comments, setComments }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const user = useContext(MainHeaderContext);

  const handleDelete = async commentId => {
    try {
      await axios.delete(`http://localhost:1337/api/thoughts/${commentId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEdit = comment => {
    setIsEditing(comment.id);
    setEditedContent(comment.attributes.content);
  };

  const handleUpdate = async commentId => {
    try {
      const response = await axios.put(
        `http://localhost:1337/api/thoughts/${commentId}`,
        {
          data: {
            content: editedContent,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setComments(
        comments.map(comment =>
          comment.id === commentId ? response.data.data : comment
        )
      );
      setIsEditing(null);
      setEditedContent('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul className="comment-list">
        {comments.map(comment => {
          const avatarUrl = comment.attributes.avatar;
          return (
            <li key={comment.id}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      marginRight: '10px',
                    }}
                  />
                )}
                <div className="inner">
                  <h3>{comment.attributes.username}</h3>
                  {isEditing === comment.id ? (
                    <textarea
                      value={editedContent}
                      onChange={e => setEditedContent(e.target.value)}
                      className="comment-box"
                    />
                  ) : (
                    <p>{comment.attributes.content}</p>
                  )}
                  {user.username === comment.attributes.username && (
                    <div className="comment-btns">
                      {isEditing === comment.id ? (
                        <button onClick={() => handleUpdate(comment.id)}>
                          Save
                        </button>
                      ) : (
                        <button onClick={() => handleEdit(comment)}>
                          Edit <MdEdit />
                        </button>
                      )}
                      <button onClick={() => handleDelete(comment.id)}>
                        Delete <MdDeleteForever />
                      </button>
                    </div>
                  )}
                  <p>
                    <small>
                      {new Date(comment.attributes.createdAt).toLocaleString()}
                    </small>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentList;
