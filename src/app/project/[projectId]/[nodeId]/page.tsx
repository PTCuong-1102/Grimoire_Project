import { getNode } from '@/lib/actions/database';
import { Editor } from '@/components/editor/block-note-editor';
import { notFound } from 'next/navigation';

export default async function NodePage({
    params,
}: {
    params: Promise<{ projectId: string; nodeId: string }>;
}) {
    const { nodeId } = await params;
    const node = await getNode(parseInt(nodeId));

    if (!node) {
        notFound();
    }

    return (
        <div className="h-full bg-zinc-950">
            <div className="mx-auto h-full max-w-4xl p-8">
                <Editor nodeId={node.id} initialContent={node.content} />
            </div>
        </div>
    );
}
