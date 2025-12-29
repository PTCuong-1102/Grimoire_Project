'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';
import { CharacterPanel } from './character-panel';

interface CharacterInfoProps {
    nodeId: number;
    attributes: any;
}

export function CharacterInfo({ nodeId, attributes }: CharacterInfoProps) {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const data = attributes || {};

    return (
        <>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-zinc-100">Character Info</h3>
                    <button
                        onClick={() => setIsPanelOpen(true)}
                        className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                        title="Edit character"
                    >
                        <Edit className="h-4 w-4" />
                    </button>
                </div>

                <div className="space-y-4">
                    {data.age && (
                        <div>
                            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Age</dt>
                            <dd className="mt-1 text-sm text-zinc-300">{data.age}</dd>
                        </div>
                    )}

                    {data.faction && (
                        <div>
                            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Faction</dt>
                            <dd className="mt-1 text-sm text-zinc-300">{data.faction}</dd>
                        </div>
                    )}

                    {data.role && (
                        <div>
                            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Role</dt>
                            <dd className="mt-1 text-sm text-zinc-300">{data.role}</dd>
                        </div>
                    )}

                    {data.description && (
                        <div>
                            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Description</dt>
                            <dd className="mt-1 text-sm text-zinc-300">{data.description}</dd>
                        </div>
                    )}

                    {data.appearance && (
                        <div>
                            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Appearance</dt>
                            <dd className="mt-1 text-sm text-zinc-300">{data.appearance}</dd>
                        </div>
                    )}

                    {data.personality && (
                        <div>
                            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Personality</dt>
                            <dd className="mt-1 text-sm text-zinc-300">{data.personality}</dd>
                        </div>
                    )}

                    {data.backstory && (
                        <div>
                            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">Backstory</dt>
                            <dd className="mt-1 text-sm text-zinc-300 whitespace-pre-wrap">{data.backstory}</dd>
                        </div>
                    )}

                    {!data.age && !data.faction && !data.role && !data.description && (
                        <p className="text-sm text-zinc-600">No character details yet. Click edit to add information.</p>
                    )}
                </div>
            </div>

            <CharacterPanel
                nodeId={nodeId}
                initialData={data}
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
            />
        </>
    );
}
