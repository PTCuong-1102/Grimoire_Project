import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-100">
      <main className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="mb-6 text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
            Grimoire
          </span>
        </h1>
        <p className="mb-8 text-xl text-zinc-400">
          A modern, Notion-style novel writing platform with world-building capabilities
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/sign-up"
            className="rounded-lg bg-violet-600 px-8 py-3 font-medium text-white transition-colors hover:bg-violet-700"
          >
            Get Started
          </Link>
          <Link
            href="/sign-in"
            className="rounded-lg border border-zinc-700 px-8 py-3 font-medium text-zinc-100 transition-colors hover:bg-zinc-900"
          >
            Sign In
          </Link>
        </div>
      </main>
    </div>
  );
}
