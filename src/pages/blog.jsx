import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const BlogHeader = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: #333;
`;

const BlogPost = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  padding: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogTitle = styled.h2`
  font-size: 1.8rem;
  color: #007BFF;
`;

const BlogDate = styled.p`
  font-size: 0.9rem;
  color: #999;
`;

const BlogExcerpt = styled.p`
  font-size: 1.1rem;
  color: #555;
`;

const ReadMore = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  text-decoration: none;
  color: #007BFF;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const PostContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const PostContent = styled.div`
  font-size: 1.1rem;
  color: #555;
`;

// BlogPage Component
const BlogPage = () => {
  const posts = [
    {
      id: 1,
      title: 'The Future of E-commerce',
      date: 'September 29, 2024',
      excerpt: 'Exploring the trends shaping the future of online shopping.',
      content: 'E-commerce is evolving rapidly with new technologies and trends. In this blog, we explore the various aspects that are shaping the future of online shopping...',
    },
    {
      id: 2,
      title: 'How to Choose the Right Marketplace',
      date: 'September 25, 2024',
      excerpt: 'A guide to selecting the best platform for your products.',
      content: 'Choosing the right marketplace can be a game-changer for your business. This guide covers everything you need to know about selecting the best platform for your products...',
    },
    // Add more posts as needed
  ];

  const PostList = () => (
    <>
      <BlogHeader>Our Blog</BlogHeader>
      {posts.map(post => (
        <BlogPost key={post.id}>
          <BlogTitle>{post.title}</BlogTitle>
          <BlogDate>{post.date}</BlogDate>
          <BlogExcerpt>{post.excerpt}</BlogExcerpt>
          <ReadMore to={`/blog/${post.id}`}>Read More</ReadMore>
        </BlogPost>
      ))}
    </>
  );

  const PostDetail = () => {
    const { id } = useParams();
    const post = posts.find(p => p.id === parseInt(id, 10));

    return (
      <PostContainer>
        <PostTitle>{post.title}</PostTitle>
        <BlogDate>{post.date}</BlogDate>
        <PostContent>{post.content}</PostContent>
      </PostContainer>
    );
  };

  return (
    <BlogContainer>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/:id" element={<PostDetail />} />
      </Routes>
    </BlogContainer>
  );
};

// App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/blog/*" element={<BlogPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
