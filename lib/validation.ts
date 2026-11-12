export function normalizeIndianPhone(value: string): string {
  const digits = (value || '').replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2)
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1)
  }
  return digits
}

export function validateIndianPhone(phone: string): string | undefined {
  const trimmed = (phone || '').trim()
  if (!trimmed) {
    return 'Phone number is required'
  }
  if (!/^[+]?[\d\s()-]+$/.test(trimmed)) {
    return 'Phone number can only contain digits'
  }
  const rawDigits = trimmed.replace(/\D/g, '')
  if (!rawDigits || rawDigits === '91') {
    return 'Phone number is required'
  }
  if (trimmed.startsWith('+') && !rawDigits.startsWith('91')) {
    return 'Please enter a valid 10-digit Indian mobile number'
  }
  const normalized = normalizeIndianPhone(trimmed)
  if (normalized.length !== 10) {
    return 'Please enter a valid 10-digit mobile number'
  }
  if (!/^[6-9]\d{9}$/.test(normalized)) {
    return 'Mobile number must start with 6, 7, 8, or 9'
  }
  return undefined
}
