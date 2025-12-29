import { pgTable, serial, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';

// 1. Users (Đồng bộ metadata từ Clerk nếu cần, hoặc chỉ dùng Clerk ID)
export const users = pgTable('users', {
    id: text('id').primaryKey(), // Clerk User ID
    email: text('email').notNull(),
    plan: text('plan').default('free'),
    createdAt: timestamp('created_at').defaultNow(),
});

// 2. Projects (Mỗi cuốn tiểu thuyết là 1 project)
export const projects = pgTable('projects', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(), // Link tới Clerk ID
    title: text('title').notNull(),
    coverImage: text('cover_image'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// 3. Nodes (Đại diện cho: Chapters, Characters, Locations, Notes)
// Bảng này cực quan trọng cho Graph View
export const nodes = pgTable('nodes', {
    id: serial('id').primaryKey(),
    projectId: integer('project_id').references(() => projects.id, { onDelete: 'cascade' }),
    type: text('type').notNull(), // 'chapter', 'character', 'location', 'note'
    title: text('title').notNull(),
    content: jsonb('content'), // Lưu nội dung Editor (BlockNote/Tiptap JSON)
    attributes: jsonb('attributes'), // Lưu metadata linh hoạt (VD: Tuổi, Phe phái, Status)
    parentId: integer('parent_id'), // Để xây dựng cây thư mục (Sidebar Tree)
    position: jsonb('graph_position'), // {x: 100, y: 200} cho React Flow
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// 4. Relations (Lưu các mối quan hệ cho Graph View)
export const relations = pgTable('relations', {
    id: serial('id').primaryKey(),
    sourceId: integer('source_id').references(() => nodes.id, { onDelete: 'cascade' }),
    targetId: integer('target_id').references(() => nodes.id, { onDelete: 'cascade' }),
    type: text('type'), // 'mentions', 'parent_of', 'located_in'
    createdAt: timestamp('created_at').defaultNow(),
});
