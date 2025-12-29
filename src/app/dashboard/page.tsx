import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <header className="border-b border-zinc-800 px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <h1 className="text-xl font-semibold">Grimoire</h1>
                    <UserButton />
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">Your Projects</h2>
                    <p className="mt-2 text-zinc-400">Start writing your next great story</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href="/dashboard"
                        className="group rounded-lg border-2 border-dashed border-zinc-800 p-8 text-center transition-colors hover:border-violet-600 hover:bg-zinc-900/50"
                    >
                        <div className="text-4xl mb-4">+</div>
                        <div className="text-lg font-medium text-zinc-100 group-hover:text-violet-400">
                            Create New Project
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
