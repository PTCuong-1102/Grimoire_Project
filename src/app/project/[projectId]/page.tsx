import { getProjectNodes, createNode } from '@/lib/actions/database';
import { redirect } from 'next/navigation';
import { Plus } from 'lucide-react';

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = await params;
    const nodes = await getProjectNodes(parseInt(projectId));

    // If there are nodes, redirect to the first chapter or any node
    const firstNode = nodes.find(n => n.type === 'chapter') || nodes[0];
    if (firstNode) {
        redirect(`/project/${projectId}/${firstNode.id}`);
    }

    // Empty state - create first chapter
    return (
        <div className="flex h-full items-center justify-center">
            <div className="text-center">
                <h1 className="mb-4 text-2xl font-bold text-zinc-100">No pages yet</h1>
                <p className="mb-6 text-zinc-400">Create your first chapter to get started</p>

                <form action={async () => {
                    'use server';
                    const newNode = await createNode({
                        projectId: parseInt(projectId),
                        type: 'chapter',
                        title: 'Chapter 1',
                    });
                    redirect(`/project/${projectId}/${newNode.id}`);
                }}>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition-colors hover:bg-violet-700"
                    >
                        <Plus className="h-4 w-4" />
                        Create First Chapter
                    </button>
                </form>
            </div>
        </div>
    );
}
