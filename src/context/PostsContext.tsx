import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post } from '../types';

// 🔹 Kiểu dữ liệu cho context
interface PostsContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (id: string, updated: Post) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => Post | undefined;
}

// 🔹 Tạo context với kiểu mặc định là undefined
const PostsContext = createContext<PostsContextType | undefined>(undefined);

// 🔹 Provider bao quanh toàn bộ ứng dụng
export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Giới thiệu React Router',
      author: 'Nguyễn Văn A',
      thumbnail: 'https://picsum.photos/300/200?1',
      content: 'React Router là thư viện điều hướng cho React giúp quản lý route dễ dàng...',
      category: 'Công nghệ',
      date: '2025-10-20',
    },
    {
      id: '2',
      title: 'Khám phá Đà Lạt',
      author: 'Trần Thị B',
      thumbnail: 'https://picsum.photos/300/200?2',
      content: 'Đà Lạt là thành phố tuyệt đẹp với khí hậu mát mẻ quanh năm...',
      category: 'Du lịch',
      date: '2025-10-21',
    },
    {
      id: '3',
      title: 'Cách nấu phở bò ngon',
      author: 'Lê Văn C',
      thumbnail: 'https://picsum.photos/300/200?3',
      content: 'Phở bò là món ăn truyền thống nổi tiếng của Việt Nam...',
      category: 'Ẩm thực',
      date: '2025-10-18',
    },
  ]);

  // 🔹 Các hàm thao tác
  const addPost = (post: Post) => setPosts([...posts, post]);
  const updatePost = (id: string, updated: Post) =>
    setPosts(posts.map((p) => (p.id === id ? updated : p)));
  const deletePost = (id: string) => setPosts(posts.filter((p) => p.id !== id));
  const getPost = (id: string) => posts.find((p) => p.id === id);

  return (
    <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost, getPost }}>
      {children}
    </PostsContext.Provider>
  );
};

// 🔹 Custom hook để dùng context
export const usePosts = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('❌ usePosts must be used within a PostsProvider');
  }
  return context;
};
