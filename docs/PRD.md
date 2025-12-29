# Product Requirements Document (PRD): Project Grimoire

## 1. Product Overview (Tổng quan sản phẩm)
**Project Grimoire** là một ứng dụng web hỗ trợ viết tiểu thuyết hiện đại, kết hợp trải nghiệm soạn thảo mượt mà (Notion-style) với khả năng xây dựng thế giới (World Building) mạnh mẽ thông qua Graph View. Hệ thống được tối ưu hóa cho tốc độ, khả năng tập trung và tính liên kết dữ liệu.

### Mục tiêu cốt lõi:
- **Fast & Focused:** Giao diện tối giản, tốc độ phản hồi tức thì với kiến trúc Serverless.
- **Connected:** Mọi dữ liệu (Chương, Nhân vật, Địa danh) đều được liên kết và trực quan hóa.
- **Flexible:** Cấu trúc chương hồi linh hoạt dạng cây (Nested Tree).

## 2. User Stories (Câu chuyện người dùng)

### 2.1. Quản lý Dự án & Cấu trúc (Sidebar System)
- **Là một Tác giả**, tôi muốn tạo nhiều "Project" (cuốn tiểu thuyết) khác nhau.
- **Là một Tác giả**, tôi muốn tổ chức các chương (Chapter), ghi chú (Notes), và hồ sơ nhân vật (Profiles) theo cấu trúc thư mục cây đa cấp.
- **Là một Tác giả**, tôi muốn kéo thả để sắp xếp lại vị trí các chương.

### 2.2. Soạn thảo (Core Editor)
- **Là một Tác giả**, tôi muốn viết nội dung với trải nghiệm "Block-based" (giống Notion) để dễ dàng chèn tiêu đề, list, hình ảnh.
- **Là một Tác giả**, tôi muốn hệ thống tự động lưu (Autosave) để không bao giờ mất dữ liệu.
- **Là một Tác giả**, tôi muốn nhắc tên nhân vật (Mentions) bằng cú pháp `@Tên` để tạo liên kết nhanh.

### 2.3. Xây dựng Thế giới (World Building & Attributes)
- **Là một World-builder**, tôi muốn tạo hồ sơ chi tiết cho Nhân vật (Tên, Tuổi, Phe phái, Tiền sử).
- **Là một World-builder**, tôi muốn mở nhanh panel thông tin nhân vật ngay bên cạnh trình soạn thảo để tra cứu mà không cần chuyển trang.

### 2.4. Trực quan hóa (Graph View)
- **Là một Planner**, tôi muốn xem biểu đồ mối quan hệ (Graph View) giữa các nhân vật và chương truyện để kiểm soát mạch truyện.
- **Là một Planner**, tôi muốn click vào một node trên biểu đồ để nhảy đến nội dung tương ứng.

## 3. User Experience Flow (Luồng trải nghiệm)

```mermaid
graph TD
    A[Landing/Login] --> B[Dashboard (List Projects)]
    B --> C[Editor Workspace]
    C --> D[Sidebar (Tree Navigation)]
    C --> E[Main Editor (BlockNote)]
    C --> F[Right Panel (Attributes/Info)]
    E -- Type @Name --> G[Link Creation]
    C -- Toggle View --> H[Graph Visualization]
```

## 4. Non-Functional Requirements (Yêu cầu phi chức năng)
- **Performance:** Thời gian tải trang < 1s (sử dụng Next.js PPR).
- **Reliability:** Dữ liệu được đồng bộ an toàn trên NeonDB.
- **Accessibility:** Hỗ trợ Dark Mode mặc định.
