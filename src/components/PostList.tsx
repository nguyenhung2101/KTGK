import React, { useMemo, useState } from 'react';
import PostCard from './PostCard';
import { usePosts } from '../context/PostsContext';


const PostList: React.FC = () => {
const { posts } = usePosts();
const [filter, setFilter] = useState('');


const filtered = useMemo(() => {
const q = filter.trim().toLowerCase();
if (!q) return posts;
return posts.filter(p => p.title.toLowerCase().includes(q));
}, [posts, filter]);


return (
<div className="container">
<header className="page-header">
<h1>Danh sách bài viết</h1>
<div>Tổng số: {posts.length}</div>
</header>


<div className="filter-area">
<input placeholder="Tìm theo tiêu đề..." value={filter} onChange={e => setFilter(e.target.value)} />
</div>


<div className="grid">
{filtered.map(p => (
<PostCard key={p.id} post={p} />
))}
{filtered.length === 0 && <p>Không tìm thấy bài viết.</p>}
</div>
</div>
);
};


export default PostList;