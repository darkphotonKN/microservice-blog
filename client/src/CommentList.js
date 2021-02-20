import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ postId, comments }) => {
  console.log('CommentList props comments:', comments);

  // OLD STUFF - when we used to use id to fetch all comments for each post

  // const [commentsList, setCommentsList] = useState([]);
  // useEffect(() => {
  //   fetchComments();
  // }, []);

  // const fetchComments = async () => {
  //   const { data } = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );

  //   setCommentsList(data);
  // };

  const renderComments = () => {
    return comments.map((comment) => (
      <li
        key={comment.id}
        className="comment my-3"
        style={{ fontSize: '14px', color: '#a9a9a9' }}
      >
        {comment.content}
        <div>{comment.date}</div>
      </li>
    ));
  };

  return (
    <div>
      <div className="mt-3">Comments</div>
      <hr />
      <ul>{renderComments()}</ul>
    </div>
  );
};

export default CommentList;
