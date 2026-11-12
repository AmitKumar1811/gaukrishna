'use client'

import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { normalizeIndianPhone } from '@/lib/validation'
import { cn } from '@/lib/utils'

interface IndianPhoneInputProps {
  id?: string
  name?: string
  value?: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  heightClassName?: string
}

function toPhoneInputValue(value?: string): string {
  const trimmed = (value || '').trim()
  if (!trimmed) return '91'

  const digits = trimmed.replace(/\D/g, '')
  if (!digits || digits === '91') return '91'

  if (
    trimmed.startsWith('+') ||
    (digits.length === 12 && digits.startsWith('91')) ||
    (digits.length === 11 && digits.startsWith('0'))
  ) {
    const normalized = normalizeIndianPhone(trimmed)
    return normalized ? `91${normalized}` : '91'
  }

  return `91${digits}`
}

export function IndianPhoneInput({
  id = 'phone',
  name = 'phone',
  value = '',
  onChange,
  onBlur,
  placeholder = 'Enter 10-digit mobile number',
  required = false,
  disabled = false,
  error = false,
  heightClassName = '[&_.react-tel-input_.form-control]:!h-11',
}: IndianPhoneInputProps) {
  const controlledValue = toPhoneInputValue(value)
  const subscriberDigits = controlledValue.slice(2)

  const handlePhoneChange = (rawPhone: string) => {
    const digitsOnly = (rawPhone || '').replace(/\D/g, '')
    if (!digitsOnly || digitsOnly === '91') {
      onChange('')
      return
    }
    const stripped = digitsOnly.startsWith('91') ? digitsOnly.slice(2) : digitsOnly
    if (
      (stripped.length === 12 && stripped.startsWith('91')) ||
      (stripped.length === 11 && stripped.startsWith('0'))
    ) {
      onChange(normalizeIndianPhone(stripped))
      return
    }
    onChange(stripped)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text')
    if (!pastedText) return
    e.preventDefault()

    const trimmed = pastedText.trim()
    if (!trimmed) return

    if (/^[+]?[\d\s()-]+$/.test(trimmed)) {
      const digitsOnly = trimmed.replace(/\D/g, '')
      if (!digitsOnly) return
      const normalized =
        trimmed.startsWith('+') ||
        (digitsOnly.length === 12 && digitsOnly.startsWith('91')) ||
        (digitsOnly.length === 11 && digitsOnly.startsWith('0'))
          ? normalizeIndianPhone(trimmed)
          : digitsOnly
      onChange(normalized)
      return
    }

    onChange(trimmed)
  }

  return (
    <div
      className={cn(
        '[&_.react-tel-input_.form-control]:!w-full [&_.react-tel-input_.form-control]:!pl-12 [&_.react-tel-input_.form-control]:!text-base md:[&_.react-tel-input_.form-control]:!text-sm [&_.react-tel-input_.form-control]:!rounded-md [&_.react-tel-input_.form-control]:!border-gray-200 [&_.react-tel-input_.form-control]:!bg-white [&_.react-tel-input_.form-control]:!shadow-none [&_.react-tel-input_.flag-dropdown]:!rounded-l-md [&_.react-tel-input_.flag-dropdown]:!border-gray-200 [&_.react-tel-input_.flag-dropdown]:!bg-transparent [&_.react-tel-input_.selected-flag]:!bg-transparent [&_.react-tel-input_.selected-flag]:!pl-4 [&_.react-tel-input_.country-list]:!z-30',
        heightClassName,
        error
          ? '[&_.react-tel-input_.form-control]:!border-red-500 [&_.react-tel-input_.flag-dropdown]:!border-red-500'
          : '[&_.react-tel-input_.form-control:focus]:!border-[#1a5f48]',
      )}
    >
      <PhoneInput
        country="in"
        onlyCountries={['in']}
        countryCodeEditable={false}
        enableLongNumbers={subscriberDigits.length > 10}
        value={controlledValue}
        onChange={handlePhoneChange}
        onBlur={() => onBlur?.()}
        disabled={disabled}
        specialLabel=""
        placeholder={placeholder}
        inputProps={{
          id,
          name,
          required,
          inputMode: 'numeric',
          autoComplete: 'tel-national',
          'aria-invalid': error,
          onPaste: handlePaste,
        }}
      />
    </div>
  )
}
