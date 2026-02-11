import Link from 'next/link'
import { User, Package, MapPin, Heart, LogOut } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

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
    return (
        <div className="min-h-screen flex flex-col bg-gray-50/50">
            <Header />

            <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <h2 className="text-2xl font-serif font-bold text-[#1a5f48] mb-6">My Account</h2>
                        <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                            <nav className="flex flex-col">
                                {sidebarNavItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#dcf0e8] hover:text-[#1a5f48] transition-colors border-l-4 border-transparent hover:border-[#1a5f48]"
                                    >
                                        <item.icon className="h-4 w-4 opacity-70" />
                                        {item.title}
                                    </Link>
                                ))}

                                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-l-4 border-transparent hover:border-red-500 text-left">
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
