import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './blogList.css';

function BlogList() {
  const itemsPerPage = 5;
  const [blogs, setBlogs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showRecentBlogs, setShowRecentBlogs] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      axios
        .get(`http://localhost:8000/api/blog/?search=${query}`)
        .then((response) => {
          if (response.data.matchingBlogs) {
            setSearchResults(response.data.matchingBlogs);
          } else {
            setSearchResults([]);
          }
        })
        .catch((err) => {
          setError(err.message);
          setSearchResults([]);
        });
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e.target.value);
    }
  };

  const fetchRecentBlogs = () => {
    axios
      .get('http://localhost:8000/api/recent-blogs')
      .then((response) => {
        setRecentBlogs(response.data.recentBlogs);
        setShowRecentBlogs(true);
      })
      .catch((err) => {
        setError(err.message);
        setRecentBlogs([]);
      });
  };

  useEffect(() => {
    if (searchResults.length === 0 && !error) {
      axios
        .get('http://localhost:8000/api/blogs')
        .then((response) => {
          setBlogs(response.data.blogs.blogs);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [searchResults, error]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    scrollToTop();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedBlogs = searchResults.length > 0 ? searchResults : blogs.slice(startIndex, endIndex);

  return (
    <div className="blog-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          onKeyPress={handleSearchKeyPress}
        />
      </div>
      <button onClick={fetchRecentBlogs} className="green-button">
        Fetch Recent Blogs
      </button>
      <h1>Blog List</h1>

      <ul>
        {displayedBlogs.map((blog) => (
          <li key={blog.id} className="blog-item">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-content">{blog.content}</p>
          </li>
        ))}
      </ul>

      {currentPage < Math.ceil(displayedBlogs.length / itemsPerPage) - 1 && (
        <button onClick={nextPage} className="next-button">
          Next
        </button>
      )}

      {showRecentBlogs && recentBlogs.length > 0 && (
        <div className="recent-blogs">
          <h2>Recent Blogs</h2>
          <ul>
            {recentBlogs.map((blog) => (
              <li key={blog.id} className="recent-blog-item">
                <h3 className="recent-blog-title">{blog.title}</h3>
                <p className="recent-blog-content">{blog.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showRecentBlogs && recentBlogs.length > 0 && (
        <button onClick={nextPage} className="next-button">
          Next (Recent)
        </button>
      )}
    </div>
  );
}

export default BlogList;
