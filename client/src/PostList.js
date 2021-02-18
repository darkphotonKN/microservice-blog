import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:4000/posts');

    setPosts(data);
  };

  console.log('Looping through:', Object.values(posts));
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div className="my-2 col-12 col-sm-4 p3" key={post.id}>
        <div className="card">
          <div className="card-body">
            <h3>{post.title}</h3>
            <CommentCreate postId={post.id} />
            <CommentList postId={post.id} />
          </div>
        </div>
      </div>
    );
  });

  console.log('Posts:', posts);

  return <div className="row">{renderedPosts}</div>;
};

export default PostList;
