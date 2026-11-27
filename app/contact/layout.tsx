import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Gau Krishna Enterprises | Dhingsara, Fatehabad',
  description:
    'Contact Gau Krishna Enterprises at 411 Ground Floor, Fatehabad Road, Dhingsara, Fatehabad, Haryana 125053. Call +91 97289 30001 or email gaukrishnaenterprises@gmail.com.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
