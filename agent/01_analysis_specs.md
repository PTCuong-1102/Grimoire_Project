# **PROMPT: ANALYSIS & DOCUMENTATION**

**Nhiệm vụ:** Phân tích dự án Grimoire dựa trên các file thiết kế UI/UX đã cung cấp và tạo bộ tài liệu kỹ thuật chuẩn.

**Input:**

* Tech Stack: Next.js 15 (App Router), NeonDB (Postgres), Drizzle ORM, Clerk Auth, Shadcn/ui, BlockNote, React Flow.  
* Design Files: Các file HTML và ảnh chụp màn hình trong thư mục Grimoire/UI\_UX\_Design.

**Output yêu cầu (Hãy tạo các file sau):**

1. docs/PRD.md (Product Requirements Document):  
   * Mô tả mục tiêu sản phẩm (Ứng dụng viết tiểu thuyết phong cách Notion).  
   * User Stories chi tiết cho từng tính năng (Sidebar, Editor, Graph).  
   * Flowchart logic của người dùng.  
2. docs/TECH\_SPEC.md:  
   * Kiến trúc hệ thống (Serverless, Server Actions).  
   * Cấu trúc Database Schema (Chi tiết bảng users, projects, nodes, relations).  
   * API Endpoints (hoặc Server Actions) cần thiết.  
3. docs/PROJECT\_STRUCTURE.md:  
   * Cây thư mục dự kiến của Next.js App Router.

**Lưu ý:** Hãy phân tích kỹ file schema.ts đã được đề xuất trước đó để đưa vào Tech Spec.