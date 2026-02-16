import { TreeDeciduous, Factory, ClipboardCheck, Tractor } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: TreeDeciduous,
      title: 'Native Sourcing',
      description: 'Highest quality raw material from native regions all over India.',
    },
    {
      icon: Factory,
      title: 'Traditional Processing',
      description: 'Minimally processed using time-tested Bilona methods for maximum nutrition.',
    },
    {
      icon: ClipboardCheck,
      title: 'Extensive Quality Checks',
      description: 'Everything goes through 40+ lab tests, to make sure that you get only what is best.',
    },
    {
      icon: Tractor,
      title: 'Better Rural Lives',
      description: '5000+ farmer families are empowered with every Gau Krishna product you buy.',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-[#e4efe9] text-[#1a5f48] grid place-items-center">
                <feature.icon strokeWidth={1.5} className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-[#1a5f48]">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
