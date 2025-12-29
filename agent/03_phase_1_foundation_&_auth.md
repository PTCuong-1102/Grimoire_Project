# **PROMPT: PHASE 1 \- FOUNDATION & AUTH**

**Nhiệm vụ:** Xây dựng khung sườn ứng dụng. Tuân thủ 00\_master\_workflow.md.

**Task List:**

1. **Authentication Integration:**  
   * Cấu hình Clerk Middleware (middleware.ts) để bảo vệ các route /dashboard.  
   * Tạo trang Login/Register (app/sign-in/\[\[...sign-in\]\]/page.tsx) sử dụng Clerk Component nhưng style theo giao diện Grimoire (Dark theme).  
2. **Database Sync:**  
   * Chạy npx drizzle-kit push để đồng bộ schema lên NeonDB.  
   * Tạo script scripts/seed.ts để tạo dữ liệu mẫu (1 User, 1 Project "Grimoire Demo", vài Chapter mẫu).  
3. **Layout Structure:**  
   * Xây dựng app/layout.tsx (Root Layout) tích hợp Theme Provider (Dark mode default).  
   * Xây dựng app/(main)/layout.tsx cho phần Dashboard (nơi sẽ chứa Sidebar sau này).

**Check & Push:**

* Đảm bảo đăng nhập được bằng Google/Email.  
* Đảm bảo Database có dữ liệu mẫu.  
* Push code: "feat(phase-1): auth and database setup".