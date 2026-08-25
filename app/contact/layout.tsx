import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Gau Krishna',
  description: 'Get in touch with Gau Krishna for any inquiries, support, or feedback about our pure A2 ghee and cold-pressed oils.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
