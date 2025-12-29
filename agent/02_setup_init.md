# **PROMPT: INITIALIZATION & GITHUB SETUP**

**Nhiệm vụ:** Khởi tạo Codebase và đưa lên GitHub. Tuân thủ 00\_master\_workflow.md.

**Các bước thực hiện:**

1. **Init Next.js:**  
   * Chạy lệnh tạo dự án Next.js 15 với TypeScript, Tailwind, ESLint.  
   * Cài đặt shadcn/ui và init với cấu hình mặc định.  
   * Cài đặt các dependencies: drizzle-orm, @neondatabase/serverless, dotenv, @clerk/nextjs, lucide-react.  
   * Cài đặt dev dependencies: drizzle-kit.  
2. **Environment Setup:**  
   * Tạo file .env.local.  
   * Yêu cầu người dùng cung cấp: DATABASE\_URL (Neon), NEXT\_PUBLIC\_CLERK\_PUBLISHABLE\_KEY, CLERK\_SECRET\_KEY.  
3. **Database Config:**  
   * Tạo file drizzle.config.ts.  
   * Tạo file db/index.ts (kết nối Neon).  
   * Tạo file db/schema.ts (Copy schema đã thiết kế).  
4. **GitHub Init:**  
   * Khởi tạo git repo.  
   * Tạo .gitignore chuẩn.  
   * Thực hiện commit đầu tiên: "chore: init project structure".  
   * Đẩy code lên remote repository (Hỏi người dùng URL repo).

**Kết quả mong đợi:** Một dự án Next.js trắng, chạy được local, đã kết nối DB và Auth, code đã nằm trên GitHub.