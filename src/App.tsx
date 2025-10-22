import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { PostsProvider, usePosts } from './context/PostsContext';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';

const CreatePage: React.FC = () => <PostForm mode="create" />;

const EditPage: React.FC = () => {
  const { getPost } = usePosts();
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>Không tìm thấy bài viết để sửa.</div>;

  const post = getPost(id);
  if (!post) return <div>Không tìm thấy bài viết để sửa.</div>;

  return <PostForm mode="edit" initial={post} idToEdit={id} />;
};

const App: React.FC = () => {
  return (
    <PostsProvider>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/posts/edit/:id" element={<EditPage />} />
          <Route path="*" element={<div>Trang không tồn tại</div>} />
        </Routes>
      </div>
    </PostsProvider>
  );
};

export default App;
