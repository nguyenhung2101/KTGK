import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


const Navbar: React.FC = () => {
const navigate = useNavigate();


return (
    <nav className="navbar">
    <div className="nav-left" onClick={() => navigate('/') } style={{cursor:'pointer'}}>
    <div className="logo">BLOG</div>
    </div>
    <div className="nav-center">
    <NavLink to="/" className={({isActive}) => isActive? 'active' : ''}>Trang chủ</NavLink>
    <NavLink to="/posts/create" className={({isActive}) => isActive? 'active' : ''}>Viết bài</NavLink>
    </div>
    <div className="nav-right">
    <button onClick={() => navigate('/posts/create')}>Viết bài mới</button>
    </div>
    </nav>
);
};
export default Navbar;