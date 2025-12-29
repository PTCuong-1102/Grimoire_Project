'use client';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/shadcn/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';
import { useEffect, useState } from 'react';
import { updateNodeContent } from '@/lib/actions/database';
import { useDebounce } from '@/lib/hooks/use-debounce';

interface EditorProps {
    nodeId: number;
    initialContent?: any;
}

export function Editor({ nodeId, initialContent }: EditorProps) {
    const [content, setContent] = useState(initialContent || {});
    const [isSaving, setIsSaving] = useState(false);
    const debouncedContent = useDebounce(content, 1000);

    const editor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(JSON.stringify(initialContent)) : undefined,
    });

    // Autosave effect
    useEffect(() => {
        if (!debouncedContent || Object.keys(debouncedContent).length === 0) return;

        const save = async () => {
            setIsSaving(true);
            try {
                await updateNodeContent(nodeId, debouncedContent);
            } catch (error) {
                console.error('Failed to save:', error);
            } finally {
                setIsSaving(false);
            }
        };

        save();
    }, [debouncedContent, nodeId]);

    return (
        <div className="relative h-full">
            {/* Saving indicator */}
            <div className="absolute right-4 top-4 z-10 text-sm">
                {isSaving ? (
                    <span className="text-zinc-500">Saving...</span>
                ) : (
                    <span className="text-zinc-600">Saved</span>
                )}
            </div>

            {/* Editor */}
            <BlockNoteView
                editor={editor}
                theme="dark"
                onChange={() => {
                    setContent(editor.document);
                }}
                className="h-full"
            />
        </div>
    );
}
