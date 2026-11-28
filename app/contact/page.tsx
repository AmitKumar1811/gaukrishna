'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { Footer } from '@/components/footer'
import { createContact } from '@/app/api/api-service'
import { IndianPhoneInput } from '@/components/ui/indian-phone-input'
import { normalizeIndianPhone, validateIndianPhone } from '@/lib/validation'

export default function ContactPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState<string | undefined>(undefined)
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handlePhoneChange = (val: string) => {
        setPhone(val)
        const trimmed = val.trim()
        if (trimmed && !/^[+]?[\d\s()-]+$/.test(trimmed)) {
            setPhoneError('Phone number can only contain digits')
            return
        }
        if (phoneError) {
            setPhoneError(validateIndianPhone(val))
        }
    }

    const handlePhoneBlur = () => {
        setPhoneError(validateIndianPhone(phone))
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        const phoneErr = validateIndianPhone(phone)
        if (phoneErr) {
            setPhoneError(phoneErr)
        }

        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim() || phoneErr) {
            setError(phoneErr || 'Please fill in all fields.')
            return
        }

        setIsSubmitting(true)
        try {
            await createContact({
                name: name.trim(),
                email: email.trim(),
                phone: normalizeIndianPhone(phone),
                subject: subject.trim(),
                message: message.trim(),
            })
            setSuccess('Thanks! Your message has been sent.')
            setName('')
            setEmail('')
            setPhone('')
            setPhoneError(undefined)
            setSubject('')
            setMessage('')
        } catch (err: any) {
            setError(err?.response?.data?.message || err?.message || 'Failed to send message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1">
                <div className="mx-auto max-w-4xl px-4 py-16">
                    <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-12 text-center">Contact Us</h1>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Office Address</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    <strong>Gau Krishna Enterprises</strong><br />
                                    411 Ground Floor, Fatehabad Road,<br />
                                    Dhingsara, Fatehabad, Haryana 125053
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                                <p className="text-gray-600">
                                    <a href="mailto:gaukrishnaenterprises@gmail.com" className="hover:text-[#1a5f48] hover:underline">
                                        gaukrishnaenterprises@gmail.com
                                    </a>
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Call &amp; WhatsApp</h3>
                                <p className="text-gray-600">
                                    <a href="tel:+919728930001" className="hover:text-[#1a5f48] hover:underline font-medium">
                                        +91 97289 30001
                                    </a>
                                    {' · '}
                                    <a href="tel:+919996990290" className="hover:text-[#1a5f48] hover:underline font-medium">
                                        +91 99969-90290
                                    </a>
                                </p>
                                <p className="text-sm text-gray-500 mt-1">(Open Daily • Closes 11 PM)</p>
                                <a
                                    href="https://wa.me/919996990290?text=Namaste%20Gau%20Krishna%2C%20I%20need%20help."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold transition-colors shadow-sm"
                                >
                                    WhatsApp Our Agent (+91 99969-90290)
                                </a>
                            </div>
                        </div>

                        <form className="space-y-4" onSubmit={onSubmit} noValidate>
                            {error ? (
                                <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </div>
                            ) : null}
                            {success ? (
                                <div className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                    {success}
                                </div>
                            ) : null}

                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoComplete="name"
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#1a5f48] focus:border-[#1a5f48]"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#1a5f48] focus:border-[#1a5f48]"
                            />
                            <div>
                                <IndianPhoneInput
                                    id="contact-phone"
                                    name="phone"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    onBlur={handlePhoneBlur}
                                    error={Boolean(phoneError)}
                                    heightClassName="[&_.react-tel-input_.form-control]:!h-12"
                                    placeholder="Your Phone Number"
                                    required
                                />
                                {phoneError && <p className="text-sm text-red-600 mt-1">{phoneError}</p>}
                            </div>
                            <input
                                type="text"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#1a5f48] focus:border-[#1a5f48]"
                            />
                            <textarea
                                placeholder="Message"
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#1a5f48] focus:border-[#1a5f48]"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#1a5f48] text-white py-3 rounded hover:bg-[#154d3b] transition-colors font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
