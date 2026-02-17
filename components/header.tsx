'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Search, User, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store'
import { logout } from '@/lib/features/authSlice'
import { toast } from 'sonner'
import { authService } from '@/lib/auth-service'

export function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { totalItems } = useCart()

  const navLinks = [
    { name: 'All Products', href: '/products' },
    { name: 'A2 Ghee', href: '/products?category=ghee' },
    { name: 'Wood-Pressed Oils', href: '/products?category=oils' },
    { name: 'Atta', href: '/products?category=atta' },
    { name: 'Healthy Combo', href: '/products?category=combo' },
    { name: 'Gau Krishna Health Partner', href: '/partner' },
    { name: 'Blogs', href: '/blogs' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
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
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top promo banner */}
      <div className="bg-[#0f6845] text-primary-foreground py-2 text-center text-xs sm:text-sm font-semibold">
        Pure Desi Ghee & Oils At 15% OFF | Use Code: PURE15
      </div>

      {/* Main navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left section: Menu + Logo */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <Menu className="h-6 w-6 text-[#1a5f48]" />
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0 group">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-1">
                <span className="text-[#1a5f48]">Gau</span>
                <span className="text-[#c59d48]">Krishna</span>
              </h1>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 overflow-x-auto no-scrollbar">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-foreground/80 hover:text-[#1a5f48] whitespace-nowrap transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated ? (
              <>
                {isSearchOpen ? (
                  <form
                    onSubmit={handleSearch}
                    className="absolute inset-x-0 top-full bg-white border-b p-4 shadow-lg lg:static lg:block lg:w-auto lg:shadow-none lg:border-none lg:p-0"
                  >
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full lg:w-64 pl-4 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a5f48]"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute right-2 p-1 hover:text-[#1a5f48]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5 text-[#1a5f48]" />
                  </button>
                )}

                <Link href="/profile" className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Profile">
                  {/* Show user avatar or initials if available, otherwise default icon */}
                  <User className="h-5 w-5 text-[#1a5f48]" />
                </Link>
                <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Shopping cart">
                  <ShoppingCart className="h-5 w-5 text-[#1a5f48]" />
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 bg-[#1a5f48] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-red-600"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link href="/login">
                <Button className="bg-[#1a5f48] hover:bg-[#154d3b] text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile nav drawer */}
        {isMenuOpen && (
          <nav className="lg:hidden border-t border-border py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-2 py-2 text-sm font-medium hover:bg-muted hover:text-[#1a5f48] rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  handleLogout()
                }}
                className="px-2 py-2 text-sm font-medium hover:bg-muted hover:text-red-600 text-left rounded-md transition-colors text-red-500"
              >
                Logout
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
