import { getNode } from '@/lib/actions/database';
import { Editor } from '@/components/editor/block-note-editor';
import { CharacterInfo } from '@/components/character/character-info';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils'; // Assuming 'cn' utility is available here

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

    const isCharacter = node.type === 'character';

    return (
        <div className="h-full bg-zinc-950">
            <div className="mx-auto flex h-full max-w-6xl gap-6 p-8">
                {/* Main Editor */}
                <div className={cn('flex-1', isCharacter && 'max-w-3xl')}>
                    <Editor nodeId={node.id} initialContent={node.content} />
                </div>

                {/* Character Info Panel */}
                {isCharacter && (
                    <aside className="w-80 flex-shrink-0">
                        <CharacterInfo nodeId={node.id} attributes={node.attributes} />
                    </aside>
                )}
            </div>
        </div>
    );
}
