import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import { Post, Category } from '../types';

interface PostFormProps {
  mode: 'create' | 'edit';
  initial?: Post;
  idToEdit?: string;
}

const categories: Category[] = ['Công nghệ', 'Du lịch', 'Ẩm thực', 'Đời sống', 'Khác'];

const PostForm: React.FC<PostFormProps> = ({ mode, initial, idToEdit }) => {
  const navigate = useNavigate();
  const { addPost, updatePost } = usePosts();

  const [title, setTitle] = useState(initial?.title || '');
  const [author, setAuthor] = useState(initial?.author || '');
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail || '');
  const [category, setCategory] = useState<Category>(initial?.category || categories[0]);
  const [content, setContent] = useState(initial?.content || '');

  const validate = () => {
    if (title.trim().length < 10) {
      alert('Tiêu đề bắt buộc, ít nhất 10 ký tự');
      return false;
    }
    if (author.trim().length < 3) {
      alert('Tác giả bắt buộc, ít nhất 3 ký tự');
      return false;
    }
    if (content.trim().length < 50) {
      alert('Nội dung bắt buộc, ít nhất 50 ký tự');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'create') {
      const newPost: Post = {
        id: Date.now().toString(),
        title,
        author,
        thumbnail,
        content,
        category,
        date: new Date().toISOString().split('T')[0],
      };
      addPost(newPost);
      alert('Đăng bài thành công!');
      navigate('/');
    } else if (mode === 'edit' && idToEdit) {
      const updated: Post = {
        id: idToEdit,
        title,
        author,
        thumbnail,
        content,
        category,
        date: initial?.date || new Date().toISOString().split('T')[0],
      };
      updatePost(idToEdit, updated);
      alert('Cập nhật thành công!');
      navigate(`/posts/${idToEdit}`);
    }
  };

  const handleCancel = () => {
    if (mode === 'create') navigate('/');
    else if (mode === 'edit' && idToEdit) navigate(`/posts/${idToEdit}`);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{mode === 'create' ? '📝 Viết bài mới' : '✏️ Chỉnh sửa bài viết'}</h2>

      <label>
        Tiêu đề
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <label>
        Tác giả
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>

      <label>
        URL ảnh thumbnail
        <input
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="https://..."
        />
      </label>

      <label>
        Thể loại
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        Nội dung
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
        />
      </label>

      <div className="form-actions">
        <button type="submit">
          {mode === 'create' ? 'Đăng bài' : 'Cập nhật'}
        </button>
        <button type="button" onClick={handleCancel}>
          Hủy
        </button>
      </div>
    </form>
  );
};

export default PostForm;
