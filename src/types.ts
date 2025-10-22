// src/types.ts

// Các thể loại bài viết
export type Category = 'Công nghệ' | 'Du lịch' | 'Ẩm thực' | 'Đời sống' | 'Khác';

// Kiểu dữ liệu của 1 bài viết
export interface Post {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  content: string;
  category: Category;
  date: string; // ngày đăng
}
