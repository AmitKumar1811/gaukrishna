export type AppliedCoupon = {
  code: string
  discount: number
  shippingFee: number
  total: number
  message?: string
}

const KEY = 'gaukrishna_applied_coupon'

export const getStoredCoupon = (): AppliedCoupon | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const storeCoupon = (coupon: AppliedCoupon) => {
  sessionStorage.setItem(KEY, JSON.stringify(coupon))
}

export const clearStoredCoupon = () => {
  sessionStorage.removeItem(KEY)
}
