import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950">
            <SignUp
                appearance={{
                    elements: {
                        formButtonPrimary: 'bg-violet-600 hover:bg-violet-700',
                        card: 'bg-zinc-900 border border-zinc-800',
                        headerTitle: 'text-zinc-100',
                        headerSubtitle: 'text-zinc-400',
                        socialButtonsBlockButton: 'border-zinc-800 text-zinc-100 hover:bg-zinc-800',
                        formFieldLabel: 'text-zinc-300',
                        formFieldInput: 'bg-zinc-800 border-zinc-700 text-zinc-100',
                        footerActionLink: 'text-violet-500 hover:text-violet-400',
                    },
                }}
            />
        </div>
    );
}
