const qualityCards = [
  {
    title: 'In-House R&D Experts And Certified Labs',
    subtitle: 'Unlike others, we don’t outsource safety.',
  },
  {
    title: '40+ Quality Checks. Every Single Batch.',
    subtitle: 'Fatty acid profile. Texture. Moisture. Adulteration. Nothing gets missed.',
  },
  {
    title: '3 Layers of Testing. Zero Room for Error.',
    subtitle: 'We test at sourcing, processing, and packaging for purity and nutrition.',
  },
  {
    title: 'See the Proof. Don’t Just Trust Us.',
    subtitle: 'Lab reports for every batch. Real trust is built on transparency.',
  },
]

export function Quality() {
  return (
    <section className="bg-[#cfe7ef] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#1a5f48]">Only Perfect Makes The Cut</h3>
          <p className="text-[#1a5f48]/80">Three-stage testing + transparent reports.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualityCards.map((card, idx) => (
            <div
              key={card.title}
              className="bg-[#f7f4e9] rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.07)] p-6 flex flex-col gap-3 border border-white/50"
            >
              <div className="h-10 w-10 rounded-full bg-[#1a5f48] text-white grid place-items-center text-sm font-bold">
                {idx + 1}
              </div>
              <h4 className="text-xl font-serif font-bold text-[#1a5f48] leading-snug">{card.title}</h4>
              <p className="text-sm text-[#2f2b28] leading-relaxed">{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
