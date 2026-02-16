const ingredientCards = [
  {
    title: 'From Native Geographies to Ideal Growing Seasons',
    subtitle: 'We take care of every factor when sourcing local ingredients.',
    bg: 'bg-gradient-to-br from-[#c6d8bf] via-[#dbe8d7] to-[#f7f4e8]'
  },
  {
    title: 'What Do We Look For?',
    subtitle: 'Not high yield. Not lower cost. Just flavour, nutrition, and soul.',
    bg: 'bg-gradient-to-br from-[#e1c0a6] via-[#f1d4b7] to-[#f9ebd7]'
  },
  {
    title: 'Impurities, Out. Goodness, In.',
    subtitle: 'Only the best seeds & purest milk make the cut.',
    bg: 'bg-gradient-to-br from-[#d9cfc3] via-[#e7ded2] to-[#f8f2e9]'
  },
  {
    title: 'A2 Milk of Gir Cows, Native Seeds & More.',
    subtitle: 'We dare you to find better native ingredients.',
    bg: 'bg-gradient-to-br from-[#b9d7ad] via-[#c9e2bd] to-[#e8f2df]'
  },
]

export function Ingredients() {
  return (
    <section className="bg-[#f4e9d2] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#9a6b24]">Native Ingredients. No Substitutes.</h3>
          <p className="text-[#6f5836]">Pure sourcing + traditional methods for every batch.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredientCards.map((card) => (
            <div
              key={card.title}
              className={`${card.bg} relative rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] overflow-hidden p-6 min-h-[240px] flex flex-col justify-end`}
            >
              <div className="absolute inset-0 bg-[url('/images/sliders.webp')] opacity-5 mix-blend-overlay" />
              <h4 className="text-xl font-serif font-bold text-[#1a5f48] mb-2">{card.title}</h4>
              <p className="text-sm text-[#2f2b28] leading-relaxed">{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
