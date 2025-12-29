'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';
import { updateNodeAttributes } from '@/lib/actions/database';
import { cn } from '@/lib/utils';

const characterSchema = z.object({
    age: z.string().optional(),
    faction: z.string().optional(),
    role: z.string().optional(),
    description: z.string().optional(),
    appearance: z.string().optional(),
    personality: z.string().optional(),
    backstory: z.string().optional(),
});

type CharacterFormData = z.infer<typeof characterSchema>;

interface CharacterPanelProps {
    nodeId: number;
    initialData?: any;
    isOpen: boolean;
    onClose: () => void;
}

export function CharacterPanel({ nodeId, initialData, isOpen, onClose }: CharacterPanelProps) {
    const [isSaving, setIsSaving] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<CharacterFormData>({
        resolver: zodResolver(characterSchema),
        defaultValues: initialData || {},
    });

    const onSubmit = async (data: CharacterFormData) => {
        setIsSaving(true);
        try {
            await updateNodeAttributes(nodeId, data);
            onClose();
        } catch (error) {
            console.error('Failed to save:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/50"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-zinc-900 shadow-xl">
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-zinc-800 p-4">
                        <h2 className="text-lg font-semibold text-zinc-100">Character Details</h2>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col overflow-hidden">
                        <div className="flex-1 space-y-6 overflow-y-auto p-6">
                            {/* Age */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                    Age
                                </label>
                                <input
                                    {...register('age')}
                                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 focus:border-violet-500 focus:outline-none"
                                    placeholder="e.g., 25, Unknown, Immortal"
                                />
                            </div>

                            {/* Faction */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                    Faction / Affiliation
                                </label>
                                <input
                                    {...register('faction')}
                                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 focus:border-violet-500 focus:outline-none"
                                    placeholder="e.g., Empire, Rebellion"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                    Role
                                </label>
                                <input
                                    {...register('role')}
                                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 focus:border-violet-500 focus:outline-none"
                                    placeholder="e.g., Protagonist, Antagonist, Supporting"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    {...register('description')}
                                    rows={3}
                                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 focus:border-violet-500 focus:outline-none resize-none"
                                    placeholder="Brief overview of the character"
                                />
                            </div>

                            {/* Appearance */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                    Appearance
                                </label>
                                <textarea
                                    {...register('appearance')}
                                    rows={3}
                                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 focus:border-violet-500 focus:outline-none resize-none"
                                    placeholder="Physical description"
                                />
                            </div>

                            {/* Personality */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                    Personality
                                </label>
                                <textarea
                                    {...register('personality')}
                                    rows={3}
                                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 focus:border-violet-500 focus:outline-none resize-none"
                                    placeholder="Traits, behaviors, quirks"
                                />
                            </div>

                            {/* Backstory */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">
                                    Backstory
                                </label>
                                <textarea
                                    {...register('backstory')}
                                    rows={4}
                                    className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-zinc-100 focus:border-violet-500 focus:outline-none resize-none"
                                    placeholder="Character's history and background"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-zinc-800 p-4">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300 hover:bg-zinc-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
