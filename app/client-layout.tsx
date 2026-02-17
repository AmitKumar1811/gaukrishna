'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isLoginPage = pathname === '/login'

    if (isLoginPage) {
        return <>{children}</>
    }

    return (
        <>
            <Header />
            {children}
            <BottomNav />
        </>
    )
}
