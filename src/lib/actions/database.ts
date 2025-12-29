'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { projects, nodes } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Project Actions
export async function createProject(title: string) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    const [project] = await db
        .insert(projects)
        .values({
            userId,
            title,
        })
        .returning();

    revalidatePath('/dashboard');
    return project;
}

export async function getUserProjects() {
    const { userId } = await auth();
    if (!userId) return [];

    return await db
        .select()
        .from(projects)
        .where(eq(projects.userId, userId))
        .orderBy(projects.createdAt);
}

// Node Actions
export async function createNode(data: {
    projectId: number;
    type: 'chapter' | 'character' | 'location' | 'note';
    title: string;
    parentId?: number;
}) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    // Verify project ownership
    const project = await db.query.projects.findFirst({
        where: eq(projects.id, data.projectId),
    });

    if (!project || project.userId !== userId) {
        throw new Error('Unauthorized');
    }

    const [node] = await db
        .insert(nodes)
        .values({
            projectId: data.projectId,
            type: data.type,
            title: data.title,
            parentId: data.parentId || null,
            content: {},
            attributes: {},
        })
        .returning();

    revalidatePath(`/project/${data.projectId}`);
    return node;
}

export async function getProjectNodes(projectId: number) {
    const { userId } = await auth();
    if (!userId) return [];

    // Verify project ownership
    const project = await db.query.projects.findFirst({
        where: eq(projects.id, projectId),
    });

    if (!project || project.userId !== userId) {
        return [];
    }

    return await db
        .select()
        .from(nodes)
        .where(eq(nodes.projectId, projectId))
        .orderBy(nodes.createdAt);
}

export async function getNode(nodeId: number) {
    const { userId } = await auth();
    if (!userId) return null;

    const node = await db.query.nodes.findFirst({
        where: eq(nodes.id, nodeId),
    });

    if (!node) return null;

    // Verify project ownership
    const project = await db.query.projects.findFirst({
        where: eq(projects.id, node.projectId),
    });

    if (!project || project.userId !== userId) {
        return null;
    }

    return node;
}

export async function updateNodeContent(nodeId: number, content: any) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    const node = await getNode(nodeId);
    if (!node) throw new Error('Node not found');

    const [updated] = await db
        .update(nodes)
        .set({
            content,
            updatedAt: new Date(),
        })
        .where(eq(nodes.id, nodeId))
        .returning();

    revalidatePath(`/project/${node.projectId}/${nodeId}`);
    return updated;
}

export async function updateNodeTitle(nodeId: number, title: string) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    const node = await getNode(nodeId);
    if (!node) throw new Error('Node not found');

    const [updated] = await db
        .update(nodes)
        .set({
            title,
            updatedAt: new Date(),
        })
        .where(eq(nodes.id, nodeId))
        .returning();

    revalidatePath(`/project/${node.projectId}`);
    return updated;
}

export async function deleteNode(nodeId: number) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    const node = await getNode(nodeId);
    if (!node) throw new Error('Node not found');

    await db.delete(nodes).where(eq(nodes.id, nodeId));

    revalidatePath(`/project/${node.projectId}`);
}
