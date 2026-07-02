'use client'

import Link from 'next/link'
import { User, Package, MapPin, Heart, LogOut } from 'lucide-react'
import { Footer } from '@/components/footer'
import { useRouter, usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { logout } from '@/lib/features/authSlice'
import { logoutUser } from '@/app/api/auth-service'
import { toast } from 'sonner'

const sidebarNavItems = [
    {
        title: 'Account Details',
        href: '/profile',
        icon: User,
    },
    {
        title: 'Order history',
        href: '/profile/orders',
        icon: Package,
    },
    {
        title: 'Addresses',
        href: '/profile/addresses',
        icon: MapPin,
    },
    {
        title: 'Wishlist',
        href: '/profile/wishlist',
        icon: Heart,
    },
]

interface ProfileLayoutProps {
    children: React.ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    const router = useRouter()
    const pathname = usePathname()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await logoutUser()
            dispatch(logout())
            toast.success('Logged out successfully')
            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error('Logout failed', error)
            dispatch(logout()) // Force logout on client anyway
            router.push('/login')
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/50">

            <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10 w-full">
                <h2 className="text-2xl font-serif font-bold text-[#1a5f48] mb-6 md:hidden">My Account</h2>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Mobile Navigation (Horizontal Scroll) */}
                    <nav className="md:hidden flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
                        {sidebarNavItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex flex-col items-center justify-center min-w-[72px] p-2 rounded-xl border transition-all snap-start ${isActive
                                        ? 'border-[#1a5f48] bg-white shadow-sm text-[#1a5f48]'
                                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                                        }`}
                                >
                                    <item.icon className={`h-5 w-5 mb-1 ${isActive ? 'text-[#1a5f48]' : 'text-gray-400'}`} />
                                    <span className={`text-[6px] uppercase tracking-wide font-bold text-center leading-tight ${isActive ? 'font-bold' : ''}`}>
                                        {item.title}
                                    </span>
                                </Link>
                            )
                        })}
                        <button
                            onClick={handleLogout}
                            className="flex flex-col items-center justify-center min-w-[72px] p-2 rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all snap-start"
                        >
                            <LogOut className="h-5 w-5 mb-1" />
                            <span className="text-[10px] uppercase tracking-wide font-medium text-center leading-tight">Log out</span>
                        </button>
                    </nav>

                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-64 flex-shrink-0">
                        <h2 className="text-2xl font-serif font-bold text-[#1a5f48] mb-6">My Account</h2>
                        <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                            <nav className="flex flex-col">
                                {sidebarNavItems.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${isActive
                                                ? 'bg-[#dcf0e8] text-[#1a5f48] border-[#1a5f48]'
                                                : 'text-gray-700 hover:bg-[#dcf0e8] hover:text-[#1a5f48] border-transparent'
                                                }`}
                                        >
                                            <item.icon className={`h-4 w-4 ${isActive ? 'opacity-100' : 'opacity-70'}`} />
                                            {item.title}
                                        </Link>
                                    )
                                })}

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-l-4 border-transparent hover:border-red-500 text-left"
                                >
                                    <LogOut className="h-4 w-4 opacity-70" />
                                    Log out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    <div className="flex-1 bg-white rounded-lg shadow-sm border border-border p-6 md:p-8 min-h-[500px]">
                        {children}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
