import { AuthForm } from '@/components/auth/auth-form'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'Authentication',
    description: 'Login or Register to access your account',
}

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center  bg-gradient-to-br from-secondary/10 to-primary/5">
            <div className="w-full overflow-hidden bg-card shadow-xl border border-white/50 relative">
                <div className="grid lg:grid-cols-2 min-h-screen">
                    <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center relative">
                        <AuthForm />
                    </div>
                    <div className="hidden lg:block relative p-4">
                        <div className="h-full w-full rounded-[2rem] overflow-hidden relative">
                            <Image
                                src="/images/a2-ghee.webp"
                                alt="Desi cow in a field"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
