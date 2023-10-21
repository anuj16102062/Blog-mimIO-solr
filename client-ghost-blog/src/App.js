import React, { useState, useEffect } from 'react';
import BlogList from './component/blogList';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <BlogList
          />
        </>
      )}
    </div>
  );
}

export default App;
