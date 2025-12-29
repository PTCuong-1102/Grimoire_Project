'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { redirect } from 'next/navigation';
import { FileText, User, MapPin, StickyNote, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type NodeType = 'chapter' | 'character' | 'location' | 'note';

interface Node {
    id: number;
    projectId: number;
    type: NodeType;
    title: string;
    parentId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

interface SidebarProps {
    projectId: number;
    nodes: Node[];
}

const getIcon = (type: NodeType) => {
    switch (type) {
        case 'chapter':
            return FileText;
        case 'character':
            return User;
        case 'location':
            return MapPin;
        case 'note':
            return StickyNote;
    }
};

function NodeItem({ node, isActive }: { node: Node; isActive: boolean }) {
    const [isOpen, setIsOpen] = useState(true);
    const Icon = getIcon(node.type);

    return (
        <div>
            <Link
                href={`/project/${node.projectId}/${node.id}`}
                className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                        ? 'bg-violet-600/20 text-violet-400'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                )}
            >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1 truncate">{node.title}</span>
            </Link>
        </div>
    );
}

export function AppSidebar({ projectId, nodes }: SidebarProps) {
    const pathname = usePathname();

    // Group nodes by type
    const chapters = nodes.filter(n => n.type === 'chapter');
    const characters = nodes.filter(n => n.type === 'character');
    const locations = nodes.filter(n => n.type === 'location');
    const notesList = nodes.filter(n => n.type === 'note');

    const sections = [
        { title: 'Chapters', type: 'chapter' as NodeType, nodes: chapters },
        { title: 'Characters', type: 'character' as NodeType, nodes: characters },
        { title: 'Locations', type: 'location' as NodeType, nodes: locations },
        { title: 'Notes', type: 'note' as NodeType, nodes: notesList },
    ];

    return (
        <div className="flex h-full flex-col bg-zinc-900 border-r border-zinc-800">
            <div className="border-b border-zinc-800 p-4">
                <h2 className="text-sm font-semibold text-zinc-100">Project</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-6">
                {sections.map((section) => (
                    <div key={section.type}>
                        <div className="mb-2 flex items-center justify-between px-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                {section.title}
                            </span>
                            <form action={async () => {
                                'use server';
                                const { createNode } = await import('@/lib/actions/database');
                                const titles = {
                                    chapter: 'Untitled Chapter',
                                    character: 'New Character',
                                    location: 'New Location',
                                    note: 'New Note',
                                };
                                const newNode = await createNode({
                                    projectId,
                                    type: section.type,
                                    title: titles[section.type],
                                });
                                redirect(`/project/${projectId}/${newNode.id}`);
                            }}>
                                <button
                                    type="submit"
                                    className="text-zinc-500 hover:text-zinc-300"
                                    title={`New ${section.type}`}
                                >
                                    <Plus className="h-3 w-3" />
                                </button>
                            </form>
                        </div>
                        <div className="space-y-1">
                            {section.nodes.length === 0 ? (
                                <div className="px-3 py-2 text-xs text-zinc-600">
                                    No {section.title.toLowerCase()} yet
                                </div>
                            ) : (
                                section.nodes.map((node) => (
                                    <NodeItem
                                        key={node.id}
                                        node={node}
                                        isActive={pathname === `/project/${projectId}/${node.id}`}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
