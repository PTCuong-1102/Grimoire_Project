# **📘 KẾ HOẠCH TRIỂN KHAI KỸ THUẬT: PROJECT GRIMOIRE**

**Tech Stack:** Next.js 15 (App Router) • NeonDB • Drizzle ORM • Clerk • Tailwind CSS

## **1\. TỔNG QUAN KIẾN TRÚC (ARCHITECTURE OVERVIEW)**

Dự án sẽ sử dụng mô hình **Serverless Architecture** để tối ưu chi phí và khả năng mở rộng.

* **Frontend & API Layer:** Next.js 15\. Sử dụng React Server Components (RSC) mặc định để fetch dữ liệu trực tiếp từ DB, giảm thiểu Javascript gửi xuống client.  
* **Database:** NeonDB (Serverless PostgreSQL). Tận dụng tính năng **Database Branching** để mỗi tính năng mới (Feature) sẽ được phát triển trên một nhánh database riêng biệt, không ảnh hưởng đến dữ liệu production.  
* **ORM:** Drizzle ORM. Kết nối trực tiếp với Neon qua giao thức HTTP (Serverless Driver) để tránh giới hạn connection pool.  
* **Auth:** Clerk. Xử lý xác thực người dùng, session management và bảo vệ các routes (Middleware).  
* **State Management:**  
  * *Server State:* TanStack Query (React Query) để quản lý dữ liệu bất đồng bộ và Optimistic Updates (cập nhật giao diện trước khi server phản hồi).  
  * *Global State:* Zustand (cho các trạng thái UI như đóng/mở sidebar, dark mode).

## **2\. THIẾT KẾ CƠ SỞ DỮ LIỆU (SCHEMA DESIGN \- DRIZZLE)**

Dựa trên UI Grimoire (Chapter, Character, Graph), đây là cấu trúc Database đề xuất. Chúng ta kết hợp giữa SQL quan hệ (cho cấu trúc) và JSONB (cho nội dung linh hoạt).

// db/schema.ts (Dự kiến)

import { pgTable, serial, text, timestamp, integer, jsonb, boolean, uuid } from 'drizzle-orm/pg-core';

// 1\. Users (Đồng bộ metadata từ Clerk nếu cần, hoặc chỉ dùng Clerk ID)  
export const users \= pgTable('users', {  
  id: text('id').primaryKey(), // Clerk User ID  
  email: text('email').notNull(),  
  plan: text('plan').default('free'),  
});

// 2\. Projects (Mỗi cuốn tiểu thuyết là 1 project)  
export const projects \= pgTable('projects', {  
  id: serial('id').primaryKey(),  
  userId: text('user\_id').notNull(), // Link tới Clerk ID  
  title: text('title').notNull(),  
  coverImage: text('cover\_image'),  
  createdAt: timestamp('created\_at').defaultNow(),  
});

// 3\. Nodes (Đại diện cho: Chapters, Characters, Locations, Lor)  
// Bảng này cực quan trọng cho Graph View  
export const nodes \= pgTable('nodes', {  
  id: serial('id').primaryKey(),  
  projectId: integer('project\_id').references(() \=\> projects.id),  
  type: text('type').notNull(), // 'chapter', 'character', 'location', 'note'  
  title: text('title').notNull(),  
  content: jsonb('content'), // Lưu nội dung Editor (BlockNote/Tiptap JSON)  
  attributes: jsonb('attributes'), // Lưu metadata linh hoạt (VD: Tuổi, Phe phái, Status)  
  parentId: integer('parent\_id'), // Để xây dựng cây thư mục (Sidebar Tree)  
  position: jsonb('graph\_position'), // {x: 100, y: 200} cho React Flow  
  updatedAt: timestamp('updated\_at').defaultNow(),  
});

// 4\. Relations (Lưu các mối quan hệ cho Graph View)  
export const relations \= pgTable('relations', {  
  id: serial('id').primaryKey(),  
  sourceId: integer('source\_id').references(() \=\> nodes.id),  
  targetId: integer('target\_id').references(() \=\> nodes.id),  
  type: text('type'), // 'mentions', 'parent\_of', 'located\_in'  
});

## **3\. LỘ TRÌNH THỰC HIỆN (PHASED ROADMAP)**

### **Giai đoạn 1: Foundation & Authentication (Tuần 1\)**

*Mục tiêu: Thiết lập môi trường, kết nối DB và đăng nhập.*

1. **Khởi tạo dự án:**  
   * Setup Next.js \+ Tailwind CSS.  
   * Cài đặt shadcn/ui và copy các config màu từ file HTML cũ vào tailwind.config.ts.  
2. **Tích hợp Clerk:**  
   * Bọc ứng dụng trong \<ClerkProvider\>.  
   * Tạo trang sign-in và sign-up custom để khớp với giao diện Grimoire.  
3. **Setup Neon & Drizzle:**  
   * Tạo Project trên Neon Console.  
   * Cấu hình drizzle.config.ts và chạy migration đầu tiên.  
   * Viết script seed.ts để tạo dữ liệu mẫu (dựa trên file project\_grimoire\_\_main\_layout bạn đã gửi).

### **Giai đoạn 2: Core Editor & Sidebar (Tuần 2\)**

*Mục tiêu: Người dùng có thể tạo trang, viết nội dung và lưu trữ.*

1. **Sidebar Navigation (Server Component):**  
   * Viết query Drizzle đệ quy (hoặc fetch flat list rồi convert sang tree) để lấy danh sách pages.  
   * Implement logic đóng/mở folder (sử dụng \<details\> và \<summary\> như file HTML gốc hoặc component Collapsible của Shadcn).  
2. **Rich Text Editor (Client Component):**  
   * Tích hợp thư viện **BlockNote** (gợi ý số 1 cho phong cách Notion).  
   * Tạo Custom Blocks nếu cần (ví dụ block Character Card nhúng trong văn bản).  
3. **Cơ chế Lưu (Autosave):**  
   * Sử dụng useDebounce để không spam request lên server.  
   * Dùng **Server Actions** (updateNodeContent) để lưu JSON xuống NeonDB.  
   * Hiển thị trạng thái "Saving..." \-\> "Saved" ở góc trên (như file project\_grimoire\_\_loading\_state).

### **Giai đoạn 3: World Building System (Tuần 3\)**

*Mục tiêu: Quản lý Character và tích hợp vào Editor.*

1. **Character Panel (Slide-over):**  
   * Tái tạo giao diện project\_grimoire\_\_character\_card\_panel.  
   * Form nhập liệu sử dụng react-hook-form \+ zod để validate dữ liệu (Tên, Tuổi, Phe phái...).  
   * Lưu các thuộc tính này vào cột attributes (JSONB) trong bảng nodes.  
2. **Mentions System:**  
   * Trong Editor, khi gõ @Elias, hệ thống sẽ query bảng nodes (filter type \= character) để gợi ý.  
   * Khi chọn nhân vật, tự động tạo một record trong bảng relations (Chapter \-\> mentions \-\> Character).

### **Giai đoạn 4: Graph View & Visualization (Tuần 4\)**

*Mục tiêu: Hiển thị mối quan hệ dữ liệu trực quan.*

1. **Data Transformation:**  
   * Viết API Route /api/graph lấy toàn bộ nodes và relations.  
   * Chuyển đổi dữ liệu sang format của **React Flow** ({ id, position, data }).  
2. **React Flow Integration:**  
   * Implement giao diện project\_grimoire\_\_graph\_view.  
   * Custom Node: Tạo node React component tùy chỉnh để hiển thị Avatar nhân vật hoặc Icon chương truyện trên biểu đồ.  
   * Tính năng Auto-layout: Sử dụng dagre hoặc elkjs để tự động sắp xếp vị trí các node nếu chưa có tọa độ.

## **4\. CHIẾN LƯỢC TỐI ƯU HIỆU NĂNG (PERFORMANCE STRATEGY)**

Để đảm bảo tiêu chí "Nhanh", chúng ta sẽ áp dụng:

1. **Partial Prerendering (PPR \- Next.js Experimental):**  
   * Sidebar và Navbar sẽ được render tĩnh (Static).  
   * Nội dung Editor và Graph sẽ được stream động (Dynamic).  
2. **Optimistic UI:**  
   * Khi người dùng đổi tên Chapter ở Sidebar: Giao diện cập nhật TỨC THÌ \-\> Gửi request ngầm update DB \-\> Nếu lỗi thì revert. Không chờ server phản hồi mới update UI.  
3. **Database Indexing:**  
   * Đánh Index trong NeonDB cho các cột hay query: userId, type, parentId.

## **5\. CÔNG CỤ & TÀI NGUYÊN CẦN THIẾT**

* **Repository:** GitHub.  
* **Deployment:** Vercel (Tương thích tốt nhất với Next.js & Neon).  
* **CI/CD:** GitHub Actions (Tự động chạy Drizzle Migration khi merge code).  
* **Icons:** Lucide React (Thay thế Google Material Symbols để load nhanh hơn, nhưng vẫn giữ style stroke mảnh).

## **6\. KẾT LUẬN**

Kế hoạch này tận dụng tối đa sức mạnh của **NeonDB** (khả năng mở rộng, JSONB) và **Next.js App Router** để xử lý logic phức tạp của một ứng dụng viết tiểu thuyết. Việc sử dụng **Drizzle** giúp code gọn nhẹ và **Clerk** giúp bạn không phải lo lắng về bảo mật user.

Bạn có muốn tôi bắt đầu bằng việc tạo cấu trúc thư mục (File Structure) cho dự án này không?