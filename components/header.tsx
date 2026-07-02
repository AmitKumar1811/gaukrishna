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
import { logoutUser } from '@/app/api/auth-service'
import Image from 'next/image'

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
    { name: 'Health Partner', href: '/partner' },
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
      await logoutUser()
      dispatch(logout())
      toast.success('Logged out successfully')
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed', error)
      dispatch(logout())
      router.push('/login')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100/80 shadow-sm transition-all duration-300">
      {/* Top promo banner */}
      <div className="bg-[#0f6845] text-white py-2 text-center text-xs sm:text-sm font-semibold tracking-wide shadow-inner">
        Pure Desi Ghee &amp; Oils At 15% OFF | Use Code: <span className="underline decoration-white/40 underline-offset-2">PURE15</span>
      </div>

      {/* Main navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-3 sm:gap-6">
          
          {/* Left section: Mobile Menu + Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100/80 rounded-xl transition-colors text-[#1a5f48]"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0 group flex items-center relative h-12 sm:h-16 md:h-18 w-36 sm:w-48 md:w-56 overflow-hidden">
              <Image
                src="/logo1.png"
                alt="Gau Krishna Logo"
                fill
                priority
                className="object-contain scale-[2.1] sm:scale-[2.3] origin-center transition-transform duration-300 group-hover:scale-[2.4]"
                sizes="(max-width: 768px) 150px, 220px"
              />
            </Link>
          </div>

          {/* Center Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-gray-700 hover:text-[#1a5f48] whitespace-nowrap transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1a5f48] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Search Input / Icon */}
            {isSearchOpen ? (
              <form
                onSubmit={handleSearch}
                className="absolute inset-x-4 top-full mt-2 bg-white/95 backdrop-blur-md border border-gray-200 p-3 rounded-2xl shadow-xl z-50 lg:static lg:block lg:w-auto lg:shadow-none lg:border-none lg:p-0"
              >
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full lg:w-60 pl-4 pr-10 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1a5f48] focus:bg-white transition-all"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 p-1 text-gray-400 hover:text-[#1a5f48] transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 sm:p-2.5 hover:bg-gray-100/80 rounded-xl transition-colors text-gray-700 hover:text-[#1a5f48]"
                aria-label="Search products"
                title="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            )}

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className="relative p-2 sm:p-2.5 hover:bg-gray-100/80 rounded-xl transition-colors text-gray-700 hover:text-[#1a5f48]"
              aria-label="Shopping cart"
              title="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-[#1a5f48] text-white rounded-full text-[10px] flex items-center justify-center font-bold shadow-sm animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Account / Login Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1">
                <Link
                  href="/profile"
                  className="p-2 sm:p-2.5 hover:bg-gray-100/80 rounded-xl transition-colors text-gray-700 hover:text-[#1a5f48]"
                  aria-label="My Profile"
                  title="Profile"
                >
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 sm:p-2.5 hover:bg-red-50 rounded-xl transition-colors text-gray-400 hover:text-red-600"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div>
                {/* Desktop Login Button */}
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a5f48] text-white rounded-full text-xs font-semibold tracking-wide hover:bg-[#154d3b] hover:shadow-lg hover:shadow-[#1a5f48]/20 transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>

                {/* Mobile Login Icon Button */}
                <Link
                  href="/login"
                  className="sm:hidden p-2 rounded-xl bg-[#1a5f48]/10 text-[#1a5f48] hover:bg-[#1a5f48] hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Login Account"
                >
                  <User className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <nav className="lg:hidden border-t border-gray-100 py-4 flex flex-col gap-1 bg-white animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#1a5f48] rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link
                href="/login"
                className="mx-4 mt-2 py-3 bg-[#1a5f48] text-white text-center rounded-xl text-sm font-semibold hover:bg-[#154d3b] transition-colors flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Login / Register</span>
              </Link>
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  handleLogout()
                }}
                className="mx-4 mt-2 py-3 bg-red-50 text-red-600 text-center rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
