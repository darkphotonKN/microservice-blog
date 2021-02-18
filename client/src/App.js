import React from 'react';
import PostCreate from './PostCreate';

import PostList from './PostList';

const App = () => {
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
