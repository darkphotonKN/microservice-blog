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
    const { data } = await axios.get('http://localhost:4002/posts');
    // checking data sync:
    // const { data: data2 } = await axios.get('http://localhost:4000/posts');
    // const { data: data3 } = await axios.get(
    //   'http://localhost:4001/posts/56f6d38e/comments'
    // );
    // console.log('OG POSTS:', data2);
    // console.log('OG COMMENTSS:', data3);
    setPosts(data);
  };

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div className="my-2 col-12 col-md-6 col-lg-4 p3" key={post.id}>
        <div className="card">
          <div className="card-body">
            <h3>{post.title}</h3>
            {/* Prior to using microservices we used to pass down
                post.id in order for the comments component to FIND it's 
                respective post's comments via a GET request. 

                This is NO longer necessary, as we have the QUERY service (4002),
                which contains ALL the data. We simply pass in ALL comments
            */}
            <CommentCreate postId={post.id} />
            {/* OLD
            <CommentList postId={post.id} />  */}
            {/* NEW */}
            <CommentList comments={post.comments} />
          </div>
        </div>
      </div>
    );
  });

  console.log('Post list:', posts);

  return <div className="row">{renderedPosts}</div>;
};

export default PostList;
