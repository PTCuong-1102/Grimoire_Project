# Technical Specifications (TECH SPEC): Project Grimoire

## 1. System Architecture (Kiến trúc hệ thống)

Dự án áp dụng mô hình **Serverless - Edge First** để tối ưu hóa hiệu năng và chi phí.

- **Framework:** Next.js 15 (App Router).
- **Rendering Strategy:**
  - **RSC (React Server Components):** Xử lý logic fetch data và render layout (Sidebar, Page Skeleton).
  - **SSR/Streaming:** Áp dụng Partial Prerendering (PPR) cho nội dung động.
  - **Client Components:** Chỉ sử dụng cho các tương tác UI (Editor, Graph, Interactivity).
- **Database:** NeonDB (Serverless PostgreSQL) kết nối qua HTTP Driver.
- **Authentication:** Clerk (Middleware protection & User Management).

## 2. Database Schema (Drizzle ORM)

### 2.1. `users`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `text` | `PK` | Clerk User ID |
| `email` | `text` | `NOT NULL` | User Email |
| `plan` | `text` | `DEFAULT 'free'` | Subscription tier |

### 2.2. `projects`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `serial` | `PK` | Project ID |
| `user_id` | `text` | `NOT NULL` | Reference `users.id` |
| `title` | `text` | `NOT NULL` | Project Name |
| `cover_image` | `text` | | URL image |
| `created_at` | `timestamp` | `DEFAULT now()` | Creation time |

### 2.3. `nodes` (Core Table)
Lưu trữ tất cả các thực thể: Chương, Nhân vật, Ghi chú.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `serial` | `PK` | Node ID |
| `project_id` | `integer` | `FK` | Reference `projects.id` |
| `type` | `text` | `NOT NULL` | `chapter`, `character`, `location`, `note` |
| `title` | `text` | `NOT NULL` | Display Name |
| `content` | `jsonb` | | Editor content (BlockNote/TipTap JSON) |
| `attributes` | `jsonb` | | Flexible Metadata (e.g. `{ "age": 20, "faction": "Empire" }`) |
| `parent_id` | `integer` | | Self-reference for Tree Structure |
| `graph_position`| `jsonb` | | `{ x: number, y: number }` for React Flow |
| `updated_at`| `timestamp`| `DEFAULT now()` | Last modified |

### 2.4. `relations` (Graph Edges)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `serial` | `PK` | Relation ID |
| `source_id` | `integer` | `FK` | From Node |
| `target_id` | `integer` | `FK` | To Node |
| `type` | `text` | | `mentions`, `parent_of`, `located_in` |

## 3. API & Data Flow Strategy

### Data Fetching
- Sử dụng trực tiếp Drizzle trong Server Components (không cần API route trung gian cho GET requests).
- Pattern: `await db.select().from(nodes)...`

### Mutations (Create/Update/Delete)
- Sử dụng **Server Actions** cho mọi thay đổi dữ liệu.
- Validate input bằng `zod` trước khi query DB.
- Revalidate cache: `revalidatePath('/project/[id]')` sau khi mutate.

## 4. Key Libraries & Tools
- **UI:** Tailwind CSS, Shadcn/ui, Lucide React.
- **State:** Zustand (Global UI state), React Query (Async/Server state - nếu cần optimistic updates phức tạp).
- **Editor:** `@blocknote/core`, `@blocknote/react` (Notion-like experience).
- **Visualization:** `reactflow` (Graph interactions).
- **Utils:** `clsx`, `tailwind-merge` (Styling), `date-fns`.
