# **PROMPT: PHASE 4 \- GRAPH VIEW**

**Nhiệm vụ:** Hiển thị dữ liệu dưới dạng node graph. Tuân thủ 00\_master\_workflow.md.

**Task List:**

1. **Data Transformation API:**  
   * Viết Server Action getGraphData(projectId) trả về danh sách nodes và edges theo format của React Flow.  
   * Logic edges: Dựa vào bảng node\_relations.  
2. **React Flow Integration:**  
   * Cài đặt reactflow.  
   * Tạo trang app/(main)/project/\[projectId\]/graph/page.tsx.  
   * Config CustomNode để hiển thị Avatar nhân vật hoặc Icon chapter trên node.  
3. **Interactivity:**  
   * Cho phép click vào Node trên graph \-\> Mở slide-over chi tiết node đó.  
   * Lưu vị trí node (x, y) khi user kéo thả (gọi Server Action updateNodePosition).

**Check & Push:**

* Biểu đồ hiển thị đúng mối quan hệ.  
* Kéo thả mượt mà.  
* Push code: "feat(phase-4): interactive graph view".