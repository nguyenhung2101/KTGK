import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPost, deletePost } = usePosts();

  if (!id) return <div>Không có ID</div>;

  const post = getPost(id);
  if (!post) return <div>Không tìm thấy bài viết.</div>;

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      deletePost(post.id);
      window.alert('Xóa thành công');
      navigate('/');
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>⬅ Quay lại</button>
      <div className="detail">
        <h1>{post.title}</h1>
        <div className="meta">
          {post.author} • {new Date(post.date).toLocaleDateString()} • {post.category}
        </div>
        <img src={post.thumbnail} alt={post.title} className="detail-thumb" />
        <div className="content">{post.content}</div>

        <div className="detail-actions">
          <button onClick={() => navigate(`/posts/edit/${post.id}`)}>Chỉnh sửa</button>
          <button onClick={handleDelete}>Xóa bài viết</button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
