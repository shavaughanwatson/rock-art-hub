import './comment.css';

const CommentList = ({ comments }) => {
  return (
    <div>
      <h3>Comments</h3>
      <ul className="comment-list">
        {comments.map(comment => {
          //const author = comment.attributes.author.data;
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
                <div>
                  <h3>{comment.attributes.username}</h3>

                  <p>{comment.attributes.content}</p>

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
