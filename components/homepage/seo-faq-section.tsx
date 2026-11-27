'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What are the ingredients & benefits of Gau Krishna (Ram Rasoi) Kesar Yukt Chyawanprash?',
    answer:
      'Gau Krishna / Ram Rasoi Kesar Yukt Chyawanprash (कृष्णा च्यवनप्राश) is prepared traditionally in Dhingsara, Fatehabad using wild-crafted amla, pure A2 Bilona cow ghee, kesar (saffron), ashwagandha, giloy, and 40+ Ayurvedic herbs. It supports daily immunity, energy, respiratory wellness, and digestive comfort without chemical preservatives.',
    ctaLabel: 'Check Chyawanprash Price & Buy Online',
    ctaHref: '/products?category=chyawanprash',
  },
  {
    question: 'What is A2 Cow Ghee and what are the benefits of A2 Gir Cow Bilona Ghee?',
    answer:
      'A2 Desi Cow Ghee is churned from curd (dahi) using the traditional wooden Bilona method from native Indian Gir and Sahiwal cows that produce A2 beta-casein protein. Key A2 cow ghee health benefits include better digestion, natural fat-soluble vitamins (A, D, E, K), joint lubrication, and clean daily nutrition. Available in 500ml and 1kg jars directly from our Dhingsara farm.',
    ctaLabel: 'Explore A2 Bilona Ghee',
    ctaHref: '/products?category=ghee',
  },
  {
    question: 'Is Virgin Coconut Oil good for face & skin? How should I apply it?',
    answer:
      'Yes — pure wood-pressed virgin coconut oil is an effective natural face moisturizer that helps lock in hydration, soothe dry skin, and support overnight skin repair. For facial massage or dry-to-normal skin, warm 2–3 drops between your palms and apply gently on damp skin at night. If you have very oily or acne-prone skin, patch-test first or use as a gentle cleansing oil before washing your face.',
    ctaLabel: 'Shop Wood-Pressed Oils',
    ctaHref: '/products?category=oil',
  },
  {
    question: 'What are the health benefits of Wood Pressed Groundnut Oil and Panchgavya Dhoop Batti?',
    answer:
      'Our wood-pressed (kacchi ghani) groundnut oil is extracted at low temperatures without chemical refining, preserving natural antioxidants, vitamin E, and heart-friendly monounsaturated fats for everyday Indian cooking. Our Panchgavya Dhoop Batti is crafted from pure desi cow dung, ghee, and natural herbs for clean, chemical-free daily pooja and home purification.',
    ctaLabel: 'Browse All Swadeshi Products',
    ctaHref: '/products',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export function SeoFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 sm:py-20 bg-[#f8faf7] border-t border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#dcf0e8] text-[#1a5f48] text-xs font-semibold uppercase tracking-wider mb-3">
            Ayurveda &amp; Product Guide
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1a5f48]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Ingredients, benefits, and usage guide for Ram Rasoi Chyawanprash, A2 Cow Ghee &amp; Wood-Pressed Oils
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-shadow hover:shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-[#1a5f48] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100">
                    <p>{faq.answer}</p>
                    <Link
                      href={faq.ctaHref}
                      className="inline-block mt-3 text-sm font-semibold text-[#1a5f48] hover:underline"
                    >
                      {faq.ctaLabel} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
