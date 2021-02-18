import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data } = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setCommentsList(data);
  };

  const renderComments = () => {
    return commentsList.map((comment) => (
      <div
        key={comment.id}
        className="comment my-3"
        style={{ fontSize: '14px', color: '#a9a9a9' }}
      >
        {comment.comment}
        <div>{comment.date}</div>
      </div>
    ));
  };

  return (
    <div>
      <div className="mt-3">Comments</div>
      <hr />
      {renderComments()}
    </div>
  );
};

export default CommentList;
