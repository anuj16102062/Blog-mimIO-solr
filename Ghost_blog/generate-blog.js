const fs = require('fs');
// Read the existing data from the JSON file
const existingData = JSON.parse(fs.readFileSync('data-blogs.json'));

const blogs = existingData.blogs;

const startDate = new Date('2023-10-23T00:00:00Z');
const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

for (let i = 800; i <= 931; i++) {
  const randomDaysAgo = Math.floor(Math.random() * 365); // Random number between 0 and 364
  const publishDate = new Date(startDate.getTime() - randomDaysAgo * oneDay); // Note the subtraction to make dates in the past

  const blog = {
    id: i,
    title: `Universality ${i}`,
    content: `The technology-platform to be built for the Data Foundation should be usable across domains. Today, data analytics along with modern machine learning is a mature technology with several open and commercial implementations that are fast, accurate and scalable when designed for any particular application.

    However, scaling data analytics across domains remains a major challenge for the data analytics community, both nationally and globally. The bottle-neck in this endeavour lies in developing a deep understanding and abstraction of the needs of the domain, along with the knowledge of possibilities of modern analytics and machine learning solutions. Such abstraction and identification of needs and possibilities requires the continuous engagement of collaborating inter-disciplinary researchers, and is not a task that can be easily packaged and off-sourced to the industry.
    
    The platform to be built needs to capture the aspects that are common in such engagements, while allowing flexibility and configurability in aspects that are diverse across domains`,
    publishedAt: publishDate.toISOString(),
  };

  blogs.push(blog); // Append the new blog to the existing array
}

// Update the existing data with the new blogs
existingData.blogs = blogs;

// Write the updated data back to the JSON file
fs.writeFileSync('data-blogs.json', JSON.stringify(existingData, null, 2));