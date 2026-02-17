'use client'

import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <BottomNav />
        </>
    )
}
