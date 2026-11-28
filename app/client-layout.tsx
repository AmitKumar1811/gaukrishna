'use client'

import { usePathname } from 'next/navigation'
import { Toaster } from 'sonner'
import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import { FloatingCart } from '@/components/floating-cart'
import { StoreChatbot } from '@/components/store-chatbot'

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isLoginPage = pathname === '/login'

    if (isLoginPage) {
        return (
            <>
                {children}
                <Toaster richColors position="top-right" />
            </>
        )
    }

    return (
        <>
            <Header />
            {children}
            <FloatingCart />
            <StoreChatbot />
            <BottomNav />
            <Toaster richColors position="top-right" />
        </>
    )
}
