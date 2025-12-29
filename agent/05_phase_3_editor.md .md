# **PROMPT: PHASE 3 \- RICH TEXT EDITOR**

**Nhiệm vụ:** Tích hợp BlockNote và cơ chế lưu tự động. Tuân thủ 00\_master\_workflow.md.

**Task List:**

1. **Editor Component:**  
   * Cài đặt @blocknote/core và @blocknote/react.  
   * Tạo components/editor/blocknote-editor.tsx.  
   * Custom theme cho Editor để khớp với màu nền Grimoire (Dark mode).  
2. **Saving Mechanism (Quan trọng):**  
   * Tạo Server Action updatePageContent(id, content).  
   * Trong Editor, sử dụng useDebounce (khoảng 1000ms) để gọi Action lưu content khi user ngừng gõ.  
   * Hiển thị trạng thái saving ở góc trên (như thiết kế loading\_state).  
3. **Cover & Title:**  
   * Phần trên cùng của trang editor cho phép sửa Title và upload Cover Image (dùng UploadThing).

**Check & Push:**

* Gõ văn bản \-\> Reload trang \-\> Văn bản vẫn còn (Persist data).  
* Không bị lag khi gõ.  
* Push code: "feat(phase-3): blocknote editor integration".