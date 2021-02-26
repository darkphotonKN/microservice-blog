import React from 'react';
import PostCreate from './PostCreate';

import PostList from './PostList';

const App = () => {
  /**
   * To run this app, run thisa react app and all the microservices 3001, 3002, 3003, 3005
   * from the microservices/blog folder
   */
  return (
    <div className="container">
      <h3 className="mt-3">Blog App</h3>
      <PostCreate />
      <div className="mt-3">Posts</div>
      <hr />

      <PostList />
    </div>
  );
};

export default App;
