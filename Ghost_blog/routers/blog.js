const express = require('express')
const fs = require('fs');
const router = new express.Router()
const blogs = JSON.parse(fs.readFileSync('./data-blogs.json'));


// List of all published blogs
router.get('/api/blogs', (req, res) => {
    
    const blogCount = blogs.blogs.length;
    res.json({ blogCount, blogs });
  });
  
  // List of blogs published in the last week
  router.get('/api/recent-blogs', (req, res) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentBlogs = blogs.blogs.filter(blog => new Date(blog.publishedAt) >= oneWeekAgo);
    const blogCount =recentBlogs.length
    res.json({blogCount,recentBlogs});
  });
  
// Get the content of a blog by ID or Title
// Get the content of a blog by ID or Title
router.get('/api/blog/', (req, res) => {
    const idOrTitle = req.query.search;
    // Check if idOrTitle is a number (implying ID) or a string (implying Title)
    const isNumber = !isNaN(idOrTitle);

    if (isNumber) {
      // Search by ID
      const matchingBlogs = [blogs.blogs.find(blog => blog.id === parseInt(idOrTitle))];
      
      if (matchingBlogs) {
        res.json({ blogCount: 1,matchingBlogs});
      } else {
        res.json({ blogCount: 0, message: "Blog not found" });
      }
    } else {
      // Search by Title
    const matchingBlogs = blogs.blogs.filter(blog => blog.title.includes(idOrTitle));

      if (matchingBlogs) {
        const blogCount = matchingBlogs.length
        res.json({ blogCount: blogCount, matchingBlogs });
      } else {
        res.json({ blogCount: 0, message: "Blog not found" });
      }
    }
  });


module.exports = router