import { Check, Package, MapPin, Mail, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const SuccessIcon = () => (
  <div className="flex justify-center mb-8">
    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#1a5f48]/10 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
      <Check size={40} className="text-[#1a5f48] sm:size-12" />
    </div>
  </div>
)

export const OrderDetailCard = ({ orderId, total }: { orderId: string; total: string }) => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
      <InfoItem icon={Package} label="Order ID" value={`#${orderId}`} />
      <InfoItem icon={Check} label="Order Total" value={`₹${total}`} highlight />
    </div>

    <div className="space-y-6 pt-6 sm:pt-8 border-t border-gray-50">
      <DeliveryItem icon={MapPin} title="Expected Delivery" desc="3-5 business days to your address" />
      <DeliveryItem icon={Mail} title="Confirmation Email" desc="A confirmation email has been sent" />
    </div>
  </div>
)

const InfoItem = ({ icon: Icon, label, value, highlight }: { icon: LucideIcon; label: string; value: string; highlight?: boolean }) => (
  <div className="flex items-start gap-4 min-w-0 overflow-hidden">
    <div className="w-12 h-12 bg-[#1a5f48]/5 rounded-xl flex items-center justify-center flex-shrink-0">
      <Icon size={24} className="text-[#1a5f48]" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs sm:text-sm text-gray-500 mb-0.5 uppercase tracking-wider font-medium">{label}</p>
      <p className={`text-base sm:text-lg font-bold break-all leading-tight ${highlight ? 'text-[#1a5f48]' : 'text-gray-900'}`}>
        {value}
      </p>
    </div>
  </div>
)

const DeliveryItem = ({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
      <Icon size={16} className="text-[#1a5f48]" />
    </div>
    <div>
      <p className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5">{title}</p>
      <p className="text-xs sm:text-sm text-gray-500">{desc}</p>
    </div>
  </div>
)

export const NextSteps = () => (
  <div className="bg-[#1a5f48]/5 border border-[#1a5f48]/10 rounded-2xl p-6 mb-8">
    <h3 className="font-bold text-[#1a5f48] mb-4">What's Next?</h3>
    <ul className="space-y-3">
      {['Order confirmation sent to your email', 'Dispatch within 24-48 business hours', 'Real-time tracking link will be shared', 'Contact support for any assistance'].map((text, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-1.5 h-1.5 bg-[#1a5f48] rounded-full" />
          {text}
        </li>
      ))}
    </ul>
  </div>
)

export const ActionButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
    <Link href="/products" className="w-full sm:w-auto">
      <Button className="w-full bg-[#1a5f48] hover:bg-[#154d3b] text-white rounded-xl h-12 px-8 font-medium transition-all shadow-lg shadow-[#1a5f48]/20">
        Continue Shopping
      </Button>
    </Link>
    <Link href="/" className="w-full sm:w-auto">
      <Button variant="outline" className="w-full border-gray-200 hover:border-[#1a5f48] hover:text-[#1a5f48] rounded-xl h-12 px-8 font-medium transition-all">
        Back to Home
      </Button>
    </Link>
  </div>
)
