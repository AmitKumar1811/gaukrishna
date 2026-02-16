import Link from 'next/link'
import {
  Home,
  LayoutGrid,
  BadgePercent,
  TrendingUp,
  User,
} from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'All', href: '/products', icon: LayoutGrid },
  { label: 'Deal', href: '/products?tag=deal', icon: BadgePercent },
  { label: 'Trending', href: '/products?tag=top', icon: TrendingUp },
  { label: 'Account', href: '/login', icon: User },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_18px_rgba(0,0,0,0.04)] sm:hidden">
      <div className="grid grid-cols-5 text-center text-xs text-gray-700">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center justify-center py-2 gap-1 active:text-[#1a5f48]"
          >
            <item.icon className="h-5 w-5" strokeWidth={1.6} />
            <span className="font-semibold">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
