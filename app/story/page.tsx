import { Footer } from '@/components/footer'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'हमारी कहानी | Gau Krishna & Ram Rasoi - ढिंगसरा, फतेहाबाद',
  description:
    'ढिंगसरा (फतेहाबाद, हरियाणा) से Gau Krishna और Ram Rasoi की प्रेरणादायक कहानी — हज़ारों देसी गायों की सेवा, पारंपरिक बिलोना A2 घी और शुद्ध आयुर्वेदिक उत्पाद।',
  keywords: [
    'Gau Krishna',
    'Ram Rasoi',
    'Rajpal Suthar Dhingsara',
    'गौ कृष्ण',
    'राम रसोई ढिंगसरा',
    'देसी गाय A2 घी',
    'बिलोना घी',
    'गौसेवा फतेहाबाद',
    'शुद्ध च्यवनप्राश',
    'Rajiv Dixit',
    'राजीव दीक्षित स्वदेशी',
    'स्वदेशी उत्पाद',
  ],
  alternates: {
    canonical: '/story',
  },
  openGraph: {
    title: 'हमारी कहानी | Gau Krishna & Ram Rasoi (ढिंगसरा)',
    description:
      'हज़ारों देसी गायों की सेवा और राम रसोई में पारंपरिक बिलोना विधि से बने शुद्ध A2 घी व आयुर्वेदिक उत्पादों की यात्रा।',
    type: 'article',
    locale: 'hi_IN',
    images: [
      {
        url: '/rajpalbharat.webp',
        alt: 'Gau Krishna एवं Ram Rasoi के संस्थापक राजपाल सुथार अपनी माताजी के साथ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'हमारी कहानी | Gau Krishna & Ram Rasoi',
    description:
      'ढिंगसरा, फतेहाबाद से हज़ारों देसी गायों की सेवा और शुद्ध A2 घी व आयुर्वेदिक उत्पादों की कहानी।',
    images: ['/rajpalbharat.webp'],
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'हमारी कहानी - Gau Krishna & Ram Rasoi',
  description:
    'ढिंगसरा, फतेहाबाद (हरियाणा) से Gau Krishna और Ram Rasoi की कहानी — हज़ारों गायों की सेवा, बिलोना A2 देसी घी और शुद्ध आयुर्वेदिक उत्पाद।',
  inLanguage: 'hi-IN',
  mainEntity: {
    '@type': 'Organization',
    name: 'Gau Krishna (Ram Rasoi)',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Main Bus Stand, Dhingsara',
      addressLocality: 'Fatehabad',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.facebook.com/rajpalsuthar.dhingsara',
      'https://www.facebook.com/ram.rasoi.2025/',
      'https://www.instagram.com/ram_rasoi_chywanprash/',
    ],
  },
}

export default function StoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="flex-1">
        <article className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          {/* Header */}
          <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#dcf0e8] text-[#1a5f48] text-xs sm:text-sm font-semibold mb-4">
              ढिंगसरा, फतेहाबाद (हरियाणा) • Gau Krishna &amp; Ram Rasoi
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#1a5f48] mb-5 leading-tight">
              हमारी कहानी: गौसेवा से शुद्धता तक
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              हज़ारों देसी गायों की सेवा, प्रेम और पारंपरिक भारतीय पद्धति से हर घर तक शुद्ध A2 घी व आयुर्वेदिक औषधियाँ पहुँचाने का संकल्प।
            </p>
          </header>

          {/* Section 1: How We Started */}
          <section className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 mb-16">
            <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <Image
                src="/rajpalbharat.webp"
                alt="Gau Krishna और Ram Rasoi के मुख्य संस्थापक राजपाल सुथार अपनी माताजी के साथ"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1a5f48]">
                शुरुआत कैसे हुई: माँ के आशीर्वाद और गौसेवा से
              </h2>
              <p>
                हरियाणा के फतेहाबाद जिले के <strong>ढिंगसरा</strong> गाँव से शुरू हुई यह यात्रा किसी बड़े कारखाने से नहीं, बल्कि{' '}
                <strong>राजपाल सुथार (Rajpal Suthar)</strong> और उनकी <strong>माताजी</strong> के साथ मिलकर शुरू की गई गौसेवा व <strong>राम रसोई (Ram Rasoi)</strong> की पवित्र भावना से प्रारंभ हुई।
              </p>
              <p>
                माताजी के अनुभव, संस्कार और आशीर्वाद से आज भी इस पूरे कार्य और शुद्ध उत्पादों की देखभाल घर-परिवार की तरह की जाती है। हमारा उद्देश्य स्पष्ट था — देसी गायों की रक्षा करना, उनकी सेवा करना और बिना किसी रसायन के शुद्ध उत्पाद समाज तक पहुँचाना।
              </p>
            </div>
          </section>

          {/* Section 2: Caring for Thousands of Cows & Ram Rasoi */}
          <section className="flex flex-col md:flex-row-reverse items-center gap-8 sm:gap-12 mb-16">
            <div className="w-full md:w-1/2 relative aspect-video rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <Image
                src="/images/sliders.webp"
                alt="Ram Rasoi में पारंपरिक तरीके से बना शुद्ध A2 बिलोना घी और आयुर्वेदिक उत्पाद"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1a5f48]">
                हज़ारों गायों की सेवा और राम रसोई
              </h2>
              <p>
                हमारे लिए गाय केवल पशु नहीं, बल्कि परिवार का हिस्सा हैं। हम हज़ारों देसी गायों के पोषण, स्वच्छ आवास, हरे चारे और स्वास्थ्य की निरंतर देखभाल करते हैं। जब गौमाता स्वस्थ और प्रसन्न रहती है, तभी उसका दूध अमृत के समान गुणकारी होता है।
              </p>
              <p>
                <strong>राम रसोई (Ram Rasoi)</strong> में ब्रह्ममुहूर्त से भक्ति-भाव और भजन-कीर्तन के सात्विक वातावरण में पारंपरिक{' '}
                <strong>बिलोना (Bilona)</strong> विधि से <strong>A2 देसी घी</strong> बनाया जाता है। इसी शुद्ध घी और प्राकृतिक जड़ी-बूटियों से च्यवनप्राश, अश्वगंधा पाक, शतावरी पाक और अन्य आयुर्वेदिक उत्पाद तैयार किए जाते हैं।
              </p>
            </div>
          </section>

          {/* Section 3: Swadeshi Inspiration - Rajiv Dixit Ji */}
          <section className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 mb-16 bg-[#f8faf7] p-6 sm:p-10 rounded-2xl border border-[#1a5f48]/10">
            <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-gray-200">
              <Image
                src="/images/rajiv-dixit.jpg"
                alt="स्वदेशी आंदोलन के प्रेरणास्रोत श्री राजीव दीक्षित जी"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              <span className="inline-block px-3 py-1 rounded-full bg-[#dcf0e8] text-[#1a5f48] text-xs font-semibold">
                स्वदेशी प्रेरणा • Swadeshi
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1a5f48]">
                भाई श्री राजीव दीक्षित जी से मिली स्वदेशी की प्रेरणा
              </h2>
              <p>
                <strong>Gau Krishna</strong> और <strong>राम रसोई (Ram Rasoi)</strong> में शुद्ध <strong>स्वदेशी (Swadeshi)</strong> उत्पाद बनाने की सबसे बड़ी प्रेरणा हमें{' '}
                <strong>भाई श्री राजीव दीक्षित जी (Rajiv Dixit)</strong> के विचारों से मिली। उनके व्याख्यानों ने हमें सिखाया कि भारत की असली शक्ति हमारे गाँव, हमारी देसी गाय और हमारे अपने आयुर्वेदिक ज्ञान में बसती है।
              </p>
              <p>
                उन्हीं के स्वदेशी और आत्मनिर्भर भारत के सपने को आगे बढ़ाते हुए हम विदेशी व केमिकल युक्त चीज़ों की जगह अपने ही देश में, देसी गाय के शुद्ध दूध-घी और प्राकृतिक जड़ी-बूटियों से ऐसे उत्पाद बना रहे हैं जो हर परिवार को स्वस्थ रखें और गाँव की अर्थव्यवस्था को मजबूत करें।
              </p>
            </div>
          </section>

          {/* Mission Quote */}
          <section className="text-center max-w-3xl mx-auto mb-16 bg-[#dcf0e8]/25 border border-[#1a5f48]/15 rounded-2xl p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1a5f48] mb-4">
              हमारा संकल्प
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 italic leading-relaxed">
              &ldquo;हर परिवार की थाली तक ऐसा शुद्ध और सात्विक आहार पहुँचाना, जो केवल भोजन नहीं बल्कि स्वास्थ्य और औषधि का कार्य करे — और हर खरीद से गौसेवा को बल मिले।&rdquo;
            </p>
          </section>

          {/* 3 Pillars */}
          <section className="grid md:grid-cols-3 gap-6 sm:gap-8 text-center mb-16">
            <div className="p-6 sm:p-8 bg-[#dcf0e8]/30 rounded-xl border border-[#1a5f48]/10">
              <h3 className="text-xl font-bold text-[#1a5f48] mb-2">हज़ारों गायों की सेवा</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                देसी गायों का संरक्षण, पौष्टिक चारा और प्रेमपूर्ण देखभाल हमारा पहला कर्तव्य है।
              </p>
            </div>
            <div className="p-6 sm:p-8 bg-[#dcf0e8]/30 rounded-xl border border-[#1a5f48]/10">
              <h3 className="text-xl font-bold text-[#1a5f48] mb-2">पारंपरिक बिलोना विधि</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                दही जमाकर मिट्टी के बर्तन और मथनी से शुद्ध A2 देसी घी तैयार किया जाता है।
              </p>
            </div>
            <div className="p-6 sm:p-8 bg-[#dcf0e8]/30 rounded-xl border border-[#1a5f48]/10">
              <h3 className="text-xl font-bold text-[#1a5f48] mb-2">100% शुद्ध एवं सात्विक</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                कोई केमिकल नहीं, कोई मिलावट नहीं — राम रसोई से सीधे आपके घर तक शुद्धता।
              </p>
            </div>
          </section>

          {/* Connect / CTA */}
          <section className="text-center border-t border-gray-200 pt-10">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 mb-3">
              हमारी गौसेवा और राम रसोई से जुड़ें
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              दैनिक गौसेवा और उत्पाद निर्माण की झलक देखने के लिए हमारे आधिकारिक पेजों से जुड़ें:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.facebook.com/rajpalsuthar.dhingsara"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-[#1a5f48] text-[#1a5f48] hover:bg-[#1a5f48] hover:text-white transition-colors text-sm font-semibold"
              >
                Rajpal Suthar (Dhingsara) • Facebook
              </a>
              <a
                href="https://www.facebook.com/ram.rasoi.2025/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-[#1a5f48] text-[#1a5f48] hover:bg-[#1a5f48] hover:text-white transition-colors text-sm font-semibold"
              >
                Ram Rasoi • Facebook
              </a>
              <Link
                href="/products"
                className="px-6 py-2.5 rounded-full bg-[#1a5f48] text-white hover:bg-[#154d3b] transition-colors text-sm font-semibold"
              >
                शुद्ध उत्पाद देखें
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  )
}
