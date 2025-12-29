# **PROMPT: PHASE 2 \- CORE UI & SIDEBAR**

**dNhiệm vụ:** Xây dựng Sidebar và điều hướng. Tuân thủ 00\_master\_workflow.md.

**Task List:**

1. **Sidebar Component:**  
   * Tạo component components/sidebar/app-sidebar.tsx.  
   * Sử dụng shadcn/ui components (Collapsible, Button, ScrollArea).  
   * **Logic:** Fetch danh sách projects và nodes (dạng cây) từ Server Action.  
   * Hiển thị đúng icon cho từng loại node (Folder, File, Character).  
2. **Resizable Layout:**  
   * Sử dụng react-resizable-panels (có trong shadcn) để làm Sidebar có thể kéo giãn chiều rộng.  
3. **Navigation Logic:**  
   * Khi click vào item trên sidebar \-\> Navigate tới /project/\[projectId\]/\[nodeId\].  
   * Active state: Highlight item đang được chọn.

**Check & Push:**

* Sidebar hiển thị đúng dữ liệu từ DB.  
* Đóng/mở folder mượt mà.  
* Push code: "feat(phase-2): sidebar navigation system".