import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: comment,
    });

    setComment('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">New Comment</label>
          <input
            type="text"
            className="form-control my-2"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CommentCreate;
