import { getProjectNodes } from '@/lib/actions/database';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default async function ProjectLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = await params;
    const nodes = await getProjectNodes(parseInt(projectId));

    return (
        <div className="flex h-screen bg-zinc-950">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0">
                <AppSidebar projectId={parseInt(projectId)} nodes={nodes} />
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <header className="flex h-14 items-center justify-between border-b border-zinc-800 px-4">
                    <Link href="/dashboard" className="text-lg font-semibold text-zinc-100 hover:text-violet-400">
                        Grimoire
                    </Link>
                    <UserButton />
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
