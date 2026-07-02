'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
}

interface ParticleCanvasProps {
  className?: string
  particleCount?: number
  colors?: string[]
  maxRadius?: number
  speed?: number
}

export function ParticleCanvas({
  className = '',
  particleCount = 50,
  colors = ['#1a5f48', '#c59d48', '#2a8f6a', '#d4b85a'],
  maxRadius = 3,
  speed = 0.3,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

  const initParticles = useCallback(
    (width: number, height: number) => {
      // Check for reduced motion preference
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile = width < 768
      const count = prefersReduced ? 0 : isMobile ? Math.floor(particleCount * 0.4) : particleCount

      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * maxRadius + 0.5,
        opacity: Math.random() * 0.5 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    },
    [particleCount, colors, maxRadius, speed]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      initParticles(rect.width, rect.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      particlesRef.current.forEach((p) => {
        // Mouse repulsion (subtle parallax)
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.02
          p.vx -= dx * force
          p.vy -= dy * force
        }

        // Apply velocity with damping
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99

        // Wrap around edges
        if (p.x < -10) p.x = rect.width + 10
        if (p.x > rect.width + 10) p.x = -10
        if (p.y < -10) p.y = rect.height + 10
        if (p.y > rect.height + 10) p.y = -10

        // Draw
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Draw connections
      particlesRef.current.forEach((a, i) => {
        particlesRef.current.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = a.color
            ctx.globalAlpha = (1 - dist / 120) * 0.08
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      aria-hidden="true"
    />
  )
}
