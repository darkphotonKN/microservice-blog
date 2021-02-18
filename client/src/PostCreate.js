import React, { useState } from 'react';
import axios from 'axios';

export default () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/posts', {
      title,
    });

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Title">Create Post</label>
          <input
            type="text"
            className="form-control my-3"
            value={title}
            placeholder="Enter post content..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};
